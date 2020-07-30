// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Antd from 'ant-design-vue';
import router from './router';
import store from './store';
import Table from '@/components/utils/Table';
import CompanyForm from '@/components/CompanyForm';
import ContactForm from '@/components/ContactForm';

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.component('Table', Table);
Vue.component('CompanyForm', CompanyForm);
Vue.component('ContactForm', ContactForm);

Vue.use(Antd);
Vue.use(Table);
Vue.use(CompanyForm);
Vue.use(ContactForm);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
