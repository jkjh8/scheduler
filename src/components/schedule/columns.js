const columns = [
  { name: 'idx', label: '번호', align: 'center', field: 'idx', sortable: true },
  {
    name: 'name',
    label: '이름',
    align: 'center',
    field: 'name',
    sortable: true
  },
  {
    name: 'user',
    label: '사용자',
    align: 'center',
    field: 'user',
    sortable: true
  },
  {
    name: 'repeat',
    label: '반복',
    align: 'center',
    field: 'repeat',
    sortable: true
  },
  {
    name: 'time',
    label: '시간',
    align: 'center',
    sortable: true
  },
  {
    name: 'zones',
    label: '방송구간',
    align: 'center',
    field: 'zones',
    sortable: true
  },
  {
    name: 'file',
    label: '파일',
    align: 'center',
    field: 'file',
    sortable: true
  }
  // {
  //   name: 'actions',
  //   label: 'Actions',
  //   align: 'center'
  // }
]

export default columns
