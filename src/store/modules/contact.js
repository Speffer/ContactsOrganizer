import actions from '../actions';
import mutations from '../mutations';

export default {
  namespaced: true,
  state: {
    // contacts: [],
    contacts: [{
      id: 5,
      key: 5,
      name: 'Jailson',
      company: {
        id: 4,
        name: 'Planalto',
        document: '01234567890',
        city: 'Passo Fundo',
        RG: '454545646564',
        birthday: '10/10/1990',
        fantasyName: 'aaaaaaaaa',
        createdAt: '10/10/2018',
        updatedAt: '10/10/2018'
      },
      createdAt: '10/10/2018',
      updatedAt: '10/10/2018',
      phones: [{
        number: '(54)5641-2577',
        id: 6,
        userId: 5
      }, {
        number: '(54)5641-2577',
        id: 6,
        userId: 5
      }, {
        number: '(54)5641-2577',
        id: 6,
        userId: 5
      }, {
        number: '(54)5641-2577',
        id: 6,
        userId: 5
      }]
    }, {
      id: 6,
      key: 6,
      name: 'Jailson 2',
      company: {
        id: 4,
        name: 'Planalto 2',
        document: '01234567890',
        city: 'Passo Fundo',
        RG: '454545646564',
        birthday: '10/10/1990',
        fantasyName: 'aaaaaaaaa',
        createdAt: '10/10/2018',
        updatedAt: '10/10/2018'
      },
      createdAt: '10/10/2018',
      updatedAt: '10/10/2018',
      phones: [{
        number: '(54)5641-2577',
        id: 6,
        userId: 6
      }, {
        number: '(54)5641-2577',
        id: 6,
        userId: 6
      }, {
        number: '(54)5641-2577',
        id: 6,
        userId: 6
      }, {
        number: '(54)5641-2577',
        id: 6,
        userId: 6
      }]
    }],
    contact: {}
  },
  actions: actions.contactActions(),
  mutations: mutations.contactMutations(),
  getters: {
    getContacts: ({ contacts }) => contacts,
    getContact: ({ contact }) => contact
  }
};
