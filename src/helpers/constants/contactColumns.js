let contactColumns = [{
  title: 'ID',
  dataIndex: 'id',
  width: '5%',
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
  title: 'Contato',
  children: [{
    title: 'Nome',
    dataIndex: 'name',
    width: '15%',
    scopedSlots: { 
      customRender: 'name',
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon'
    }, 
    onFilter: (value, record) =>
      record.name
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
  }, {
    title: 'Telefones',
    dataIndex: 'phones',
    width: '40%',
    scopedSlots: { customRender: 'phones' }
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
  }]
}, {
  title: 'Informações da Empresa Relacionada',
  children: [{
    title: 'Nome da Empresa',
    dataIndex: 'company.name',
    scopedSlots: { 
      customRender: 'company.name',
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon'
    },
    onFilter: (value, record) =>
      record.company.name
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    width: '10%'
  }, {
    title: 'CPF/CNPJ',
    dataIndex: 'company.document',
    scopedSlots: { 
      customRender: 'company.document',
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon'
    },
    onFilter: (value, record) =>
      record.company.document
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    width: '10%'
  }, {
    title: 'Munícipio',
    dataIndex: 'company.city',
    scopedSlots: { 
      customRender: 'company.city',
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon'
    },
    onFilter: (value, record) =>
      record.company.city
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
  }]
}, {
  title: 'Ação',
  dataIndex: 'operation',
  width: '5%',
  fixed: 'right',
  scopedSlots: { customRender: 'operation' }
}];

export default contactColumns;
