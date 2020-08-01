import contactService from '@/services/contactService';
import companyService from '@/services/companyService';
import documentType from '../helpers/constants/documentType';

const contactActions = () => {
  return {
    storeContacts: (store) => {
      try {
        contactService.getContact()
          .then(res => {
            let data = [...res.data.contacts];

            data.forEach(column => { column['key'] = column.id });
            store.commit('storeContacts', data);
          })
          .catch(e => e);
      } catch (e) {
        
      }
    },

    newContact: (store, newContact) => {
      try {
        contactService.createContact(newContact)
          .then(res => store.commit('addContact', res.data))
          .catch(e => e);
      } catch (e) {

      }
    },

    updateContact: (store, newContact) => {
      try {
        contactService.updateContact(newContact, newContact.id)
          .then(res => store.commit('updateContact', res.data))
          .catch(e => e);
      } catch (e) {

      }
    },

    deleteContact: (store, contact) => {
      try {
        contactService.deleteContact(contact.id)
          .then(() => store.commit('deleteContact', contact))
          .catch(e => e);
      } catch (e) {

      }
    }
  };
};

const companyActions = () => {
  return {
    storeCompanies: (store) => {
      companyService.getCompany()
        .then(res => {
          let data = [...res.data.companies];

          data.forEach(column => { column['key'] = column.id });
          store.commit('storeCompanies', data);
        })
        .catch(e => e);
    },

    getCompany: (store, id) => {
      companyService.getCompanyType(id)
        .then(({ data }) => {
          let company = {
            name: data.company.name,
            city: data.company.city,
            document: data.company.document,
            fantasyName: data.fantasy_name || null,
            rg: data.rg || null,
            birthday: data.birthday || null,
            id: data.id,
            companyId: id,
            type: data.company.document.length === 13 ? documentType.CNPJ : documentType.CPF
          };

          store.commit('storeCompany', company);
        })
        .catch(e => e);
    },

    addCompany: (store, newCompany) => {
      companyService.createCompany(newCompany)
        .then(res => store.commit('addCompany', { ...res.data, key: res.data.id }))
        .catch(e => e);
    },

    updateCompany: (store, newCompany) => {
      companyService.updateCompany(newCompany, newCompany.id)
        .then(res => store.commit('updateCompany', res.data))
        .catch(e => e);
    },

    deleteCompany: (store, company) => {
      companyService.deleteCompany(company)
        .then(() => store.commit('deleteCompany', company))
        .catch(e => e);
    }
  };
};

export default {
  contactActions,
  companyActions
};
