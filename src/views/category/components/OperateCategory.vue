<template>
  <div>
    <a-modal v-model='visible' :title='type === "insert" ? "添加分类" : "更新分类"' :closable='false'>
      <template slot='footer'>
        <a-button key='back' @click='handleCancel'>取消</a-button>
        <a-button key='submit' type='primary' :loading='loading' @click='handleOk'>{{ type === "insert" ? "添加" : "更新" }}</a-button>
      </template>
      <a-form layout='horizontal' :form='form' :label-col='{ span: 5 }' :wrapper-col='{ span: 15 }'>
        <a-form-item label='图标' style='display: flex;align-items: center'>
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :customRequest="customUpload"
            @change="handleChange"
          >
            <img v-if="uploadUrl" :src="uploadUrl" alt="avatar" style="width: 150px;height: 150px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                上传
              </div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label='名称'>
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '分类名称不能为空！' }] }]"
            placeholder='请输入分类名称'
            v-model='form.name'
            :allowClear='true' />
        </a-form-item>
        <a-form-item label='父级'>
          <a-select v-decorator="['pid', { initialValue: '0', rules: [{ required: true, message: '父级不能为空！' }] }]" v-model='form.pid'>
            <a-select-option value="0">
              父级
            </a-select-option>
            <a-select-option v-for='(cate) in parents' :value="cate.id" :key='cate.id'>
              {{ cate.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import { allParents, categoryInfo } from '@/api/category'
import { uploadFile } from '@/api/login'
import { operateType } from '@/constants'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'OperateCategory',
  props: {
    type: {
      type: String,
      default: 'insert'
    },
    categoryId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      visible: false,
      form: this.$form.createForm(this),
      parents: [],
      uploadUrl: '',
      uploadLoading: false
    }
  },
  created () {
    this.allParentCategories()
  },
  watch: {
    async categoryId () {
      if (this.categoryId) {
        const { data } = await categoryInfo(this.categoryId)
        console.log(data, 'info')
        this.form.setFieldsValue(data.result)
        this.uploadUrl = data.result.icon
      } else {
        this.form.resetFields()
        this.uploadUrl = ''
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.uploadLoading = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          this.uploadUrl = imageUrl
          this.uploadLoading = false
        })
      }
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
    handleOk () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          // 校验通过，执行提交操作
          this.loading = true
          // 组装参数
          const dicVo = {
            name: values.name,
            pid: values.pid
          }
          if (this.type === operateType.INSERT) {
            this.$emit('insertCategoryInfo', dicVo, this.uploadUrl)
          } else {
            dicVo.id = this.categoryId
            this.$emit('updateCategoryInfo', dicVo, this.uploadUrl)
          }
          this.$emit('resetCategoryId')
        }
      })
    },
    handleCancel (e) {
      this.visible = false
      this.$emit('resetCategoryId')
      this.form.resetFields()
    },
    async allParentCategories () {
      const { data } = await allParents()
      this.parents = data.result
    }
  }
}
</script>

<style scoped>

</style>
