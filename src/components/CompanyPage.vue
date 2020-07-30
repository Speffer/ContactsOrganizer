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
    :scrollSize="{ x: 'calc(950px + 50%)', y: 400 }"
    :editableCells="['name', 'city', 'fantasyName']"
    :filterCells="['name', 'city', 'fantasyName', 'document', 'id']"
    :updateAction="updateCompany"
    :deleteAction="deleteCompany"
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

export default {
  name: 'CompanyPage',
  data() {
    return {
      documentType,
      columns: companyColumns,
      visible: false,
      confirmLoading: false,
      form: {
        type: 1,
        name: '',
        city: '',
        birthday: null,
        fantasyName: '',
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
    ...mapActions('company', ['updateCompany', 'deleteCompany', 'addCompany']),
    changeModal() {
      this.visible = !this.visible;
    },

    resetForm() {
      this.form = {
        type: documentType.CPF,
        name: '',
        city: '',
        birthday: null,
        fantasyName: '',
        RG: '',
        document: ''
      };
    },

    refForm(ref) {
      this.refValidate = ref;
    },

    async handleOk(e) {
      if (this.refValidate) {
        try {
          this.confirmLoading = true;

          this.form['id'] = 6;
          this.form['key'] = 6;

          this.addCompany(this.form);
          
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
            this.resetForm();
          }, 3000);
        } catch (e) {

        }
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
