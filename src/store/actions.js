const contactActions = () => {
  return {
    updateContact: (store, newContact) => {
      store.commit('updateContact', newContact);
    }
  };
};

const companyActions = () => {
  return {
    updateCompany: (store, newCompany) => {
      store.commit('updateCompany', newCompany);
    }
  };
};

export default {
  contactActions,
  companyActions
};
