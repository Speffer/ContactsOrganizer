import Vue from 'vue';
import Vuex from 'vuex';
import company from './modules/company';
import contact from './modules/contact';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    company,
    contact
  }
});
