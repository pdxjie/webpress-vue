<template>
  <div>
    <a-card>
      <!-- 搜索区域 -->
      <div class="display-flex align-items justify-between margin-b-14">
        <a-form layout="inline" :form="searchVo">
          <a-form-item label="标题">
            <a-input placeholder="请输入内容标题" v-model="searchVo.title" @change="debounceInput" :allowClear="true"/>
          </a-form-item>
          <a-form-item label="类型">
            <a-input placeholder="请输入内容标题" v-model="searchVo.title" @change="debounceInput" :allowClear="true"/>
          </a-form-item>
        </a-form>
        <a-button type="primary" icon="yuque" @click="addArticle">
          分享
        </a-button>
      </div>
      <!-- 列表 -->
      <a-table :columns="columns" :data-source="articleData" :pagination="pagination" :loading="loading" :row-key="record => record.id">
        <template slot="cover" slot-scope="text, record">
          <a-avatar size="large" shape="square" :src="record.cover" />
        </template>
        <template slot="articleTitle" slot-scope="text, record">
          <ellipsis :length="10" :tooltip="true">{{ record.articleTitle }}</ellipsis>
        </template>
        <template slot="type" slot-scope="text, record">
          <a-tag color="green" v-if="record.type === 0">技术分享</a-tag>
          <a-tag color="orange" v-if="record.type === 1">面试题</a-tag>
        </template>
        <template slot="createTime" slot-scope="text, record">
          <span>{{ record.createTime | fromNow }}</span>
        </template>
        <template slot="cateName" slot-scope="text, record">
          <a-tag>{{ record.cateName }}</a-tag>
        </template>
        <template slot="recommend" slot-scope="text, record">
          <a-switch checked-children="推荐" un-checked-children="普通" :checked="record.recommend" @change="changeStatus(record)"/>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定要删除该文章吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirm(record.id)"
            @cancel="cancel"
          >
            <a-button type="danger" shape="circle" icon="delete" />
          </a-popconfirm>
          <a-button @click="updateArticleInfo(record.id)" type="primary" class="margin-l-10" shape="circle" icon="edit" />
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
import { operateType, responseCode } from '@/constants'
import { mapState } from 'vuex'
import { columns } from '@/views/article/columns'
import Ellipsis from '@/components/Ellipsis'
import OperatePersonal from '@/views/personal/components/OperatePersonal'
import { articleSearch, deleteArticle, recommendArticle } from '@/api/article'
export default {
  name: 'Article',
  components: { OperatePersonal, Ellipsis },
  data () {
    return {
      columns, // 表格列
      articleData: [], // 用户数据
      searchVo: {
        categoryId: '',
        title: '',
        type: '',
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
    this.getArticleData()
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
      this.getArticleData()
    },
    debounceInput () {
      // 调用防抖搜素函数
      this.onSearch()
    },
    // 定义一个防抖的函数进行请求接口
    onSearch: _.debounce(function () {
      // 请求接口
      this.getArticleData()
    }, 1000),
    // 获取内容数据
    async getArticleData () {
      this.loading = true
      // 请求接口
      const { data } = await articleSearch(this.searchVo)
      this.articleData = data.articles
      this.loading = false
    },
    async refreshUserData () {
      // 请求接口
      const { data } = await articleSearch(this.searchVo)
      this.articleData = data.articles
    },
    // 取消删除
    cancel () {
      this.$message.info('取消删除！')
    },
    // 确定删除
    confirm (id) {
      // 删除用户
      this.deleteArticleInfo(id)
    },
    // 更新用户状态
    async changeStatus (record) {
      const data = await recommendArticle(record.id)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('更新成功！')
        this.refreshUserData()
      }
    },
    async deleteArticleInfo (id) {
      const data = await deleteArticle(id)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('删除成功！')
        this.getArticleData()
      }
    },
    addArticle () {
      this.$router.push({
        name: 'articleOperate',
        params: {
          type: operateType.INSERT
        }
      })
    },
    updateArticleInfo (id) {
      this.$router.push({
        name: 'articleOperate',
        params: {
          type: operateType.UPDATE,
          id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
