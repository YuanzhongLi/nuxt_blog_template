<template>
  <video-player
    class="modalVideo__player vjs-custom-skin"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
  />
</template>

<script>
export default {
  data() {
    let playerWidth;
    let playerHeight;
    if (process.browser) {
      playerWidth = window.innerWidth - 32;
      playerHeight = ((window.innerWidth) - 32) * 9 / 16;
    }
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
};
</script>
