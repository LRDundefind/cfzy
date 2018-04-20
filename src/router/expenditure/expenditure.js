//支出页面路由
import Expenditure from '@/views/expenditure/expenditure'
import OrdinaryExpenditure from '@/views/expenditure/ordinaryExpenditure'
import OwnerLoan from '@/views/expenditure/ownerLoan'
import ExpendHistory from '@/views/expenditure/expendHistory'

export default [{
	path: 'expenditure',
	name: 'expenditure',
	component: Expenditure,
	redirect: '/expenditure/ordinaryExpenditure',
	children: [{
		path: 'ordinaryExpenditure',
		name: 'ordinaryExpenditure',
		components: {
			expenditureView: OrdinaryExpenditure
		}
	},{
		path: 'ownerLoan',
		name: 'ownerLoan',
		components: {
			expenditureView: OwnerLoan
		}
	},{
		path: 'expendHistory',
		name: 'expendHistory',
		components: {
			expenditureView: ExpendHistory
		}
	}]
}]