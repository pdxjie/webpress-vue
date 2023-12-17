<template>
  <div>
<!--    <Success @keepShare='keepShare' v-if='!isSuccess()'/>-->
    <div>
      <result type="error" :title="title" :description="description">
        <template slot="action">
          <a-button type="primary" @click='toUpdate'>返回修改</a-button>
        </template>
      </result>
    </div>
  </div>
</template>

<script>
import Success from '@/views/result/Success'
import { responseCode } from '@/constants'
import { Result } from '@/components'
export default {
  name: 'StepToResult',
  components: { Result, Success },
  props: {
    response: {
      type: Object,
      default: () => {}
    },
    articleVo: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    console.log(this.response, 'response')
  },
  data () {
    return {
      title: '发布失败',
      description: '请核对并修改发布内容后，再重新提交。'
    }
  },
  methods: {
    keepShare () {
      this.$emit('keepShare')
    },
    isSuccess () {
      return this.response.code === responseCode.SUCCESS
    },
    toUpdate () {
      debugger
      this.$router.push({ name: 'articleOperate', params: { info: this.articleVo } })
    }
  }
}
</script>

<style scoped>

</style>
