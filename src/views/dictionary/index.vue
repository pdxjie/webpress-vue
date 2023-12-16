<template>
  <div>
    <a-card>
      <!-- 搜索区域 -->
      <div class="display-flex align-items justify-between margin-b-14">
        <a-button type="primary" icon="plus" @click="addDictionary">
          新增字典
        </a-button>
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>点击字典 Key/Value 直接进入编辑态</span>
          </template>
          <a-icon type="question-circle" style='font-size: 20px'/>
        </a-tooltip>
      </div>
      <!-- 列表 -->
      <a-table :columns="columns" :data-source="dicData" :pagination="pagination" :loading="loading" :row-key="record => record.id">
        <template slot="dicKey" slot-scope="text, record">
          <a-input ref='updateKey' v-if='record.updateKey' placeholder="Basic usage" v-model='record.dicKey' @blur='cancelEditKey(record)'/>
          <span v-else @click='enterEditKey(record.id)'>{{ record.dicKey }}</span>
        </template>
        <template slot="createTime" slot-scope="text, record">
          <span>{{ record.createTime | fromNow }}</span>
        </template>
        <template slot="updateTime" slot-scope="text, record">
          <span>{{ record.updateTime | fromNow }}</span>
        </template>
        <template slot="dicValue" slot-scope="text, record">
          <a-input ref='updateValue' v-if='record.updateValue' placeholder="Basic usage" v-model='record.dicValue' @blur='cancelEditValue(record)'/>
          <span v-else @click='enterEditValue(record.id)'>{{ record.dicValue }}</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定要删除该字典信息吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirm(record.id)"
            @cancel="cancel"
          >
            <a-button type="danger" shape="circle" icon="delete" />
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <AddDictionary ref='add-dictionary' @insertDicInfo='insertDicInfo'/>
  </div>
</template>

<script>
import moment from 'moment'
import { responseCode } from '@/constants'
import { mapState } from 'vuex'
import { columns } from '@/views/dictionary/columns'
import Ellipsis from '@/components/Ellipsis'
import OperatePersonal from '@/views/personal/components/OperatePersonal'
import AddDictionary from '@/views/dictionary/components/AddDictionary'
import { deleteDic, dicPage, insertDic, updateDic } from '@/api/dic'
export default {
  name: 'Dictionary',
  components: { AddDictionary, OperatePersonal },
  comments: { Ellipsis },
  data () {
    return {
      columns, // 表格列
      dicData: [], // 字典数据
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
      originKey: '',
      originValue: ''
    }
  },
  created () {
    // 获取字典数据
    this.getDicData()
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
      this.getDicData()
    },
    // 获取字典数据
    async getDicData () {
      this.loading = true
      const { data } = await dicPage(this.searchVo)
      data.dics.forEach(dic => {
        this.$set(dic, 'updateKey', false)
        this.$set(dic, 'updateValue', false)
      })
      this.dicData = data.dics
      this.loading = false
    },
    async refreshDicData () {
      // 请求接口
      const { data } = await dicPage(this.searchVo)
      data.dics.forEach(dic => {
        this.$set(dic, 'updateKey', false)
        this.$set(dic, 'updateValue', false)
      })
      this.dicData = data.dics
    },
    enterEditKey (id) {
      this.dicData.forEach(dic => {
        if (dic.id === id) {
          this.$set(dic, 'updateKey', true)
          this.originKey = dic.dicKey
        }
      })
      this.$nextTick(() => {
        this.$refs.updateKey.focus()
      })
    },
    async cancelEditKey (record) {
      for (const dic of this.dicData) {
        if (dic.id === record.id) {
          this.$set(dic, 'updateKey', false)
          if (this.originKey !== dic.dicKey) {
            // 调用接口更新数据
            const dicVo = {
              id: record.id,
              dicKey: dic.dicKey,
              dicValue: dic.dicValue
            }
            const data = await updateDic(dicVo)
            if (data.code === responseCode.SUCCESS) {
              this.$message.success('更新成功！')
              this.refreshDicData()
            }
          }
        }
      }
    },
    enterEditValue (id) {
      this.dicData.forEach(dic => {
        if (dic.id === id) {
          this.$set(dic, 'updateValue', true)
          this.originValue = dic.dicValue
        }
      })
      this.$nextTick(() => {
        this.$refs.updateValue.focus()
      })
    },
    cancelEditValue: async function (record) {
      for (const dic of this.dicData) {
        if (dic.id === record.id) {
          this.$set(dic, 'updateValue', false)
          if (this.originValue !== dic.dicValue) {
            // 调用接口更新数据
            const dicVo = {
              id: record.id,
              dicKey: dic.dicKey,
              dicValue: dic.dicValue
            }
            const data = await updateDic(dicVo)
            if (data.code === responseCode.SUCCESS) {
              this.$message.success('更新成功！')
              this.refreshDicData()
            }
          }
        }
      }
    },
    // 取消删除
    cancel () {
      this.$message.info('取消删除！')
    },
    // 确定删除
    confirm (id) {
      this.deleteDicInfo(id)
    },
    // 删除字典
    async deleteDicInfo (id) {
      const data = await deleteDic(id)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('删除成功！')
        this.getDicData()
      }
    },
    // 添加字典
    addDictionary () {
      this.$refs['add-dictionary'].visible = true
    },
    async insertDicInfo (vo) {
      const data = await insertDic(vo)
      if (data.code === responseCode.SUCCESS) {
        this.$message.success('添加成功！')
        this.$refs['add-dictionary'].visible = false
        this.getDicData()
      }
    }
  }
}
</script>

<style scoped>

</style>
