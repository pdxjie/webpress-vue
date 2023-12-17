export const columns = [
  {
    title: '标题',
    dataIndex: 'articleTitle',
    key: 'articleTitle',
    align: 'center',
    scopedSlots: { customRender: 'articleTitle' }
  },
  {
    title: '封面',
    align: 'center',
    dataIndex: 'cover',
    key: 'cover',
    scopedSlots: { customRender: 'cover' }
  },
  {
    title: '类型',
    align: 'center',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '分类',
    key: 'cateName',
    dataIndex: 'cateName',
    align: 'center',
    scopedSlots: { customRender: 'cateName' }
  },
  {
    title: '状态',
    key: 'recommend',
    dataIndex: 'recommend',
    align: 'center',
    scopedSlots: { customRender: 'recommend' }
  },
  {
    title: '发布时间',
    key: 'createTime',
    dataIndex: 'createTime',
    align: 'center',
    scopedSlots: { customRender: 'createTime' }
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
