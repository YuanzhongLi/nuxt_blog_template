import { configure } from '@storybook/vue';

import '!style-loader!css-loader!element-ui/lib/theme-chalk/index.css';
import ElementUI from '../src/plugins/element-ui';
ElementUI();

const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
