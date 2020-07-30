const contactActions = () => {
  return {
    storeContacts: (store, contacts) => {
      store.commit('storeContacts', contacts);
    },

    newContact: (store, newContact) => {
      store.commit('addContact', newContact);
    },

    updateContact: (store, newContact) => {
      store.commit('updateContact', newContact);
    },

    deleteContact: (store, contact) => {
      store.commit('deleteContact', contact);
    }
  };
};

const companyActions = () => {
  return {
    storeCompanies: (store, companies) => {
      store.commit('storeCompanies', companies);
    },

    addCompany: (store, newCompany) => {
      store.commit('addCompany', newCompany);
    },

    updateCompany: (store, newCompany) => {
      store.commit('updateCompany', newCompany);
    },

    deleteCompany: (store, company) => {
      store.commit('deleteCompany', company);
    }
  };
};

export default {
  contactActions,
  companyActions
};
