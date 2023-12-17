<template>
  <div>
    <a-card :bordered="false">
      <a-steps class="steps" :current="currentTab">
        <a-step title="完成文章内容" />
        <a-step title="完成基本信息" />
        <a-step title="发布状态" :status='getStatus()'/>
      </a-steps>
      <div class="content">
        <StepToFillContent :articleContent='content' v-if='currentTab === 0' @nextStep='nextStep'/>
        <StepToBaseInfo :content='content' :baseInfo='baseInfo' v-if='currentTab === 1' @prevStep='prevStep' @finishPublish='finishPublish'/>
        <StepToResult v-if='currentTab === 2' :response='response' @keepShare='keepShare' :articleVo='articleVo'/>
      </div>
    </a-card>
  </div>
</template>

<script>
import StepToFillContent from '@/views/article/components/StepToFillContent'
import StepToBaseInfo from '@/views/article/components/StepToBaseInfo'
import { insertArticle } from '@/api/article'
import StepToResult from '@/views/article/components/StepToResult'
export default {
  name: 'OperateArticle',
  components: { StepToResult, StepToBaseInfo, StepToFillContent },
  created () {
    if (this.$route.params) {
      this.content = this.$route.params.info.content
      this.baseInfo = this.$route.params.info
    }
  },
  data () {
    return {
      currentTab: 0,
      content: '',
      response: null,
      articleVo: null,
      baseInfo: null
    }
  },
  methods: {
    nextStep (content) {
      this.content = content
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep (value) {
      this.content = value
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    keepShare () {
      this.content = ''
      this.currentTab = 0
    },
    async finishPublish (vo) {
      this.articleVo = vo
      const data = await insertArticle(vo)
      this.response = data
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    getStatus () {
      if (this.response) {
        return this.response.code === 200 ? 'finish' : 'error'
      } else {
        return 'wait'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
