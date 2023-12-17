<template>
  <div>
    <a-card>
      <!-- 搜索区域 -->
      <div class="display-flex align-items justify-between margin-b-14">
        <a-form layout="inline" :form="searchVo">
          <a-form-item label="用户昵称">
            <a-input placeholder="请输入用户昵称..." v-model="searchVo.nickName" @change="debounceInput":allowClear="true"/>
          </a-form-item>
          <a-form-item label="注册时间">
            <a-range-picker format="YYYY-MM-DD HH:mm:ss" @change="selectDate"/>
          </a-form-item>
        </a-form>
        <a-button type="primary" icon="plus" @click="addPersonal">
          新增用户
        </a-button>
      </div>
      <!-- 列表 -->
      <a-table :columns="columns" :data-source="userData" :pagination="pagination" :loading="loading" :row-key="record => record.id">
        <template slot="avatar" slot-scope="text, record">
          <a-avatar size="large" shape="square" :src="record.avatar" />
        </template>
        <template slot="email" slot-scope="text, record">
          <ellipsis :length="16" :tooltip="true">{{ record.email }}</ellipsis>
        </template>
        <template slot="sex" slot-scope="text, record">
          <a-tag color="green" v-if="record.sex === 0">男</a-tag>
          <a-tag color="orange" v-if="record.sex === 1">女</a-tag>
          <a-tag v-if="record.sex === 2">未知</a-tag>
        </template>
        <template slot="createTime" slot-scope="text, record">
          <span>{{ record.createTime | fromNow }}</span>
        </template>
        <template slot="online" slot-scope="text, record">
          <a-tag color="green" v-if="record.online">在线</a-tag>
          <a-tag v-else>离线</a-tag>
        </template>
        <template slot="role" slot-scope="text, record">
          <a-tag color="green" v-if="record.role === '管理员'">{{ record.role }}</a-tag>
          <a-tag v-else>{{ record.role }}</a-tag>
        </template>
        <template slot="status" slot-scope="text, record">
          <a-switch checked-children="正常" un-checked-children="禁用" :checked="!record.status" @change="changeStatus(record)"/>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定要删除该用户信息吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirm(record.id)"
            @cancel="cancel"
          >
            <a-button type="danger" shape="circle" icon="delete" />
          </a-popconfirm>
          <a-button @click="updateUserInfo(record.id)" type="primary" class="margin-l-10" shape="circle" icon="edit" />
          <a-button @click="setRoleOperate(record)" class="margin-l-10" shape="circle" icon="setting" :disabled="record.id === userId"/>
        </template>
      </a-table>
    </a-card>
    <!-- 操作用户信息的组件 -->
    <OperatePersonal
      ref="operate-personal"
      :userId="operatorId"
      :operateType="operateType"
      @insertUserInfo="addUserInfo"
      @updateUserInfo="modifyUserInfo"
      :title="title"/>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { responseCode } from '@/constants'
import { mapState } from 'vuex'
import { columns } from '@/views/personal/columns'
import Ellipsis from '@/components/Ellipsis'
import { deleteInfo, forbiddenInfo, insertUser, searchPage, updateUser } from '@/api/user'
import OperatePersonal from '@/views/personal/components/OperatePersonal'
export default {
  name: 'Personal',
  components: { OperatePersonal, Ellipsis },
  data () {
    return {
      columns, // 表格列
      userData: [], // 用户数据
      searchVo: {
        nickName: '',
        startTime: '',
        endTime: '',
        current: 1,
        pageSize: 10
      },
      loading: false,
      // 分页参数
      pagination: {
        size: 'large',
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total, range) => {
          return ' 共' + total + '条'
        }
      },
      userId: '',
      title: '',
      operatorId: '',
      operateType: ''
    }
  },
  created () {
    // 获取当前用户 id
    this.userId = this.currentUser.userInfo.userId
    // 获取用户数据
    this.getUserData()
  },
  filters: {
    fromNow (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.info
    })
  },
  methods: {
    // 表格改变时触发
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.searchVo.current = pagination.current
      this.searchVo.pageSize = pagination.pageSize
      this.getUserData()
    },
    debounceInput () {
      // 调用防抖搜素函数
      this.onSearch()
    },
    // 定义一个防抖的函数进行请求接口
    onSearch: _.debounce(function () {
      // 请求接口
      this.getUserData()
    }, 1000),
    // 选择时间
    selectDate (_, dates) {
      // 赋值
      this.searchVo.startTime = dates[0]
      this.searchVo.endTime = dates[1]
      // 请求接口
      this.getUserData()
    },
    // 获取用户数据
    async getUserData () {
      this.loading = true
      // 请求接口
      const { data } = await searchPage(this.searchVo)
      this.userData = data.users
      this.loading = false
    },
    async refreshUserData () {
      // 请求接口
      const { data } = await searchPage(this.searchVo)
      this.userData = data.users
    },
    // 取消删除
    cancel () {
      this.$message.info('取消删除！')
    },
    // 确定删除
    confirm (id) {
      // 判断是否是自己
      if (id === this.userId) {
        this.$message.warning('不能删除自己！')
        return
      }
      // 删除用户
      this.deleteUser(id)
    },
    // 更新用户状态
    async changeStatus (record) {
      if (record.id === this.userId) {
        this.$message.warning('不能封禁自己！')
        return
      }
      const data = await forbiddenInfo(record.id)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('更新成功！')
        this.refreshUserData()
      }
    },
    // 删除用户
    async deleteUser (id) {
      const data = await deleteInfo(id)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('删除成功！')
        this.getUserData()
      }
    },
    // 添加用户（管理员只是添加测试数据）
    addPersonal () {
      this.title = ['添加用户', '添加']
      this.operateType = 'insert'
      this.operatorId = ''
      this.$refs['operate-personal'].form.remark = ''
      this.$refs['operate-personal'].form.openId = ''
      this.$refs['operate-personal'].visible = true
    },
    // 更新用户信息
    async updateUserInfo (id) {
      this.title = ['更新用户', '更新']
      this.operateType = 'update'
      this.operatorId = id
      this.$refs['operate-personal'].visible = true
    },
    // 设置用户角色
    setRoleOperate () {},
    async addUserInfo (vo) {
      const data = await insertUser(vo)
      if (data.code === responseCode.SUCCESS) {
        // 获取分页数据
        this.getUserData()
        this.$message.success('添加成功！')
      }
      this.$refs['operate-personal'].visible = false
      this.$refs['operate-personal'].loading = false
    },
    async modifyUserInfo (vo) {
      const data = await updateUser(vo)
      if (data.code === responseCode.SUCCESS) {
        // 获取分页数据
        this.getUserData()
        this.$message.success('更新成功！')
      }
      this.$refs['operate-personal'].visible = false
      this.$refs['operate-personal'].loading = false
    }
  }
}
</script>

<style scoped>

</style>
