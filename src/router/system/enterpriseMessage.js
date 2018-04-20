import system from '@/views/system/system'
//企业信息
import enterpriseMessage from '@/views/system/enterpriseMessage'
//支出类型
import spendingType from '@/views/system/spendingType'
//档位管理
import record from '@/views/system/record'
//货品分类
import goodsType from '@/views/system/goodsType'
//个人资料
import personalData from '@/views/system/personalData'
//赊账规则
import creditRules from '@/views/system/creditRules'
//员工管理
import staff from '@/views/system/staff'
//员工详情
import staffDetail from '@/views/system/staffDetail'

export default [{
	path: 'system',
	name: 'system',
	component: system,
	redirect: '/system/enterpriseMessage',
	children: [
		{
			path: 'enterpriseMessage',
			name: 'enterpriseMessage',
			components: {
				systemView: enterpriseMessage
			}
		},{
			path: 'spendingType',
			name: 'spendingType',
			components: {
				systemView: spendingType
			}
		},{
			path: 'record',
			name: 'record',
			components:{
				systemView: record
			} 
		},{
		    path: 'personalData',
		    name: 'personalData',
		    components:{
		    	systemView:personalData
		    } 
		},{
		    path: 'creditRules',
		    name: 'creditRules',
		    components:{
		    	systemView:creditRules
		    } 
		},{
		    path: 'staff',
		    name: 'staff',
		    components:{
		    	systemView:staff
		    } 
		}
	]
	},
	{
		path: 'system/goodsType/:gid',
		name: 'goodsType',
		component:goodsType,
		meta: {
			showSidebar: false
		}
	},
	{
		path: 'system/staff/staffDetail/:types/:ids/:names/:phones/:createTimes/:remarks/:gearNames/:status',
		name: 'staff/staffDetail',
		component: staffDetail
	}]
	

