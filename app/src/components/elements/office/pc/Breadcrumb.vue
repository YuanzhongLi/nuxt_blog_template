<template>
  <nav class="a-breadcrumb">
    <ul class="a-breadcrumb__list">
      <li class="a-breadcrumb__item">
        <nuxt-link
          to="/office"
          class="a-breadcrumb__anchor"
        >
          物件検索
        </nuxt-link>
      </li>
      <template
        v-if="prefecture && prefecture.name"
      >
        <li
          v-if="ward && ward.name"
          class="a-breadcrumb__item"
        >
          <nuxt-link
            :to="`/office/${prefecture.enName}/${path}`"
            class="a-breadcrumb__anchor"
          >
            {{ prefecture ? prefecture.name : '' }}
          </nuxt-link>
        </li>
        <li class="a-breadcrumb__item">
          <span class="a-breadcrumb__txt">
            {{ ward && ward.name ? ward.name : prefecture.name }}
          </span>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    prefecture: {
      type: Object,
      default: () => {},
    },
    ward: {
      type: Object,
      default: () => {},
    },
    path: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="scss" scoped>
.a-breadcrumb {
  @include a-breadcrumb;
}
</style>
