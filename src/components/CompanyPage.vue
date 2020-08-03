<template>
<div>
  <div class="pageHeader">
    <h1 class="pageTitle">Lista de Empresas</h1>
    <a-button @click="changeModal" class="pageButtons" type="primary">
      <a-icon type="plus-circle" />
      Adicionar Empresa
    </a-button>
  </div>
  
  <Table 
    :dataSource="data" 
    :columns="columns" 
    :pageNumber="30" 
    :scrollSize="{ y: 400 }"
    :filterCells="['name', 'city', 'fantasyName', 'document', 'id']"
    page="company"
    :loading="loading"
  />

  <a-modal
      title="Adicionar Nova Empresa"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="() => {changeModal(); resetForm();}"
    >
      <CompanyForm
        :form="form"
        :refForm="refForm"
      /> 
    </a-modal>
</div>
</template>

<script>
import companyColumns from '../helpers/constants/companyColumns';
import documentType from '../helpers/constants/documentType';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'CompanyPage',
  data() {
    return {
      documentType,
      columns: companyColumns,
      visible: false,
      confirmLoading: false,
      loading: true,
      form: {
        type: 1,
        name: '',
        city: '',
        birthday: null,
        fantasy_name: '',
        RG: '',
        document: ''
      },
      refValidate: false
    };
  },
  computed: {
    ...mapState({
      data: state => state.company.companies
    })
  },
  methods: {
    ...mapActions('company', ['addCompany', 'storeCompanies']),
    changeModal() {
      this.visible = !this.visible;
    },

    resetForm() {
      this.form = {
        type: documentType.CPF,
        name: '',
        city: '',
        birthday: null,
        fantasy_name: '',
        RG: '',
        document: ''
      };
    },

    refForm(ref) {
      this.refValidate = ref;
    },

    async handleOk() {
      try {
        this.confirmLoading = true;

        this.form.document = this.form.document.replace(/[^0-9]+/g, '');
        if (this.form.birthday) this.form.birthday = moment(this.form.birthday).format('YYYY-MM-DD'); 

        await this.addCompany(this.form)
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
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: e
        });
      }
    }
  },
  mounted: function() {
    this.$store.dispatch('company/storeCompanies')
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
