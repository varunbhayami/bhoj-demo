import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from './router';
import store from './vuex/store';

import Meta from 'vue-meta'
import appNav from './components/appnav'
import Vuelidate from 'vuelidate'
import VueResource from 'vue-resource';
import GSignInButton from 'vue-google-signin-button'
import BlockUI from 'vue-blockui'
import VueScrollTo from 'vue-scrollto'
import VueProgressBar from 'vue-progressbar'
import Notifications from 'vue-notification/dist/ssr.js'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import bModal from 'bootstrap-vue/es/components/modal/modal';
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCard from 'bootstrap-vue/es/components/card/card'
import bRow from 'bootstrap-vue/es/components/layout/row'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bImg from 'bootstrap-vue/es/components/image/img'
import bImgLazy from 'bootstrap-vue/es/components/image/img-lazy'
import bLink from 'bootstrap-vue/es/components/link/link'
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'
import bNavbarBarand from 'bootstrap-vue/es/components/navbar/navbar-brand'
import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle'
import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav'
import bNavItem from 'bootstrap-vue/es/components/nav/nav-item'
import bNav from 'bootstrap-vue/es/components/nav/nav'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select'
import bFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea'
import bTab from 'bootstrap-vue/es/components/tabs/tab'
import bTabs from 'bootstrap-vue/es/components/tabs/tabs'
import bForm from 'bootstrap-vue/es/components/form/form'
import bButton from 'bootstrap-vue/es/components/button/button'
import bFormFile from 'bootstrap-vue/es/components/form-file/form-file'
import bProgress from 'bootstrap-vue/es/components/progress/progress'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bAlert from 'bootstrap-vue/es/components/alert/alert';
import vBModal from 'bootstrap-vue/es/directives/modal/modal';

Vue.component('b-container', bContainer);
Vue.component('b-card', bCard);
Vue.component('b-row', bRow);
Vue.component('b-col', bCol);
Vue.component('b-img', bImg);
Vue.component('b-img-lazy', bImgLazy);
Vue.component('b-link', bLink);
Vue.component('b-navbar', bNavbar);
Vue.component('b-navbar-brand', bNavbarBarand);
Vue.component('b-navbar-toggle', bNavbarToggle);
Vue.component('b-navbar-nav', bNavbarNav);
Vue.component('b-nav-item', bNavItem);
Vue.component('b-nav', bNav);
Vue.component('b-collapse', bCollapse);
Vue.component('b-form-input', bFormInput);
Vue.component('b-form-group', bFormGroup);
Vue.component('b-form-select', bFormSelect);
Vue.component('b-form-textarea', bFormTextarea);
Vue.component('b-tab', bTab);
Vue.component('b-tabs', bTabs);
Vue.component('b-form', bForm);
Vue.component('b-button', bButton);
Vue.component('b-input-group', bInputGroup);
Vue.component('b-form-file', bFormFile);
Vue.component('b-progress', bProgress);
Vue.component('b-alert', bAlert);
Vue.component('b-modal', bModal);
Vue.directive('b-toggle', vBToggle);
Vue.directive('b-modal', vBModal);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(Meta)
Vue.use(Notifications)
Vue.use(BlockUI)
Vue.use(VueProgressBar, {
  color: 'rgb(255, 140, 67)',
  failedColor: 'red',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.9s',
    termination: 300
  },
});
Vue.use(VueScrollTo, {
  container: "#menu-list-div",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onCancel: false,
  x: false,
  y: true
})


Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(GSignInButton);

export const eventBus = new Vue();

Vue.component('app-header', Header)
Vue.component('app-footer', Footer)
Vue.component('app-nav', appNav)

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  el: '#mybhojapp',
  functional: true,
  router,
  store,
  render(h) {
    return h(App);
  },
});
