export const columns = [
  {
    title: '字典 Key',
    dataIndex: 'dicKey',
    key: 'dicKey',
    align: 'center',
    width: '400px',
    scopedSlots: { customRender: 'dicKey' }
  },
  {
    title: '字典 Value',
    align: 'center',
    dataIndex: 'dicValue',
    key: 'dicValue',
    scopedSlots: { customRender: 'dicValue' },
    width: '400px'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    key: 'createTime',
    scopedSlots: { customRender: 'createTime' }
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'updateTime',
    key: 'updateTime',
    scopedSlots: { customRender: 'updateTime' }
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
