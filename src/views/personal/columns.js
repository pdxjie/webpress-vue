export const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    align: 'center',
    scopedSlots: { customRender: 'avatar' }
  },
  {
    title: '昵称',
    align: 'center',
    dataIndex: 'nickName',
    key: 'nickName'
  },
  {
    title: '邮箱',
    align: 'center',
    dataIndex: 'email',
    key: 'email',
    scopedSlots: { customRender: 'email' }
  },
  {
    title: '性别',
    key: 'sex',
    dataIndex: 'sex',
    align: 'center',
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: '角色',
    key: 'role',
    dataIndex: 'role',
    align: 'center',
    scopedSlots: { customRender: 'role' }
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '是否在线',
    key: 'online',
    dataIndex: 'online',
    align: 'center',
    scopedSlots: { customRender: 'online' }
  },
  {
    title: '注册时间',
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
