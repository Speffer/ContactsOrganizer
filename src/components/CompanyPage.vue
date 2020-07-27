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
  />
</div>
</template>

<script>
import companyColumns from '../helpers/constants/companyColumns';

const data = [];
for (let i = 0; i < 40; i++) {
  data.push({
    id: i.toString(),
    key: i.toString(),
    name: `empresa${i}`,
    document: `${i}${i}${i}${i}${i}${i}${i}`,
    city: `cidade${i}`,
    RG: `${i}${i}${i}${i}${i}${i}${i}`,
    birthday: '10/10/1990',
    fantasyName: 'aaaaaaaaa',
    createdAt: '10/10/2018',
    updatedAt: '10/10/2018'
  });
}

export default {
  name: 'CompanyPage',
  data() {
    return {
      data,
      columns: companyColumns
    };
  }
  // methods: {
    
  // },
};
</script>

<style scoped>

</style>
