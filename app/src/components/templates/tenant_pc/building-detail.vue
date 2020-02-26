<template>
  <main class="p-buildingDetail">
    <modal
      v-if="isModalShow"
      @close="closeSignUpModal"
      @left-func="$router.push('/tenant/signup')"
    >
      <h2 slot="header">
        新規登録してください。
      </h2>
      <p slot="body">
        「いいね」「興味なし」をするためには、
        <br>
        アカウント登録をする必要があります。
      </p>
      <span slot="leftButtonLabel">
        新規登録
      </span>
    </modal>
    <BuildingHeader
      :img-url="firstBuildingImgUrl"
      :name="building.name"
      :address="building.address"
      :time-required="building.timeRequired"
    />
    <section class="p-buildingDetail__wrapper">
      <div class="p-buildingDetail__info">
        <h3 class="p-buildingDetail__infoTtl">
          物件情報
        </h3>
        <BuildingMultipleImg
          v-if="secondImgUrl"
          :building-img-urls="buildingImgUrls"
          class="p-buildingDetail__infoImg"
        />
        <BuildingSingleImg
          v-else
          :first-building-img-url="firstBuildingImgUrl"
          class="p-buildingDetail__infoImg"
        />
        <InfoTable
          class="p-buildingDetail__infoTable"
          :station="station"
          :info="buildingInfo"
        />
      </div>
      <div class="p-buildingDetail__info">
        <h3 class="p-buildingDetail__infoTtl">
          募集区画情報
        </h3>
        <AskingTable
          v-if="building.askings.length"
          :askings="building.askings"
          :e-rent="building.eRent"
          @asking-like-by-id="askingLikeById"
          @asking-dislike-by-id="askingDislikeById"
          :is-logged-in="isLoggedIn"
        />
        <p v-else>
          募集区画がありません
        </p>
      </div>
      <div class="p-buildingDetail__info">
        <h3 class="p-buildingDetail__infoTtl">
          アクセス
        </h3>
        <building-map-area
          :latitude="building.latitude"
          :longitude="building.longitude"
        />
      </div>
      <OtherBuildingMultiSwiper
        :is-logged-in="isLoggedIn"
        v-if="similarBuildings.length > 0"
        :similar-buildings="similarBuildings"
        @asking-like-by-id="askingLikeById"
        @asking-dislike-by-id="askingDislikeById"
      />
    </section>
  </main>
</template>

<script>

import BuildingHeader from '~/components/elements/buildingDetail/BuildingHeader';
import BuildingMapArea from '~/components/elements/buildingDetail/BuildingMapArea';
import BuildingSingleImg from '~/components/elements/buildingDetail/BuildingSingleImg';
import BuildingMultipleImg from '~/components/elements/buildingDetail/BuildingMultipleImg';
import InfoTable from '~/components/elements/buildingDetail/InfoTable';

import OtherBuildingMultiSwiper from '~/components/elements/buildingDetail/pc/OtherBuildingMultiSwiper';
import AskingTable from '~/components/elements/buildingDetail/pc/AskingTable';
import Modal from '~/components/elements/common/modal/index';
import buildingDetail from '~/mixins/buildingDetail';

export default {
  mixins: [buildingDetail],
  components: {
    BuildingHeader,
    InfoTable,
    BuildingMapArea,
    BuildingSingleImg,
    BuildingMultipleImg,
    OtherBuildingMultiSwiper,
    AskingTable,
    Modal,
  },
};
</script>

<style lang="scss" scoped>
.p-buildingDetail {
  @include p-buildingDetail;
}
.m-otherBuildingSwiper {
  @include m-otherBuildingSwiper;
}

</style>
