<template>
<div>
  <div class="pageHeader">
    <h1 class="pageTitle">Lista de {{ title }}</h1>
    <a-button class="pageButtons" type="primary">
      <a-icon type="plus-circle" />
      Adicionar {{ title }}
    </a-button>
  </div>
  <a-table 
    :columns="columns" 
    :data-source="data" 
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
          {{ fragment }}
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template
      v-for="(col, i) in editableCells"
      :slot="col"
      slot-scope="text, record"
    >
      <div :key="i">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Salvar</a>
          <a-popconfirm 
            title="Certeza que quer cancelar?" 
            @confirm="() => cancel(record.key)"
            ok-text="Sim!" 
            cancel-text="Não."
          >
            <a>Cancelar</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a-tooltip>
            <template slot="title">
              Editar
            </template>
            <a :disabled="editingKey" @click="() => edit(record.key)">
              <a-icon type="edit" :style="{ fontSize: '150%', marginRight: '10%', marginLeft: '10%'}"/>
            </a>
          </a-tooltip>
          
          <a-popconfirm
            v-if="data.length"
            title="Certeza que quer deletar?"
            @confirm="() => onDelete(record.key)"
            ok-text="Sim!" 
            cancel-text="Não, cancelar."
          >
            <a-tooltip>
              <template slot="title">
                Deletar
              </template>
              <a href="javascript:;">
                <a-icon type="delete" :style="{ fontSize: '150%', marginLeft: '10%', marginRight: '10%'}"/>
              </a>
            </a-tooltip>
          </a-popconfirm>
        </span>
      </div>
    </template>
  </a-table>
</div>
</template>

<script>
export default {
  name: 'Table',
  props: [
    'dataSource', 
    'columns', 
    'title', 
    'pageNumber', 
    'scrollSize', 
    'editableCells',
    'filterCells'
  ],
  data() {
    return {
      editingKey: null,
      searchText: '',
      searchInput: null,
      searchedColumn: '', 
      cacheData: [],
      data: this.dataSource
    };
  },
  computed: {
    cacheDataRenew: function() {
      let newCache = [...this.data];
      return newCache;
    }
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    onDelete(key) {
      const data = [...this.data];
      this.data = data.filter(item => item.key !== key);
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheDataRenew()];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = null;
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = null;
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
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
