<template>
  <div>
    <a-modal v-model='visible' title='添加字典' on-ok='handleOk' :closable='false'>
      <template slot='footer'>
        <a-button key='back' @click='handleCancel'>取消</a-button>
        <a-button key='submit' type='primary' :loading='loading' @click='handleOk'>添加</a-button>
      </template>
      <a-form layout='horizontal' :form='form' :label-col='{ span: 5 }' :wrapper-col='{ span: 15 }'>
        <a-form-item label='字典 Key'>
          <a-input
            v-decorator="['dicKey', { rules: [{ required: true, message: '字典 Key 不能为空！' }] }]"
            placeholder='请输入字典 Key'
            v-model='form.dicKey'
            :allowClear='true' />
        </a-form-item>
        <a-form-item label='字典 Val'>
          <a-input
            placeholder='请输入字典 Value'
            v-model='form.dicValue'
            :allowClear='true'
            v-decorator="['dicValue', { rules: [{ required: true, message: '字典 Value 不能为空！' }] }]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

export default {
  name: 'AddDictionary',
  data () {
    return {
      loading: false,
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          // 校验通过，执行提交操作
          this.loading = true
          // 组装参数
          const dicVo = {
            dicKey: values.dicKey,
            dicValue: values.dicValue
          }
          this.$emit('insertDicInfo', dicVo)
        }
      })
    },
    handleCancel (e) {
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
