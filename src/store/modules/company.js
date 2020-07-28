import actions from '../actions';
import mutations from '../mutations';

export default {
  state: {
    namespaced: true,
    // companies: [],
    companies: [{
      key: 5,
      id: 4,
      name: 'Planalto',
      document: '01234567890',
      city: 'Passo Fundo',
      RG: '454545646564',
      birthday: '10/10/1990',
      fantasyName: 'aaaaaaaaa',
      createdAt: '10/10/2018',
      updatedAt: '10/10/2018'
    }, {
      key: 4,
      id: 2,
      name: 'Planalto 2',
      document: '01234567890',
      city: 'Passo Fundo 2',
      RG: '454545646564',
      birthday: '10/10/1990',
      fantasyName: 'aaaaaaaaa',
      createdAt: '10/10/2018',
      updatedAt: '10/10/2018'
    }],
    company: {}
  },
  actions: actions.companyActions(),
  mutations: mutations.companyMutations(),
  getters: {
    getCompanies: ({ companies }) => companies,
    getCompany: ({ company }) => company
  }
};
