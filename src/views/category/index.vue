<template>
  <div>
    <a-card>
      <!-- 搜索区域 -->
      <div class="display-flex align-items justify-between margin-b-14">
        <a-button type="primary" icon="plus" @click="addCategoryInfo">
          新增分类
        </a-button>
      </div>
      <!-- 列表 -->
      <a-table :columns="columns" :data-source="categoryData" :pagination="pagination" :loading="loading" :row-key="record => record.id">
        <template slot="icon" slot-scope="text, record">
          <a-avatar size="large" shape="square" :src="record.icon" />
        </template>
        <template slot="createTime" slot-scope="text, record">
          <span>{{ record.createTime | fromNow }}</span>
        </template>
        <template slot="name" slot-scope="text, record">
          <span>{{ record.name }}</span>
        </template>
        <template slot="pid" slot-scope="text, record">
          <a-tag color='green' v-if="record.pid === '0'">父级</a-tag>
          <a-tag color='orange' v-else>{{ record.parentName }}</a-tag>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定要删除该分类信息吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirm(record.id)"
            @cancel="cancel"
          >
            <a-button type="danger" shape="circle" icon="delete" />
          </a-popconfirm>
          <a-button @click="updateCategoryData(record.id)" type="primary" class="margin-l-10" shape="circle" icon="edit" />
        </template>
      </a-table>
    </a-card>
    <OperateCategory
      ref='add-category'
      :categoryId='categoryId'
      :type='type'
      @insertCategoryInfo='insertCategoryInfo'
      @updateCategoryInfo='updateCategoryInfo'
      @resetCategoryId='resetCategoryId'/>
  </div>
</template>

<script>
import moment from 'moment'
import { operateType, responseCode } from '@/constants'
import { mapState } from 'vuex'
import { columns } from '@/views/category/columns'
import Ellipsis from '@/components/Ellipsis'
import { categorySearch, deleteCategory, insertCategory, updateCategory } from '@/api/category'
import OperateCategory from '@/views/category/components/OperateCategory'
export default {
  name: 'Category',
  components: { OperateCategory },
  comments: { Ellipsis },
  data () {
    return {
      columns, // 表格列
      categoryData: [], // 分类数据
      searchVo: {
        name: '',
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
      type: '',
      categoryId: ''
    }
  },
  created () {
    // 获取分类数据
    this.getCategoryData()
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
      this.getCategoryData()
    },
    // 获取分类数据
    async getCategoryData () {
      this.loading = true
      const { data } = await categorySearch(this.searchVo)
      this.categoryData = data.cates
      this.loading = false
    },
    // 取消删除
    cancel () {
      this.$message.info('取消删除！')
    },
    // 确定删除
    confirm (id) {
      this.deleteCategoryInfo(id)
    },
    // 删除分类
    async deleteCategoryInfo (id) {
      const data = await deleteCategory(id)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('删除成功！')
        this.getCategoryData()
      }
    },
    // 添加分类
    addCategoryInfo () {
      this.$refs['add-category'].visible = true
      this.type = operateType.INSERT
      this.categoryId = ''
    },
    async insertCategoryInfo (vo, url) {
      const categoryVo = {
        ...vo,
        icon: url
      }
      const data = await insertCategory(categoryVo)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('添加成功！')
        this.$refs['add-category'].visible = false
        this.getCategoryData()
      }
      this.$refs['add-category'].loading = false
    },
    resetCategoryId () {
      this.categoryId = ''
    },
    updateCategoryData (id) {
      this.categoryId = id
      this.$refs['add-category'].visible = true
      this.type = operateType.UPDATE
    },
    async updateCategoryInfo (vo, url) {
      const categoryVo = {
        ...vo,
        icon: url
      }
      const data = await updateCategory(categoryVo)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('修改成功！')
        this.$refs['add-category'].visible = false
        this.getCategoryData()
      }
      this.$refs['add-category'].loading = false
    }
  }
}
</script>

<style scoped>

</style>
