import ownerList from '@/views/owner/ownerList'
import ownerDetail from '@/views/owner/ownerDetail'

export default [{
	path: 'owner',
	name: 'owner',
	component: ownerList
},{
	path: 'owner/ownerDetail/:uid',
	name: 'owner/ownerDetail',
	component: ownerDetail,
	meta: {
		showSidebar: false
	}
}]

	