// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/style/ui-box.scss';
import App from './App'
import router from './router'
import axios from 'axios'
import vuex from 'vuex'
//import VueSocketio from 'vue-socket.io';
//import store from './store'
import md5 from 'js-md5';
let Base64 = require('js-base64').Base64;
import Cookies from 'js-cookie'
//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//组件
import TitleBar from '@/components/TitleBar';
//过滤器
import * as filters from '@/filters'; // 全局vue filter
//设置全局输入框限制长度
import global_ from './util/setInput';
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

import 'babel-polyfill'

//引入公共样式 公共部门放入入口不要和其它组件耦合在一起

import '@/style/common.scss';
import '@/style/elementUI.scss';
//注册ElementUI主键
Vue.use(ElementUI);

//Vue.use(VueSocketio, 'http://47.106.86.30:8080/rest/user/7ae860daef924fbfbf58b654538b3396/msg');

//注册标题组件
Vue.component('title-bar', TitleBar);

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	//store,
	components: {
		App
	},
	template: '<App/>'
})
