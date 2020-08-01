import api from '@/services/api';

const API = api();
const url = '/company';

export default {
  getCompany() {
    return API.get(url);
  },

  getCompanyType(id) {
    return API.get(`${url}/type/${id}`);
  },

  createCompany(data) {
    return API.post(url, data);
  },

  updateCompany(data, id) {
    return API.put(`${url}/${id}`, data);
  }, 

  deleteCompany(id) {
    return API.delete(`${url}/${id}`);
  }
};
