import actions from '../actions';
import mutations from '../mutations';

export default {
  namespaced: true,
  state: {
    companies: [],
    company: {}
  },
  actions: actions.companyActions(),
  mutations: mutations.companyMutations(),
  getters: {
    getCompanies: ({ companies }) => companies,
    getCompany: ({ company }) => company
  }
};
