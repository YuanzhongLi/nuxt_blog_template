<template>
  <messageDetailSP
    v-if="device.isMobile"
    :talk-rooms="talkRooms"
    :current-talk-room="currentTalkRoom"
    :current-talk-room-offers="currentTalkRoomOffers"
    :is-default-page="isDefaultPage"
    :user-id="tenant.tenantId"
    :user-type="2"
    :update-offer="updateOffer"
    @switch-talk-room="switchTalkRoom"
    @send-message="sendMessage"
    @get-file-list="getFileList"
    @start-chat="startChat"
  />
</template>

<script>
import { mapState } from 'vuex';
import io from 'socket.io-client';
import log from '~/utils/log';
import { userTypeEnum, likeStatusEnum } from '~/utils/enums';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import messageDetailSP from '~/components/templates/tenant_sp/message-detail';

import AppConfig from '../../../config';

export default {
  layout: ctx => 'tenant_sp',
  components: {
    messageDetailSP,
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  middleware: ['injectTenant', 'tenantAuthenticated'],
  mixins: [siteinfo, notification, webpush],
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.tenantToken);
    const talkRooms = await client.$post('tenant/chat/get_talk_rooms', { userId: store.state.tenant.tenantId });

    return {
      talkRooms,
    };
  },
  data() {
    return {
      currentRoomId: 0,
      currentTalkRoom: {},
      currentTalkRoomOffers: [],
      socket: '',
    };
  },
  mounted() {
    this.socket = io(AppConfig.CHAT_URL, { transports: ['websocket'] });

    this.socket.on('server_to_client', async (data) => {
      const { currentRoomId, msg } = data;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);

      // ToDo:talRoomsをidに対応するobjにすることで計算量改善
      this.talkRooms.forEach((talkRoom) => {
        if (currentRoomId === talkRoom.id) {
          talkRoom.contents.push(msg);
        }
      });
      this.currentTalkRoom.contents.push(msg);

      const { talkRoomId, userType, userId } = msg;

      // メッセージが相手から送られたものの場合
      if (userType !== userTypeEnum.TENANT || userId !== this.$store.state.tenant.tenantId) {
        await client.$post('tenant/chat/is_read/message', {
          talkRoomId,
          userType,
          userId,
        });
      }
    });

    this.socket.on('server_to_client_file', async (data) => {
      const { currentRoomId, file } = data;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);

      this.talkRooms.forEach((talkRoom) => {
        if (currentRoomId === talkRoom.id) {
          talkRoom.contents.push(file);
          talkRoom.files.push(file);
        }
      });

      this.currentTalkRoom.contents.push(file);
      this.currentTalkRoom.files.push(file);

      this.currentTalkRoomOffers.unshift(file);

      const { talkRoomId, userType, userId } = file;
      // ファイルが相手から送られたものの場合
      if (userType !== userTypeEnum.TENANT || userId !== this.$store.state.tenant.tenantId) {
        await client.$post('tenant/chat/is_read/file', {
          talkRoomId,
          userType,
          userId,
        });
      }
    });
  },
  methods: {
    getTalkRoom(talkRoomId) {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);

      return client.$post('tenant/chat/get_talk_room', {
        userId: this.$store.state.tenant.tenantId,
        talkRoomId,
      });
    },
    async switchTalkRoom(targetTalkRoom) {
      const targetRoomId = targetTalkRoom.id;
      const { currentRoomId } = this;
      if (targetRoomId === currentRoomId) {
        return;
      }
      // socket server にルームの変更を伝える
      this.socket.emit('switch_room', {
        currentRoomId,
        targetRoomId,
      });
      let error = '';
      this.currentTalkRoom = await this.getTalkRoom(targetRoomId)
        .catch((err) => {
          log.error(err);
          error = '最新のメッセージの取得に失敗しました';
          return targetTalkRoom;
        });
      this.currentRoomId = targetRoomId;
      this.currentTalkRoomOffers = [];
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      // ToDo:talRoomsをidに対応するobjにすることで計算量改善
      this.talkRooms.forEach((talkRoom) => {
        if (targetRoomId === talkRoom.id) {
          talkRoom.unreadNumber = 0;
        }
      });
    },
    async sendMessage(msg) {
      const { currentRoomId } = this;
      const {
        user1Type,
        user2Type,
        user1Id,
        user2Id,
      } = this.currentTalkRoom;
      const { tenantId } = this.$store.state.tenant;

      let receiverType;
      let receiverId;
      if (user1Type !== userTypeEnum.TENANT || user1Id !== tenantId) {
        receiverType = user1Type;
        receiverId = user1Id;
      }

      if (user2Type !== userTypeEnum.TENANT || user2Id !== tenantId) {
        receiverType = user2Type;
        receiverId = user2Id;
      }

      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      let error = '';
      const retMessage = await client.$post('tenant/chat/send_message', {
        msg,
        talkRoomId: currentRoomId,
        receiverType,
        receiverId,
      })
        .catch((err) => {
          log.error(err);
          error = '送信に失敗しました。';
        });

      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }

      this.socket.emit('client_to_server', {
        currentRoomId,
        message: retMessage,
      });
    },
    async getFileList() {
      const { currentRoomId } = this;
      const {
        user1Type,
        user2Type,
        user1Id,
        user2Id,
      } = this.currentTalkRoom;

      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);

      const { files, error } = await client.$post('tenant/chat/get_current_talk_room_offers', {
        user1Type,
        user2Type,
        user1Id,
        user2Id,
        talkRoomId: currentRoomId,
      })
        .catch((err) => {
          log.error(err);
          return { error: 'オファーの取得に失敗しました' };
        });

      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }

      this.currentTalkRoomOffers = files;
    },
    async startChat(talkRoom) {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const { error } = await client.$post('tenant/chat/start_chat', { talkRoomId: talkRoom.id })
        .catch((err) => {
          log.error(err);
          return { error: 'チャット開始が失敗しました' };
        });

      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }

      let error2 = '';
      this.currentTalkRoom = await this.getTalkRoom(talkRoom.id)
        .catch((err) => {
          log.error(err);
          error2 = '最新のメッセージの取得に失敗しました';
          return talkRoom;
        });

      if (error2) {
        this.setNotificationMessage('error', error2);
      }
    },
    async updateOffer(offerId, likeStatus, tenantComment) {
      const { currentRoomId } = this;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      this.openLoadingModal();
      const apiPath = likeStatus === likeStatusEnum.DISMISS ? 'tenant/dismiss_offer' : 'tenant/like_offer';
      const { error, msg, offer } = await client.$post(apiPath, { offerId, tenantComment })
        .catch((err) => {
          log.error(err);
          return { error: 'サーバーエラーです' };
        });

      if (error) {
        this.setNotificationMessage('error', error);
        this.closeLoadingModal();
        return;
      }
      if (msg.content) {
        this.socket.emit('client_to_server', {
          currentRoomId,
          message: msg,
        });
        this.talkRooms.forEach((talkRoom) => {
          if (currentRoomId === talkRoom.id) {
            talkRoom.contents.push(msg);
          }
        });
      }
      const idx = this.currentTalkRoom.contents.findIndex(content => content.fileType === 'offer' && content.offerId === offer.id);
      this.currentTalkRoom.contents[idx].likeStatus = offer.likeStatus;
      if (offer.likeStatus === likeStatusEnum.LIKE) this.currentTalkRoom.isActive = true;
      this.closeLoadingModal();
    },
  },
  computed: {
    ...mapState(['device', 'tenant']),
    isDefaultPage() {
      return Object.keys(this.currentTalkRoom).length === 0;
    },
    totalUnreadNumber() {
      let cnt = 0;
      this.talkRooms.forEach((talkRoom) => {
        cnt += talkRoom.unreadNumber;
      });
      return cnt;
    },
  },
};
</script>
