<template>
<div>
  <div class="pageHeader">
    <h1 class="pageTitle">Lista de Contatos</h1>
    <a-button @click="changeModal" class="pageButtons" type="primary">
      <a-icon type="plus-circle" />
      Adicionar Contato
    </a-button>
  </div>
  <Table
    page="contact" 
    :dataSource="data" 
    :loading="loading"
    :columns="columns" 
    :pageNumber="30" 
    :scrollSize="{ y: 400 }"
    :filterCells="['id', 'name', 'company.name', 'company.fantasyName', 'company.city', 'company.document']"
  />
  
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
    ...mapActions('contact', ['newContact', 'storeContacts']),
    changeModal() {
      this.visible = !this.visible;
    },

    resetForm() {
      this.form = {
        name: '',
        company_id: '',
        phones: []
      };
    },
    async handleOk() {
      try {
        let phonesData = [];
        this.confirmLoading = true;
        
        this.form.phones.forEach((phone, index) => {
          phonesData.push(phone.value.replace(/[^0-9]+/g, ''));
        });

        this.form.phones = phonesData;

        await this.newContact(this.form)
          .then(() => {
            this.visible = false;
            this.confirmLoading = false;
            this.resetForm();
          })
          .catch(e => this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: e
          }));
      } catch (e) {

      }
    }
  },
  mounted: function() {
    this.$store.dispatch('contact/storeContacts')
      .then(() => { this.loading = false });
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
