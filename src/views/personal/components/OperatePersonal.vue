<template>
  <div>
    <a-modal v-model='visible' :title='title[0]' on-ok='handleOk'>
      <template slot='footer'>
        <a-button key='back' @click='handleCancel'>取消</a-button>
        <a-button key='submit' type='primary' :loading='loading' @click='handleOk'>{{ title[1] }}</a-button>
      </template>
      <a-form layout='horizontal' :form='userVo' :label-col='{ span: 5 }' :wrapper-col='{ span: 15 }'>
        <a-form-item label='OpenId'>
          <a-input
            placeholder='微信标识'
            :value='userVo.openId'
            :disabled='true' />
        </a-form-item>
        <a-form-item label='昵称'>
          <a-input
            v-decorator="['nickName', { rules: [{ required: true, message: '用户昵称不能为空！' }] }]"
            placeholder='请输入用户昵称'
            v-model='userVo.nickName'
            :allowClear='true' />
        </a-form-item>
        <a-form-item label='邮箱'>
          <a-input
            placeholder='请输入用户邮箱'
            v-model='userVo.email'
            :allowClear='true'
            v-decorator="['email', { rules: [{ required: true, message: '用户邮箱不能为空！' }] }]" />
        </a-form-item>
        <a-form-item label='性别'>
          <a-select
            :default-value='userVo.sex'
            v-model='userVo.sex'
            placeholder='请选择用户性别'
            v-decorator="['sex', { rules: [{ required: true, message: '性别不能为空！' }] }]">
            <a-select-option :value='0'>
              男
            </a-select-option>
            <a-select-option :value='1'>
              女
            </a-select-option>
            <a-select-option :value='2'>
              未知
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label='密码'>
          <a-input-password placeholder='请输入用户密码' v-model='userVo.password' />
        </a-form-item>
        <a-form-item label='备注'>
          <a-textarea placeholder='请输入用户备注' v-model='userVo.remark' :allowClear='true' />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import { userInfo } from '@/api/user'
import { uid } from '@/utils/common'

export default {
  name: 'OperatePersonal',
  props: {
    title: {
      type: Array,
      default: () => {
        return []
      }
    },
    userId: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {
      loading: false,
      visible: false,
      userVo: this.$form.createForm(this)
    }
  },
  watch: {
    async visible () {
      if (this.userId) {
        const { data } = await userInfo(this.userId)
        this.$nextTick(() => {
          if (!data.openId) {
            data.openId = uid()
          }
          this.userVo.openId = data.openId
          this.userVo.remark = data.remark
          this.userVo.setFieldsValue(data)
        })
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.userVo.validateFields((errors, values) => {
        if (!errors) {
          // 校验通过，执行提交操作
          console.log(values)
        }
      })
    },
    handleCancel (e) {
      this.visible = false
      this.userVo.resetFields()
      this.userId = ''
    }
  }
}
</script>

<style scoped>

</style>
