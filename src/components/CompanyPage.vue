<template>
<div>
  <Table 
    :dataSource="data" 
    :columns="columns" 
    title="Empresas" 
    :pageNumber="30" 
    :scrollSize="{ x: 'calc(950px + 50%)', y: 400 }"
    :editableCells="['name', 'city', 'fantasyName']"
    :filterCells="['name', 'city', 'fantasyName', 'document', 'id']"
    :updateAction="updateCompany"
  />
</div>
</template>

<script>
import companyColumns from '../helpers/constants/companyColumns';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CompanyPage',
  data() {
    return {
      columns: companyColumns
    };
  },
  computed: {
    ...mapState({
      data: state => state.company.companies
    })
  },
  methods: {
    ...mapActions('company', ['updateCompany'])
  }
};
</script>

<style scoped>

</style>
