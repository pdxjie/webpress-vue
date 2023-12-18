<template>
  <div>
    <v-md-editor
      class='editor'
      :style="{ 'border': error ? '1px solid red' : '' }"
      v-model="content"
      :disabled-menus="[]"
      @upload-image="handleUploadImageAnalysis"
      mode="editable"
      height="600px"
      placeholder="点击右上角全屏，编写体验效果更佳"></v-md-editor>
    <span v-if='error' style='color: red'>请完善文章内容!</span>
    <a-button type="primary" @click="nextStep" class='margin-t-20' style='float: inline-end'>下一步</a-button>
  </div>
</template>

<script>
import { operateType } from '@/constants'
import { articleInfo } from '@/api/article'

export default {
  name: 'StepToFillContent',
  props: {
    articleContent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: '',
      error: false
    }
  },
  async created () {
    const { id, type } = this.$route.query
    // 如果是更新操作
    if (type === operateType.UPDATE) {
      const { data } = await articleInfo(id)
      this.content = data.article.content
    } else {
      this.content = this.articleContent
    }
  },
  watch: {
    content () {
      if (this.content.trim()) {
        this.error = false
      }
    }
  },
  methods: {
    handleUploadImageAnalysis () {},
    nextStep () {
      if (this.content.trim()) {
        this.$emit('nextStep', this.content)
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
</style>
