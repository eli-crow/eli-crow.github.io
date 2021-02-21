import "reset-css";

import Vue from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import * as icons from './icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(icons);

Vue.component('Icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
