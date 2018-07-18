import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const sales = {
	//获取可下单车次列表
    trainList(data) {
        return axios({
            url: '/rest/CHENGFENG_MGET_SELEMAN_TRAIN',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取卖手列表
    sellmenList(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELLMEN',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取车次货品信息
    goodsInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_MGET_SELEMAN_TGOODS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //计算订单货品价格
    goodCost(data) {
        return axios({
            url: '/rest/CHENGFENG_MGET_SELEMAN_GOODCOST',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //提交订单
    submitOrder(data) {
        return axios({
            url: '/rest/CHENGFENG_COMMIT_ORDER',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取暂存订单列表
    creditList(data) {
        return axios({
            url: '/rest/CHENGFENG_MGET_SELEMAN_DEPOSIT',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取暂存订单详情
    creditInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELEMAN_ORDERINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    
    //暂存订单设定价格
    deposit(data) {
        return axios({
            url: '/rest/CHENGFENG_MSET_SELEMAN_DEPOSIT',
            method: 'post',
            data: serverMoudle(data)
        });
    }
}