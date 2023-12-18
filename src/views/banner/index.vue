<template>
  <div>
    <a-card>
      <!-- 搜索区域 -->
      <div class="display-flex align-items justify-between margin-b-14">
        <a-button type="primary" icon="plus" @click="addBanner">
          新增轮播图
        </a-button>
      </div>
      <!-- 列表 -->
      <a-table :columns="columns" :data-source="bannerData" :pagination="pagination" :loading="loading" :row-key="record => record.id">
        <template slot="cover" slot-scope="text, record">
          <a-avatar size="large" shape="square" :src="record.cover" />
        </template>
        <template slot="createTime" slot-scope="text, record">
          <span>{{ record.createTime | fromNow }}</span>
        </template>
        <template slot="updateTime" slot-scope="text, record">
          <span>{{ record.updateTime | fromNow }}</span>
        </template>
        <template slot="articleName" slot-scope="text, record">
          <a-tag color='orange'>{{ record.articleName }}</a-tag>
        </template>
        <template slot="type" slot-scope="text, record">
          <a-tag color='green' v-if='record.type === 0'>技术分享</a-tag>
          <a-tag color='orange' v-if='record.type === 1'>面试题</a-tag>
          <a-tag color='blue' v-if='record.type === 2'>未归属</a-tag>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定要删除该轮播图吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirm(record.id)"
            @cancel="cancel"
          >
            <a-button type="danger" shape="circle" icon="delete" />
          </a-popconfirm>
          <a-button @click="updateBannerInfo(record.id)" type="primary" class="margin-l-10" shape="circle" icon="edit" />
        </template>
      </a-table>
    </a-card>
    <OperateBannerInfo
      :key='updateKey'
      ref='add-banner'
      :bannerId='bannerId'
      :operate='operate'
      @insertBannerInfo='insertBannerInfo'
      @modifyBannerInfo='modifyBannerInfo'/>
  </div>
</template>

<script>
import moment from 'moment'
import { operateType, responseCode } from '@/constants'
import { mapState } from 'vuex'
import { columns } from '@/views/banner/columns'
import Ellipsis from '@/components/Ellipsis'
import { bannerPage, deleteBanner, insertBanner, updateBanner } from '@/api/banner'
import OperateBannerInfo from '@/views/banner/components/OperateBannerInfo'
export default {
  name: 'Banner',
  components: { OperateBannerInfo },
  comments: { Ellipsis },
  data () {
    return {
      columns, // 表格列
      bannerData: [], // 字典数据
      searchVo: {
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
      operate: '',
      bannerId: '',
      updateKey: 0
    }
  },
  created () {
    // 获取字典数据
    this.getBannerData()
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
      this.getBannerData()
    },
    // 获取字典数据
    async getBannerData () {
      this.loading = true
      const { data } = await bannerPage(this.searchVo)
      this.bannerData = data.banners
      this.loading = false
    },
    // 取消删除
    cancel () {
      this.$message.info('取消删除！')
    },
    // 确定删除
    confirm (id) {
      this.deleteBannerInfo(id)
    },
    // 删除字典
    async deleteBannerInfo (id) {
      const data = await deleteBanner(id)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('删除成功！')
        this.getBannerData()
      }
    },
    // 添加字典
    addBanner () {
      this.operate = operateType.INSERT
      this.$refs['add-banner'].visible = true
      this.$refs['add-banner'].uploadUrl = ''
    },
    async insertBannerInfo (vo) {
      const data = await insertBanner(vo)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('添加成功！')
        this.$refs['add-banner'].visible = false
        this.getBannerData()
      }
    },
    updateBannerInfo (id) {
      this.updateKey += 1
      this.bannerId = id
      this.operate = operateType.UPDATE
      this.$refs['add-banner'].visible = true
    },
    async modifyBannerInfo (vo) {
      const data = await updateBanner(vo)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('更新成功！')
        this.$refs['add-banner'].visible = false
        this.getBannerData()
      }
    }
  }
}
</script>

<style scoped>

</style>
