import Vue from 'vue';
import Router from 'vue-router';
import CompanyPage from '@/components/CompanyPage';
import ContactPage from '@/components/ContactPage';
import Table from '@/components/utils/Table';

Vue.component('Table', Table);

Vue.use(Router);
Vue.use(Table);
 
export default new Router({
  routes: [{
    path: '/',
    name: 'ContactPage',
    component: ContactPage
  }, {
    path: '/company',
    name: 'CompanyPage',
    component: CompanyPage
  }
  ]
});
