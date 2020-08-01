import contactService from '@/services/contactService';
import companyService from '@/services/companyService';
import documentType from '../helpers/constants/documentType';
import moment from 'moment';

const contactActions = () => {
  return {
    storeContacts: (store) => {
      contactService.getContacts()
        .then(res => {
          let data = [...res.data.contacts];

          data.forEach(column => { column['key'] = column.id });
          store.commit('storeContacts', data);
        })
        .catch(e => e);
    },

    getContact: (store, id) => {
      contactService.getContact(id)
        .then(({ data }) => {
          store.commit('storeContact', { ...data, key: data.id });
        })
        .catch(e => e);
    },

    newContact: (store, newContact) => {
      contactService.createContact(newContact)
        .then(res => store.commit('addContact', { ...res.data, key: res.data.id }))
        .catch(e => e);
    },

    updateContact: (store, newContact) => {
      contactService.updateContact(newContact, newContact.id)
        .then(res => store.commit('updateContact', { ...res.data, key: res.data.id }))
        .catch(e => e);
    },

    deleteContact: (store, contact) => {
      contactService.deleteContact(contact)
        .then(() => store.commit('deleteContact', contact))
        .catch(e => e);
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
            key: data.id,
            name: data.company.name,
            city: data.company.city,
            document: data.company.document,
            fantasyName: data.fantasy_name || null,
            rg: data.rg || null,
            birthday: moment(data.birthday.slice(1, data.birthday.length - 1)).format('YYYY-MM-DD') || null,
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
