<template>
<div>
  <Table 
    :dataSource="data" 
    :columns="columns" 
    title="Contatos" 
    :pageNumber="30" 
    :scrollSize="{ x: 'calc(1600px + 50%)', y: 400 }"
    :editableCells="['name', 'company', 'phones']"
    :filterCells="['id', 'name', 'company.name', 'company.fantasyName', 'company.city', 'company.document']"
  />
</div>
</template>

<script>
import contactColumns from '../helpers/constants/contactColumns';

const data = [];
for (let i = 0; i < 40; i++) {
  data.push({
    id: i.toString(),
    key: i.toString(),
    name: `Edrward ${i}`,
    company: {
      name: 'Empresa',
      document: `${i}${i}${i}${i}${i}${i}${i}`,
      city: `cidade${i}`,
      RG: `${i}${i}${i}${i}${i}${i}${i}`,
      birthday: '10/10/1990',
      fantasyName: 'aaaaaaaaa'
    },
    phones: `(${i}${i})${i}${i}${i}${i}${i}`,
    createdAt: '10/10/2018',
    updatedAt: '10/10/2018'
  });
}

export default {
  name: 'ContactPage',
  data() {
    return {
      data,
      columns: contactColumns
    };
  }
  // methods: {
    
  // },
};
</script>

<style scoped>

</style>
