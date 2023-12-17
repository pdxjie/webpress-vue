export const columns = [
  {
    title: 'Icon 图标',
    dataIndex: 'icon',
    key: 'icon',
    align: 'center',
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '等级/父级',
    align: 'center',
    dataIndex: 'pid',
    key: 'pid',
    scopedSlots: { customRender: 'pid' }
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    key: 'createTime',
    scopedSlots: { customRender: 'createTime' }
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
