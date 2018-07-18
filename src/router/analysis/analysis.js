//经营分析
import analysis from '@/views/analysis/analysis'
import creditReceive from '@/views/analysis/creditReceive'
import saleStatistics from '@/views/analysis/saleStatistics'
import employeeSale from '@/views/analysis/employeeSale'
import stallFund from '@/views/analysis/stallFund'

export default [
  {
    path: '/analysis',
    name: 'analysis',
    component: analysis
  },
  {
    path: '/analysis/creditReceive',
    name: 'creditReceive',
    component: creditReceive,
    meta: {
      showSidebar: true
    }
  },
  {
    path: '/analysis/saleStatistics',
    name: 'saleStatistics',
    component: saleStatistics,
    meta: {
      showSidebar: true
    }
  },
   {
    path: '/analysis/stallFund',
    name: 'stallFund',
    component: stallFund,
    meta: {
      showSidebar: true
    }
  },
  {
    path: '/analysis/employeeSale',
    name: 'employeeSale',
    component: employeeSale,
    meta: {
      showSidebar: true
    }
  }
]

