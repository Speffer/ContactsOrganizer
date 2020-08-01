const contactMutations = () => {
  return {
    storeContacts: (state, contacts) => {
      state.contacts = contacts;
    },
    storeContact: (state, contact) => {
      state.contact = contact;
    },
    addContact: (state, contact) => {
      state.contacts.push(contact);
    },
    updateContact: (state, newContact) => {
      let oldContact = state.contacts.findIndex((value) => newContact.id === value.id);
      state.contacts.splice(oldContact, 1, newContact);
    },
    deleteContact: (state, contact) => {
      let oldContact = state.contacts.findIndex((value) => contact === value.id);
      state.contacts.splice(oldContact, 1);
    }
  };
};

const companyMutations = () => {
  return {
    storeCompanies: (state, companies) => {
      state.companies = companies;
    },
    storeCompany: (state, company) => {
      state.company = company;
    },
    addCompany: (state, company) => {
      state.companies.push(company);
    },
    updateCompany: (state, newCompany) => {
      let oldCompany = state.companies.findIndex((value) => newCompany.id === value.id);
      state.companies.splice(oldCompany, 1, newCompany);
    },
    deleteCompany: (state, company) => {
      let oldCompany = state.companies.findIndex((value) => company === value.id);
      state.companies.splice(oldCompany, 1);
    }
  };
};

export default {
  contactMutations,
  companyMutations
};
