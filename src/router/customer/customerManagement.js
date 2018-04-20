//客户管理
import customerManagement from '@/views/customer/customerManagement'
//客户详情
import customDetails from '@/views/customer/customDetails'
//添加/编辑客户
import addCustomer from '@/views/customer/addCustomer'
//添加账单页面
import down from '@/views/customer/down'

export default [{
    path: '/customerManagement',
    name: 'customerManagement',
    component: customerManagement
}, {
    path: '/customDetails/:id',
    name: 'customDetails',
    component: customDetails,
    meta: {
        showSidebar: false
    }
},{
    path: '/addCustomer/update/:id',
    name: 'addCustomer/update',
    component: addCustomer,
    meta: {
        showSidebar: false
    }
},{
    path: '/addCustomer/down/:id',
    name: 'addCustomer/down',
    component: down,
    meta: {
        showSidebar: false
    }
}
]