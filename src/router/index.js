import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
//Tab路由
import Tab from '@/views/tab/tab'
//登录路由
import Login from '@/views/login/login'
//首页路由
import Home from './home/home'
//收账路由
import Order from './accountReceivable/order'
//库存管理路由
import inventory from './inventory/inventory'
//货主管理
import owner from './owner/owner'
//客户管理路由
import customerManagement from './customer/customerManagement'
//系统信息路由
import enterpriseMessage from './system/enterpriseMessage'
//支出路由
import Expenditure from './expenditure/expenditure'
//经营分析
import analysis from './analysis/analysis'
//操作手册
import manipulateNote from './manipulateNote/index'
//销售开单
import salesOrder from './salesOrder/salesOrder'
Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
		path: '/',
		name: 'tab',
		component: Tab,
		redirect: '/Login',
		children: [
			...Home,
			...Order,
			...inventory,
			...owner,
			...customerManagement,
			...enterpriseMessage,
			...Expenditure,
			...analysis,
			...manipulateNote,
			...salesOrder
		],
		meta:{
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的,暂时设置为false，否则不能进入home
        }
	}]
})
/**
 * 路由拦截
 * @param  {[type]} (to, from, next [即将要进入的目标 路由对象，当前导航正要离开的路由，]
 * @return {[type]}      [description]
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
        if (Cookies.get('token')) {  // 判断当前的token是否存在
          next();
        }
        else {
          next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
          //console.log(to.fullPath);
        }
    }
    else {
        next();
    }
});
export default router;