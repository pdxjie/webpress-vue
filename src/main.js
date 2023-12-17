// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'
import { Dialog } from '@/components'
import '@/styles/common.less'
// vue markdown
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
/* 2、v-md-editor 代码块关键字高亮  */
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
/* 引入表情包 */
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
// 引入所有语言包
import hljs from 'highlight.js'
/* 3、v-md-editor 二次封装  */
import mdEditor from '@/components/v-md/index'
// 封装emit
VueMarkdownEditor.use(vuepressTheme, {
  Prism
})
VueMarkdownEditor.use(createEmojiPlugin())
VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs
})
Vue.use(VueMarkdownEditor)
Vue.component('MdEditor', mdEditor)
Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(Dialog)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
