 //订单列表
import Order from '@/views/accountReceivable/order'
//订单结算
import OrderSettlement from '@/views/accountReceivable/orderSettlement'
//订单结算打印
import OrderSettlementSheet from '@/views/accountReceivable/orderSettlementSheet'
//订单详情
import OrderDetails from '@/views/accountReceivable/orderDetails'
//赊账订单列表
import CreditOrder from '@/views/accountReceivable/creditOrder'
//赊账订单列表-赊账收账
import CreditOrderSZSZ from '@/views/accountReceivable/creditOrder-szsz'
//赊账订单列表-赊账订单
import CreditOrderSZDD from '@/views/accountReceivable/creditOrder-szdd'
//赊账订单列表-赊账订单
import CreditOrderHZDD from '@/views/accountReceivable/creditOrder-HZDD'
//赊账订单还款
import Repayment from '@/views/accountReceivable/repayment'
//赊账订单详情
import CreditOrderDetails from '@/views/accountReceivable/creditOrderDetails'

export default [{
	path: '/order',
	name: 'order',
	component: Order
}, {
	path: 'order/orderSettlement/:temporaryUser',
	name: 'order/orderSettlement',
	component: OrderSettlement,
	meta: {
		showSidebar: false
	}
}, {
	path: 'order/orderSettlementSheet/:oid',
	name: 'order/orderSettlementSheet',
	component: OrderSettlementSheet,
	meta: {
		showSidebar: false
	}
}, {
	//temporaryUser	0：匿名现结订单	1：实名现结订单 2  赊账订单
	path: 'order/orderDetails/:temporaryUser',
	name: 'order/orderDetails',
	component: OrderDetails,
	meta: {
		showSidebar: false
	}
}, {
	path: 'creditOrder',
	name: 'creditOrder',
	component: CreditOrder,
	redirect: '/creditOrder/SZSZ',
	children: [{
		path: 'SZSZ',
		name: 'SZSZ',
		components: {
			creditOrderView: CreditOrderSZSZ
		}
	}, {
		path: 'SZDD',
		name: 'SZDD',
		components: {
			creditOrderView: CreditOrderSZDD
		}
	}, {
		path: 'HZDD',
		name: 'HZDD',
		components: {
			creditOrderView: CreditOrderHZDD
		}
	}]
}, {
	path: 'order/repayment/:repaymentId',
	name: 'order/repayment',
	component: Repayment,
	meta: {
		showSidebar: false
	}
}, {
	path: 'order/creditOrderDetails',
	name: 'order/creditOrderDetails',
	component: CreditOrderDetails,
	meta: {
		showSidebar: false
	}
}];