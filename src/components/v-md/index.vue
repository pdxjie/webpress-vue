<template>
  <div>
    <v-md-editor
      :class="isMobile ? 'custom' : ''"
      v-model="content"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      :mode="mode"></v-md-editor>
  </div>
</template>

<script>
export default {
  name: 'MdEditor',
  data () {
    return {
      info: ''
    }
  },
  props: {
    // 接收值父组件传递值
    content: String,
    isMobile: Boolean,
    mode: String
  },
  methods: {
    // v-md-editor 文件上传
    handleUploadImage (event, insertImage, files) {
      // 上传
      for (let i = 0; i < files.length; i++) {
        this.crud.upload(files[i], 'image/vMdEditor/').then(res => {
          // 获取返回数据
          const data = res.data.data
          // 添加图片到内容
          insertImage({
            url: data.url,
            desc: data.name
          })
        })
      }
    }
  },
  watch: {
    editorValue: function (newNum, oldNum) {
      // 修改调用者传入的值
      this.$emit('update:content', newNum)
    }
  }
}
</script>

<style scoped lang='less'>
.custom {
  ::v-deep .v-md-editor__toolbar-left+.v-md-editor__toolbar-right {
    margin-left: unset!important;
  }
  ::v-deep .v-md-editor__toolbar-item:not(:first-child) {
    margin-left: unset!important;
    margin-top: 2px!important;
  }
  ::v-deep .v-md-editor__toolbar-divider {
    height: 2px;
    margin: 0 0px!important;
  }
}

</style>
