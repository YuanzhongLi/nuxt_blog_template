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

export default gMapOptions;
