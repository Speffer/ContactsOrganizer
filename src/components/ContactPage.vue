<template>
<div>
  <Table 
    :dataSource="data" 
    :columns="columns" 
    title="Contatos" 
    :pageNumber="30" 
    :scrollSize="{ x: 'calc(1600px + 50%)', y: 400 }"
    :editableCells="['name', 'company']"
    :filterCells="['id', 'name', 'company.name', 'company.fantasyName', 'company.city', 'company.document']"
    :updateAction="updateContact"
  />
</div>
</template>

<script>
import contactColumns from '../helpers/constants/contactColumns';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ContactPage',
  data() {
    return {
      columns: contactColumns
    };
  },
  computed: {
    ...mapState({
      data: state => state.contact.contacts
    })
  },
  methods: {
    ...mapActions('contact', ['updateContact'])
  }
};
</script>

<style scoped>

</style>
