<template>
  <main class="p-buildingDetail p-buildingDetail--sp">
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
    <div class="p-buildingDetail__info">
      <BuildingMultipleImg
        v-if="secondImgUrl"
        :building-img-urls="buildingImgUrls"
        class="p-buildingDetail__infoImg"
      />
      <BuildingSingleImg
        v-else
        :first-building-img-url="buildingImgUrls['1']"
        class="p-buildingDetail__infoImg"
      />
      <div class="p-buildingDetail__infoTable">
        <h3 class="p-buildingDetail__infoTtl">
          物件情報
        </h3>
        <InfoTable
          :station="station"
          :info="buildingInfo"
        />
      </div>
    </div>
    <div class="p-buildingDetail__info">
      <h3 class="p-buildingDetail__infoTtl">
        募集区画情報
      </h3>
      <ul class="p-buildingDetail__askingList">
        <li
          v-for="(asking, index) in building.askings"
          :key="'asking' + index"
          class="p-buildingDetail__askingItem"
        >
          <AskingItem
            :asking="asking"
            :is-logged-in="isLoggedIn"
            :e-rent="building.eRent"
            @asking-like-by-id="askingLikeById"
            @asking-dislike-by-id="askingDislikeById"
          />
        </li>
      </ul>
    </div>
    <div class="p-buildingDetail__info">
      <h3 class="p-buildingDetail__infoTtl">
        アクセス
      </h3>
      <building-map-area
        :latitude="building.latitude"
        :longitude="building.longitude"
        style="height: 500px; width: 100%;"
      />
    </div>
    <OtherBuildingSingleSwiper
      v-if="similarBuildings.length > 0"
      :similar-buildings="similarBuildings"
      :is-logged-in="isLoggedIn"
      @asking-like-by-id="askingLikeById"
      @asking-dislike-by-id="askingDislikeById"
    />
  </main>
</template>

<script>
import BuildingHeader from '~/components/elements/buildingDetail/BuildingHeader';
import BuildingMapArea from '~/components/elements/buildingDetail/BuildingMapArea';
import BuildingSingleImg from '~/components/elements/buildingDetail/BuildingSingleImg';
import BuildingMultipleImg from '~/components/elements/buildingDetail/BuildingMultipleImg';
import InfoTable from '~/components/elements/buildingDetail/InfoTable';

import AskingItem from '~/components/elements/buildingDetail/sp/AskingItem';
import OtherBuildingSingleSwiper from '~/components/elements/buildingDetail/sp/OtherBuildingSingleSwiper';
import Modal from '~/components/elements/common/modal/index';
import buildingDetail from '~/mixins/buildingDetail';

export default {
  mixins: [buildingDetail],
  components: {
    BuildingHeader,
    BuildingSingleImg,
    BuildingMultipleImg,
    InfoTable,
    BuildingMapArea,
    AskingItem,
    OtherBuildingSingleSwiper,
    Modal,
  },
};
</script>

<style lang="scss" scoped>
.p-buildingDetail {
  @include p-buildingDetail;
}
</style>
