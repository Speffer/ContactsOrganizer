let companyColumns = [{
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
  width: 250
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
  width: 200
}, {
  title: 'Munícipio',
  dataIndex: 'city',
  scopedSlots: { 
    customRender: 'city',
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon'
  },
  onFilter: (value, record) =>
    record.city
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  width: 230
}, {
  title: 'RG',
  dataIndex: 'RG',
  width: 200
}, {
  title: 'Data de Nascimento',
  dataIndex: 'birthday', 
  width: 200
}, {
  title: 'Nome Fantasia',
  scopedSlots: { 
    customRender: 'fantasyName',
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon'
  },
  onFilter: (value, record) =>
    record.fantasyName
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  dataIndex: 'fantasyName'
}, {
  title: 'Data de cadastro',
  dataIndex: 'createdAt',
  width: 150,
  scopedSlots: { customRender: 'createdAt' }
}, {
  title: 'Data da última edição',
  dataIndex: 'updatedAt',
  scopedSlots: { customRender: 'updatedAt' }
}, {
  title: 'Ação',
  dataIndex: 'operation',
  width: 120,
  scopedSlots: { customRender: 'operation' },
  fixed: 'right'
}];

export default companyColumns;
