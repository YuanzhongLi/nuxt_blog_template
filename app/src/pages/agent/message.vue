<template>
  <div>
    <messageSP
      v-if="device.isMobile"
      :talk-rooms="talkRooms"
      :current-talk-room="currentTalkRoom"
      :current-talk-room-offers="currentTalkRoomOffers"
      :is-default-page="isDefaultPage"
      :user-id="agent.agentId"
      :user-type="1"
      :sp-message-type="spMessageType"
      @switch-talk-room="switchTalkRoom"
      @send-message="sendMessage"
      @send-file="sendFile"
      @get-file-list="getFileList"
      @chat-button="chatButton"
    />
    <messagePC
      v-else
      :talk-rooms="talkRooms"
      :current-talk-room="currentTalkRoom"
      :current-talk-room-offers="currentTalkRoomOffers"
      :is-default-page="isDefaultPage"
      :user-id="agent.agentId"
      :user-type="1"
      @switch-talk-room="switchTalkRoom"
      @send-message="sendMessage"
      @send-file="sendFile"
      @get-file-list="getFileList"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import io from 'socket.io-client';
import log from '~/utils/log';
import webpush from '~/mixins/webpush';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';

import messagePC from '~/components/templates/agent_pc/message';
import messageSP from '~/components/templates/agent_sp/message';


import AppConfig from '../../../config';

export default {
  layout: ctx => (ctx.isMobile ? 'agent_sp' : 'agent_pc'),
  components: {
    messagePC,
    messageSP,
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  middleware: ['injectAgent', 'agentAuthenticated'],
  mixins: [siteinfo, notification, webpush],
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.agentToken);

    const talkRooms = await client.$post('agent/chat/get_talk_rooms', { userId: store.state.agent.agentId });

    return {
      talkRooms,
    };
  },
  data() {
    return {
      currentRoomId: 0,
      currentTalkRoom: {},
      currentTalkRoomOffers: [],
      spMessageType: 1, // 1: chat一覧, 2: 個別トークルーム
      socket: '',
    };
  },
  mounted() {
    this.socket = io(AppConfig.CHAT_URL, { transports: ['websocket'] });

    this.socket.on('server_to_client', async (data) => {
      const { currentRoomId, msg } = data;
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);

      // ToDo:talRoomsをidに対応するobjにすることで計算量改善
      this.talkRooms.forEach((talkRoom) => {
        if (currentRoomId === talkRoom.id) {
          talkRoom.contents.push(msg);
        }
      });
      this.currentTalkRoom.contents.push(msg);

      const { talkRoomId, userType, userId } = msg;

      // メッセージが相手から送られたものの場合
      if (userType !== 1 || userId !== this.$store.state.agent.agentId) {
        await client.$post('agent/chat/is_read/message', {
          talkRoomId,
          userType,
          userId,
        });
      }
    });

    this.socket.on('server_to_client_file', async (data) => {
      const { currentRoomId, file } = data;
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);

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
      if (userType !== 1 || userId !== this.$store.state.agent.agentId) {
        await client.$post('agent/chat/is_read/file', {
          talkRoomId,
          userType,
          userId,
        });
      }
    });
  },
  methods: {
    getTalkRoom(talkRoomId) {
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);

      return client.$post('agent/chat/get_talk_room', {
        userId: this.$store.state.agent.agentId,
        talkRoomId,
      });
    },
    async switchTalkRoom(targetTalkRoom) {
      const targetRoomId = targetTalkRoom.id;
      const { currentRoomId } = this;
      this.spMessageType = 2;
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
      const { agentId } = this.$store.state.agent;

      let receiverType;
      let receiverId;
      if (user1Type !== 1 || user1Id !== agentId) {
        receiverType = user1Type;
        receiverId = user1Id;
      }

      if (user2Type !== 1 || user2Id !== agentId) {
        receiverType = user2Type;
        receiverId = user2Id;
      }

      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      let error = '';
      const retMessage = await client.$post('agent/chat/send_message', {
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
    async sendFile(pdf) {
      const { currentRoomId } = this;
      if (pdf.size > 10 * 1024 * 1024) {
        this.setNotificationMessage('error', '画像は10MB以下をアップロードしてください');
        return;
      }

      const {
        user1Type,
        user2Type,
        user1Id,
        user2Id,
      } = this.currentTalkRoom;
      const { agentId } = this.$store.state.agent;

      let receiverType;
      let receiverId;
      if (user1Type !== 1 || user1Id !== agentId) {
        receiverType = user1Type;
        receiverId = user1Id;
      }

      if (user2Type !== 1 || user2Id !== agentId) {
        receiverType = user2Type;
        receiverId = user2Id;
      }

      const pdfFileName = pdf.name;
      const fileName = `${this.timestamp()}_${pdfFileName}`;
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('pdfContent', pdf);
      formData.append('talkRoomId', currentRoomId);
      formData.append('receiverType', receiverType);
      formData.append('receiverId', receiverId);

      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      let error = '';
      const fileObj = await client.$post('agent/chat/send_pdfFile', formData)
        .catch((err) => {
          log.error(err);
          error = '送信に失敗しました。';
        });

      if (error) {
        this.setNotificationMessage('error', error);
        this.closeLoadingModal();
        return;
      }
      this.closeLoadingModal();

      this.socket.emit('client_to_server_pdfFile', {
        currentRoomId,
        pdfFile: fileObj,
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

      const client = this.$axios.withAccessToken(this.$store.state.agentToken);

      const { files, error } = await client.$post('agent/chat/get_current_talk_room_offers', {
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
    chatButton() {
      const { spMessageType } = this;
      if (spMessageType === 2) {
        this.spMessageType = 1;
      }
    },
    timestamp() {
      return JSON.stringify(Date.now());
    },
  },
  computed: {
    ...mapState(['device', 'agent']),
    isDefaultPage() {
      return Object.keys(this.currentTalkRoom).length === 0;
    },
    tatalUnreadNumber() {
      let cnt = 0;
      this.talkRooms.forEach((talkRoom) => {
        cnt += talkRoom.unreadNumber;
      });
      return cnt;
    },
  },
};
</script>
