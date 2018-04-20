//车次列表
import train from '@/views/inventory/train'
//货品库存
import goods from '@/views/inventory/goods'
//结算
import account from '@/views/inventory/account'
//车次详情
import trainDetail from '@/views/inventory/trainDetail'
//订单列表
import orderList from '@/views/inventory/orderList'
//打印单预览
import statement from '@/views/inventory/statement'

export default [{
		path: 'train',
		name: 'train',
		component: train,	
	},{
		path: 'goods',
		name: 'goods',
		component: goods
	},{
		path: 'train/account/:tid',
		name: 'train/account',
		component: account,
		meta: {
			showSidebar: false
		}
	},{
		path: 'train/trainDetail/:tid',
		name: 'train/trainDetail',
		component: trainDetail,
		meta: {
			showSidebar: false
		}
	},{
		path: 'train/orderList/:tid',
		name: 'train/orderList',
		component: orderList,
		meta: {
			showSidebar: false
		}
	},{
		path: 'train/statement/:tid',
		name: 'train/statement',
		component: statement,
		meta: {
			showSidebar: false
		}
	}]

	