import NormalPin from '~/assets/images/emap/normal_pin.svg';
import OtherPin from '~/assets/images/emap/other_pin.svg';
import FocusPin from '~/assets/images/emap/focus_pin.png';
import FavoritePin from '~/assets/images/emap/favorite_pin.png';

export default {
  data() {
    const gMapOptions = {
      clickableIcons: false,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        position: 3,
      },
      styles: [
        {
          featureType: 'administrative.land_parcel',
          stylers: [
            {
              visiblity: 'off',
            },
          ],
        },
        {
          featureType: 'administrative.neighborhood',
          stylers: [
            {
              visiblity: 'off',
            },
          ],
        },
        {
          featureType: 'landscape',
          stylers: [
            {
              saturation: -30,
            },
          ],
        },
        {
          featureType: 'poi',
          stylers: [
            {
              saturation: -30,
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi.business',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi.medical',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi.school',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit.station',
          stylers: [
            {
              saturation: -50,
            },
          ],
        },
        {
          featureType: 'water',
          stylers: [
            {
              saturation: -40,
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
      ],
    };
    const circlePinSize = {
      width: 22,
      height: 22,
      f: 'px',
      b: 'px',
    };
    const verticalPinSize = {
      width: 22,
      height: 30,
      f: 'px',
      b: 'px',
    };
    return {
      gMapOptions,
      circlePinSize,
      verticalPinSize,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      normalIcon: {
        url: NormalPin,
        scaledSize: circlePinSize,
      },
      otherIcon: {
        url: OtherPin,
        scaledSize: circlePinSize,
      },
      focusIcon: {
        url: FocusPin,
        scaledSize: verticalPinSize,
      },
      favoriteIcon: {
        url: FavoritePin,
        scaledSize: verticalPinSize,
      },
    };
  },
};
