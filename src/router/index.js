import Vue from 'vue';
import Router from 'vue-router';
import CompanyPage from '@/components/CompanyPage';
import ContactPage from '@/components/ContactPage';

Vue.use(Router);
 
export default new Router({
  routes: [{
    path: '/',
    name: 'ContactPage',
    component: ContactPage
  }, {
    path: '/company',
    name: 'CompanyPage',
    component: CompanyPage
  }]
});
