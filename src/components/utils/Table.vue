<template>
<a-skeleton :loading="loading" active>
  <a-table
    :loading="loading"
    :columns="columns" 
    :data-source="dataSource" 
    bordered 
    :pagination="{ pageSize: pageNumber }"
    :scroll="scrollSize"
  >
    <div
      slot="filterDropdown"
      slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      style="padding: 8px"
    >
      <a-input
        v-ant-ref="c => (searchInput = c)"
        :placeholder="`Procurar ${column.title}`"
        :value="selectedKeys[0]"
        style="width: 188px; margin-bottom: 8px; display: block;"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
      />
      <a-button
        type="primary"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
      >
        Procurar
      </a-button>
      <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
        Limpar
      </a-button>
    </div>
    <a-icon
      slot="filterIcon"
      slot-scope="filtered"
      type="search"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
    <template 
      v-for="(col, i) in filterCells"
      :slot="col"
      slot-scope="text, record, index, column"
    >
      <span :key="i" v-if="searchText && searchedColumn === column.dataIndex">
        <template>
          {{ text }}
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
        
    <span slot="phones" slot-scope="phones">
      <template v-for="(phone, i) in phones">
        <span v-if="phones.length" :key="phone.id+i">
          {{ phone.number| VMask('(##) ####-####') }} | 
        </span>
        <template v-else>
          Sem número cadastrado
        </template>
      </template>
    </span>

    <span slot="document" slot-scope="document">
      <span v-if="document.length === 14">
        {{ document| VMask('##.###.###/####-##') }}
      </span>
      <template v-if="document.length === 11">
        {{ document| VMask('###.###.###-##') }}
      </template>
    </span>

    <span slot="created_at" slot-scope="created_at">
      {{ moment(created_at.slice(1, created_at.length - 1)).format('DD/MM/YYYY') }}
    </span>

    <span slot="updated_at" slot-scope="updated_at">
      {{ moment(updated_at.slice(1, updated_at.length - 1)).format('DD/MM/YYYY') }}
    </span>

    <template slot="operation" slot-scope="text, record">
      <span>
        <a-tooltip>
          <template slot="title">
            Clique para ver mais informações
          </template>
          <a-icon 
            type="info-circle" 
            :style="{ fontSize: '200%', margin: '10%', color: '#1890ff', cursor: 'pointer'}"
            @click="seeMoreInfo(record)"
          />
        </a-tooltip>
      </span>
    </template>
  </a-table>

  <a-modal
    :visible="companyMoreVisible"
    title="Detalhes da Empresa"
    :footer="null"
  >
    <CompanySeeMore :form="company" :visible="closeMoreInfo" />
  </a-modal>

  <a-modal
    :visible="contactMoreVisible"
    title="Detalhes do Contato"
    :footer="null"
  >
    <ContactSeeMore :form="contact" :visible="closeMoreInfo" />
  </a-modal>
</a-skeleton>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'Table',
  props: [
    'dataSource', 
    'columns', 
    'pageNumber', 
    'scrollSize', 
    'filterCells',
    'loading',
    'page'
  ],
  data() {
    return {
      searchText: '',
      searchInput: null,
      searchedColumn: '', 
      data: [...this.dataSource],
      companyMoreVisible: false,
      contactMoreVisible: false,
      moment
    };
  },
  computed: {
    ...mapState({
      company: state => state.company.company,
      contact: state => state.contact.contact
    })
  },
  methods: {
    ...mapActions('company', ['getCompany', 'storeCompanies']),
    ...mapActions('contact', ['getContact', 'storeContacts']),

    seeMoreInfo(column) {
      if (this.page === 'company') {
        this.getCompany(column.id)
          .then(() => { this.companyMoreVisible = true });
      }

      if (this.page === 'contact') {
        this.getContact(column.id)
          .then(() => { this.contactMoreVisible = true });
      }
    },

    closeMoreInfo() {
      if (this.page === 'company') {
        this.storeCompanies()
          .then(() => { this.companyMoreVisible = false });
      }

      if (this.page === 'contact') {
        this.storeContacts()
          .then(() => { this.contactMoreVisible = false });
      }
    },

    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    }, 
    
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    }
  }
};
</script>

<style scoped>

</style>
