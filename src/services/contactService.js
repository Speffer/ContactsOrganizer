import api from '@/services/api';

const API = api();
const url = '/contact';

export default {
  getContacts() {
    return API.get(url);
  },

  createContact(data) {
    return API.post(url, data);
  },

  updateContact(data, id) {
    return API.put(`${url}/${id}`, data);
  }, 

  getContact(id) {
    return API.get(`${url}/${id}`);
  },

  deleteContact(id) {
    return API.delete(`${url}/${id}`);
  }
};
