import Vue from 'vue';

import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faGithub,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;

library.add(faPlus);
library.add(faTwitter, faFacebook, faGithub, faGithubSquare);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
