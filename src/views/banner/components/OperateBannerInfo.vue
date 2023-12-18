<template>
  <div>
    <a-modal v-model="visible" :title="getOperateType() + '轮播图'" on-ok="handleOk" :closable="false">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{ getOperateType() }}</a-button>
      </template>
      <a-form layout="horizontal" :form="bannerInfo" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="轮播图" style="display: flex;align-items: center">
          <a-upload-dragger
            name="cover"
            :multiple="false"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :customRequest="customUpload"
            @change="handleChange"
          >
            <img v-if="uploadUrl" :src="uploadUrl" alt="avatar" style='object-fit: contain;width: 100%;height: 100%'/>
            <p v-if="!uploadUrl" class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p v-if="!uploadUrl" class="ant-upload-text">
              点击或拖拽文件到此区域上传
            </p>
          </a-upload-dragger>
        </a-form-item>
        <a-form-item label="文章类型">
          <a-select v-model="searchVo.type" @change="changeType">
            <a-select-option :value="0">
              技术分享
            </a-select-option>
            <a-select-option :value="1">
              面试题
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <template slot="label">
            <div class="display-flex align-items justify-content">
              <span>关联文章&nbsp;</span>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>关联文章属于非必须！</span>
                </template>
                <a-icon type="question-circle"/>&nbsp;:
              </a-tooltip>
            </div>
          </template>
          <a-select
            mode="multiple"
            label-in-value
            :value="bannerInfo.articleId"
            placeholder="请输入搜索关键词"
            :filter-option="false"
            :not-found-content="fetching ? undefined : null"
            @search="handleSearch"
            @deselect='handleDeselect'
            @change="handleChangeArticle"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            <a-select-option v-for="article in articleData" :key="article.id">
              {{ article.articleTitle }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import { articleSearch } from '@/api/article'
import debounce from 'lodash/debounce'
import { operateType } from '@/constants'
import { uploadFile } from '@/api/login'
import { bannerInfo } from '@/api/banner'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'OperateBannerInfo',
  props: {
    operate: {
      type: String,
      default: ''
    },
    bannerId: {
      type: String,
      default: ''
    }
  },
  data () {
    this.handleSearch = debounce(this.handleSearch, 1000)
    return {
      loading: false,
      visible: false,
      bannerInfo: {
        cover: '',
        articleId: []
      },
      uploadUrl: '',
      searchVo: {
        title: '',
        type: 0
      },
      fetching: false,
      articleData: []
    }
  },
  async created () {
    if (this.bannerId && this.bannerId.trim() !== '') {
      const { data } = await bannerInfo(this.bannerId)
      this.visible = true
      this.searchVo.type = data.bannerInfo.type
      this.searchVo.title = data.bannerInfo.articleName
      this.getArticleData()
      const vo = {
        key: data.bannerInfo.id,
        label: data.bannerInfo.articleName
      }
      this.bannerInfo.articleId = [vo]
      this.uploadUrl = data.bannerInfo.cover
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk () {
      if (!this.uploadUrl || this.uploadUrl === '') {
        this.$message.warning('轮播图不能为空！')
        return
      }
      const vo = {
        cover: this.uploadUrl,
        articleId: this.bannerInfo.articleId[0].key
      }
      if (this.operate === operateType.INSERT) {
        this.$emit('insertBannerInfo', vo)
      } else {
        vo.bannerId = this.bannerId
        this.$emit('modifyBannerInfo', vo)
      }
    },
    getOperateType () {
      if (this.operate === operateType.INSERT) {
        return '添加'
      } else {
        return '更新'
      }
    },
    async getArticleData () {
      this.fetching = true
      // 请求接口
      const { data } = await articleSearch(this.searchVo)
      this.articleData = data.articles
      this.fetching = false
    },
    handleCancel (e) {
      this.visible = false
      this.uploadUrl = ''
      this.bannerInfo.articleId = []
      this.searchVo.title = ''
      this.searchVo.type = 0
    },
    handleDeselect (val) {
      this.bannerInfo.articleId = []
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    customUpload (e) {
      console.log(e)
      const formData = new FormData()
      formData.append('file', e.file)
      uploadFile(formData).then(res => {
        this.uploadUrl = res.data.url
      })
    },
    handleChange (info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          this.uploadUrl = imageUrl
          this.uploadLoading = false
        })
      }
    },
    handleChangeArticle (val) {
      if (this.bannerInfo.articleId.length === 1) {
        this.$message.warning('只允许关联一篇文章！')
        return
      }
      this.bannerInfo.articleId = val
    },
    changeType (val) {
      this.searchVo.type = val
      this.articleData = []
      this.bannerInfo.articleId = []
    },
    handleSearch (val) {
      this.searchVo.title = val
      this.getArticleData()
    }
  }
}
</script>

<style scoped>

</style>
