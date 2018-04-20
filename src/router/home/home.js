//首页
import Home from '@/views/home/home'
//财务首页
import moneyHome from '@/views/home/moneyHome'
//黑名单
import blackList from '@/views/home/blackList'
//反馈列表
import feedBack from '@/views/home/feedBack'

export default [{
	path: 'home',
	name: 'home',
	component: Home
}, {
	path: 'moneyHome',
	name: 'moneyHome',
	component: moneyHome
},{
	path: 'blackList',
	name: 'blackList',
	component: blackList,
	meta: {
		showSidebar: false
	}
}, {
	path: 'feedBack',
	name: 'feedBack',
	component: feedBack,
	meta: {
		showSidebar: false
	}
}]