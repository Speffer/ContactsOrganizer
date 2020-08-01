<template>
<div>
  <div class="pageHeader">
    <h1 class="pageTitle">Lista de Contatos</h1>
    <a-button @click="changeModal" class="pageButtons" type="primary">
      <a-icon type="plus-circle" />
      Adicionar Contato
    </a-button>
  </div>
  <a-skeleton :loading="loading" active >
    <Table 
      :dataSource="data" 
      :columns="columns" 
      title="Contatos" 
      :pageNumber="30" 
      :scrollSize="{ x: 'calc(1600px + 50%)', y: 400 }"
      :editableCells="['name', 'company']"
      :filterCells="['id', 'name', 'company.name', 'company.fantasyName', 'company.city', 'company.document']"
      :updateAction="updateContact"
      :deleteAction="deleteContact"
    />
  </a-skeleton>
  
  <a-modal
      title="Adicionar Novo Contato"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="() => {changeModal(); resetForm();}"
    >
      <ContactForm
        :form="form"
      /> 
    </a-modal>
</div>
</template>

<script>
import contactColumns from '../helpers/constants/contactColumns';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ContactPage',
  data() {
    return {
      columns: contactColumns,
      form: {
        name: '',
        company: '',
        phones: []
      },
      visible: false,
      confirmLoading: false,
      loading: true
    };
  },
  computed: {
    ...mapState({
      data: state => state.contact.contacts
    })
  },
  methods: {
    ...mapActions('contact', ['updateContact', 'deleteContact', 'newContact']),
    changeModal() {
      this.visible = !this.visible;
    },

    resetForm() {
      this.form = {
        name: '',
        company: '',
        phones: []
      };
    },
    async handleOk(e) {
      try {
        this.confirmLoading = true;

        this.form['id'] = 6;
        this.form['key'] = 6;
        
        this.form.phones.forEach((phone, index) => {
          this.form.phones[index]['number'] = phone.value;
          this.form.phones[index]['id'] = phone.key;
          this.form.phones[index]['userId'] = index;
        });

        this.newContact(this.form);
        
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
          this.resetForm();
        }, 3000);
      } catch (e) {

      }
    }
  }
};
</script>

<style scoped>
.pageHeader {
  padding-bottom: 60px;
}

.pageTitle {
  color: #1890ff;
  float: left;
}

.pageButtons {
  font-size: 15px;
  float: right;
}
</style>
