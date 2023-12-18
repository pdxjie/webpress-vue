<template>
  <a-card :bordered="false">
    <result type="success" :description="description" :title="title">
      <template slot="action">
        <a-button type="primary" @click='toArticles'>返回列表</a-button>
        <a-button style="margin-left: 8px" @click='keepShare'>分享内容</a-button>
      </template>
    </result>
  </a-card>
</template>

<script>
import { Result } from '@/components'
import { mixinDevice } from '@/utils/mixin.js'
import { operateType } from '@/constants'

const directionType = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

export default {
  name: 'Success',
  components: {
    Result
  },
  mixins: [mixinDevice],
  data () {
    return {
      title: '发布成功',
      description: '恭喜您，发布成功！期待您的下一次贡献。',
      directionType
    }
  },
  created () {
    const { type } = this.$route.query
    if (type === operateType.UPDATE) {
      this.title = '更新成功'
      this.description = '恭喜您，更新成功！期待您的下一次贡献。'
    }
  },
  methods: {
    toArticles () {
      this.$router.push({ name: 'articleCenter' })
    },
    keepShare () {
      this.$emit('keepShare')
    }
  }
}
</script>

<style scoped>

</style>
