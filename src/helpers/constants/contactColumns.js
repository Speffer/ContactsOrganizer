let contactColumns = [{
  title: 'ID',
  dataIndex: 'id',
  width: 80,
  scopedSlots: { 
    customRender: 'id',
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon'
  },
  onFilter: (value, record) =>
    record.id
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  fixed: 'left'
}, {
  title: 'Contato',
  children: [{
    title: 'Nome',
    dataIndex: 'name',
    width: 200,
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
    width: 400,
    scopedSlots: { customRender: 'phones' }
  }, {
    title: 'Data de cadastro',
    dataIndex: 'createdAt',
    width: 150,
    scopedSlots: { customRender: 'createdAt' }
  }, {
    title: 'Data da última edição',
    dataIndex: 'updatedAt',
    width: 150,
    scopedSlots: { customRender: 'updatedAt' }
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
    width: 250
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
    width: 200
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
        .includes(value.toLowerCase()),
    width: 230
  }, {
    title: 'RG',
    dataIndex: 'company.RG',
    width: 200
  }, {
    title: 'Data de Nascimento',
    dataIndex: 'company.birthday', 
    width: 150
  }, {
    title: 'Nome Fantasia',
    scopedSlots: { 
      customRender: 'company.fantasyName',
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon'
    },
    onFilter: (value, record) =>
      record.company.fantasyName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    dataIndex: 'company.fantasyName'
  }]
}, {
  title: 'Ação',
  dataIndex: 'operation',
  width: 120,
  scopedSlots: { customRender: 'operation' },
  fixed: 'right'
}];

export default contactColumns;
