<template>
  <div
    class="modalVideo modalVideo--sp"
    @click="videoClose"
  >
    <div class="modalVideo__cnt">
      <div class="modalVideo__close">
        <span
          class="modalVideo__closeIcon"
          @click="videoClose"
        />
      </div>
      <video-player
        class="modalVideo__player vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const playerWidth = window.innerWidth - 32;
    const playerHeight = ((window.innerWidth) - 32) * 9 / 16;
    return {
      playerOptions: {
        width: playerWidth,
        height: playerHeight,
        autoplay: false,
        muted: true,
        language: 'en',
        sources: [{
          type: 'video/mp4',
          src: 'https://prd-estie.s3-ap-northeast-1.amazonaws.com/web/media/estie_introduction_movie.mp4',
        }],
        poster: 'https://prd-estie.s3-ap-northeast-1.amazonaws.com/web/img/movie_thumbnail.png',
      },
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    videoClose() {
      this.$emit('video-close');
    },
  },
};
</script>

<style lang="scss" scoped>
.modalVideo {
  @include modalVideo;
}
</style>
