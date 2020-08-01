import actions from '../actions';
import mutations from '../mutations';

export default {
  namespaced: true,
  state: {
    contacts: [],
    contact: {}
  },
  actions: actions.contactActions(),
  mutations: mutations.contactMutations(),
  getters: {
    getContacts: ({ contacts }) => contacts,
    getContact: ({ contact }) => contact
  }
};
