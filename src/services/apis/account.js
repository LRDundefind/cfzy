import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const account = {
    //卖手列表
    sellinglist(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELLING_HAND',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //订单列表
    list(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_ORDERLIST',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //取消订单
    cancel(data) {
        return axios({
            url: '/rest/CHENGFENG_CANCEL_ORDER',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //订单详情
    info(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_ORDERINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //订单结算
    knotclear(data) {
         return axios({
            url: '/rest/CHENGFENG_SET_KNOTCLEAR',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //打印结算单
    doc(data) {
         return axios({
            url: '/rest/CHENGFENG_SET_KNOT_DOC',
            method: 'post',
            data: serverMoudle(data)
        });
    },



    //获取赊账收款列表
    credit(data) {
         return axios({
            url: '/rest/CHENGFENG_SET_CREDIT',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取客户还款详情
    creditInfo(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_CREDITINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //查看可还款订单
    creditAmount(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_CREDITAMOUNT',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //确认还款
    sureCreditAmount(data) {
         return axios({
            url: '/rest/CHENGFENG_SET_CREDITAMOUNT',
            method: 'post',
            data: serverMoudle(data)
        });
    },
}