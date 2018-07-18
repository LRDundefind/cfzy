//销售开单
import salesOrder from '@/views/salesOrder/salesOrder'
//下单
import sales from '@/views/salesOrder/sales'
//import sales from '@/views/salesOrder/salesCopy'
//暂存订单
import tsList from '@/views/salesOrder/tsList'

export default [{
	path: 'salesOrder',
	name: 'salesOrder',
	component: salesOrder,
	redirect: '/salesOrder/sales',
	children: [{
		path: 'sales',
		name: 'sales',
		components: {
			salesOrder: sales
		}
	}, {
		path: 'tsList',
		name: 'tsList',
		components: {
			salesOrder: tsList
		}
	}]
}]