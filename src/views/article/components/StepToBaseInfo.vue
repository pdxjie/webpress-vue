<template>
  <div>
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
          v-model='form.title'
          v-decorator="['title', { rules: [{ required: true, message: '内容标题不能为空！'}] }]" />
      </a-form-item>
      <a-form-item
        label='内容简介'
        :labelCol='labelCol'
        :wrapperCol='wrapperCol'
      >
        <a-textarea
          :defaultValue='form.description'
          :allowClear='true'
          v-model='form.description'
          :auto-size='{ minRows: 3, maxRows: 5 }'
          v-decorator="['description']"
          placeholder='请输入内容简介' />
      </a-form-item>
      <a-form-item
        label='内容分类'
        :labelCol='labelCol'
        :wrapperCol='wrapperCol'
      >
        <a-select
          :default-value='form.categoryId'
          v-model='form.categoryId'
          v-decorator="['categoryId', { initialValue: twiceCategories[0].id, rules: [{ required: true, message: '内容分类不能为空！' }] }]">
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
          v-model='form.type'
          v-decorator="['type', { initialValue: 0, rules: [{ required: true, message: '内容类型不能为空' }] }]">
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
        <a-radio-group name='radioGroup' :default-value='false' @change='changeModel'>
          <a-radio :value='false'>
            普通
          </a-radio>
          <a-radio :value='true'>
            推荐
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <div class='display-flex justify-between'>
      <a-button type='primary' @click='prevStep'>上一步</a-button>
      <a-button type='primary' @click='nextStep'>发布</a-button>
    </div>
  </div>
</template>

<script>
import { allTwiceCategoryData } from '@/api/category'
import { uploadFile } from '@/api/login'
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
      uploadLoading: false
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
          console.log(values, 'values')
          const vo = {
            ...values,
            isRecommend: this.isRecommend,
            content: this.content,
            cover: this.uploadUrl
          }
          this.$emit('finishPublish', vo)
        }
      })
    },
    async allTwiceCategories () {
      debugger
      const { data } = await allTwiceCategoryData()
      this.twiceCategories = data.result
      if (this.baseInfo) {
        this.form.setFieldsValue({
          title: this.baseInfo.title,
          description: this.baseInfo.description,
          categoryId: this.baseInfo.categoryId,
          type: this.baseInfo.type
        })
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
