<template>
  <div>
    <a-spin :spinning='loading'>
      <a-form :form='form' style='max-width: 600px; margin: 40px auto 0;'>
      <a-form-item
        style='display: flex;align-items: center'
        :labelCol='labelCol'
        :wrapperCol='wrapperCol'
        class='upload-img'
      >
        <span slot='label'>
        封面&nbsp;
        <a-tooltip title='面试题不需要上传封面'>
          <a-icon type='question-circle-o' />
        </a-tooltip>
      </span>
        <a-upload-dragger
          name='cover'
          :multiple='false'
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :customRequest="customUpload"
          @change='handleChange'
        >
          <img v-if="uploadUrl" :src="uploadUrl" alt="avatar" style='width: 475px;height: 130px;object-fit: contain'/>
          <p v-if='!uploadUrl' class='ant-upload-drag-icon'>
            <a-icon type='inbox' />
          </p>
          <p v-if='!uploadUrl' class='ant-upload-text'>
            点击或拖拽文件到此区域上传
          </p>
        </a-upload-dragger>
      </a-form-item>
      <a-form-item
        label='内容标题'
        :labelCol='labelCol'
        :wrapperCol='wrapperCol'
      >
        <a-input
          placeholder='请输入标题'
          :allowClear='true'
          v-decorator="['title', { initialValue: info.title, rules: [{ required: true, message: '内容标题不能为空！'}] }]" />
      </a-form-item>
      <a-form-item
        label='内容简介'
        :labelCol='labelCol'
        :wrapperCol='wrapperCol'
      >
        <a-textarea
          :defaultValue='form.description'
          :allowClear='true'
          :auto-size='{ minRows: 3, maxRows: 5 }'
          v-decorator="['description', { initialValue: info.description }]"
          placeholder='请输入内容简介' />
      </a-form-item>
      <a-form-item
        label='内容分类'
        :labelCol='labelCol'
        :wrapperCol='wrapperCol'
      >
        <a-select
          :default-value='form.categoryId'
          v-decorator="['categoryId', { initialValue: info.categoryId, rules: [{ required: true, message: '内容分类不能为空！' }] }]">
          <a-select-option v-for='cate in twiceCategories ? twiceCategories : []' :key='cate.id' :value='cate.id'>
            {{ cate.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label='内容类型'
        :labelCol='labelCol'
        :wrapperCol='wrapperCol'
      >
        <a-select
          v-decorator="['type', { initialValue: info.type, rules: [{ required: true, message: '内容类型不能为空' }] }]">
          <a-select-option :value='0'>
            技术分享
          </a-select-option>
          <a-select-option :value='1'>
            面试题
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label='是否推荐'
        :labelCol='labelCol'
        :wrapperCol='wrapperCol'
      >
        <a-radio-group name='radioGroup' v-model='isRecommend' :default-value='false' @change='changeModel'>
          <a-radio :value='false'>
            普通
          </a-radio>
          <a-radio :value='true'>
            推荐
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    </a-spin>
    <div class='display-flex justify-between'>
      <a-button type='primary' @click='prevStep'>上一步</a-button>
      <a-button type='primary' @click='nextStep' v-html='operateWay()'></a-button>
    </div>
  </div>
</template>

<script>
import { allTwiceCategoryData } from '@/api/category'
import { uploadFile } from '@/api/login'
import { operateType } from '@/constants'
import { articleInfo } from '@/api/article'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'StepToBaseInfo',
  props: {
    content: {
      type: String,
      default: ''
    },
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      isRecommend: false,
      twiceCategories: [],
      uploadUrl: '',
      uploadLoading: false,
      info: {
        title: '',
        description: '',
        categoryId: '',
        type: 0
      },
      loading: false
    }
  },
  created () {
    this.allTwiceCategories()
  },
  methods: {
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          const vo = {
            ...values,
            isRecommend: this.isRecommend,
            content: this.content,
            cover: this.uploadUrl
          }
          const { id, type } = this.$route.query
          if (type === operateType.UPDATE) {
            vo.id = id
          }
          this.$emit('finishPublish', vo)
        }
      })
    },
    operateWay () {
      const { type } = this.$route.query
      if (type === operateType.UPDATE) {
        return '更新'
      } else {
        return '发布'
      }
    },
    async allTwiceCategories () {
      this.loading = true
      const { data } = await allTwiceCategoryData()
      this.twiceCategories = data.result
      this.initData(this.twiceCategories)
      this.loading = false
    },
    async initData (cates) {
      const { id, type } = this.$route.query
      // 如果是更新操作
      if (type === operateType.UPDATE) {
        const { data } = await articleInfo(id)
        this.info = data.article
        this.isRecommend = data.article.recommend
        this.uploadUrl = data.article.cover
      } else {
        if (this.baseInfo) {
          this.info = this.baseInfo
          this.uploadUrl = this.baseInfo.cover
          this.isRecommend = this.baseInfo.recommend
        } else {
          this.info.type = 0
          this.info.categoryId = cates[0].id
        }
      }
    },
    prevStep () {
      this.$emit('prevStep', this.content)
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
    changeModel (e) {
      this.isRecommend = e.target.value
    }
  }
}
</script>

<style lang='less' scoped>
.step-form-style-desc {
  padding: 0 56px 0 30px;
  color: rgba(0, 0, 0, .45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, .45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
