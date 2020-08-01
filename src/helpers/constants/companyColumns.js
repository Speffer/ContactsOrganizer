let companyColumns = [{
  title: 'ID',
  dataIndex: 'id',
  width: '10%',
  scopedSlots: { 
    customRender: 'id',
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon'
  },
  onFilter: (value, record) =>
    record.id
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase())
}, {
  title: 'Nome',
  dataIndex: 'name',
  scopedSlots: { 
    customRender: 'name',
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon'
  },
  onFilter: (value, record) =>
    record.name
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  width: '20%'
}, {
  title: 'CPF/CNPJ',
  dataIndex: 'document',
  scopedSlots: { 
    customRender: 'document',
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon'
  },
  onFilter: (value, record) =>
    record.document
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  width: '20%'
}, {
  title: 'Data de cadastro',
  dataIndex: 'created_at',
  width: '15%',
  scopedSlots: { customRender: 'created_at' }
}, {
  title: 'Data da última edição',
  dataIndex: 'updated_at',
  width: '15%',
  scopedSlots: { customRender: 'updated_at' }
}, {
  title: 'Ação',
  dataIndex: 'operation',
  width: '5%',
  scopedSlots: { customRender: 'operation' }
}];

export default companyColumns;
