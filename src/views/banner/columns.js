export const columns = [
  {
    title: '轮播图',
    dataIndex: 'cover',
    key: 'cover',
    align: 'center',
    scopedSlots: { customRender: 'cover' }
  },
  {
    title: '关联文章',
    align: 'center',
    dataIndex: 'articleName',
    key: 'articleName',
    scopedSlots: { customRender: 'articleName' }
  },
  {
    title: '类型',
    align: 'center',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' }
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
