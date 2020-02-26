import Vue from 'vue';
import * as VueGoogleMaps from '../../node_modules/vue2-google-maps/src/main';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC9WXSVGr6U3oysC4n-hxykDScYuZAEric',
    libraries: 'places',
  },
});
