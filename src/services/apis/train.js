import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const train = {
    //获取货品品类
    goods(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_GOODS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //入库员（卖手）列表
    sellinglist(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELLING_HAND',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //车次列表
    list(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_TRAINNUM',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //车次详情
    info(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_TRAIN_INFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //修改车次货品信息
    editGoodsInfo(data) {
         return axios({
            url: '/rest/CHENGFENG_SET_TRAIN_GOOD',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //修改车次物流信息
    editLogistics(data) {
         return axios({
            url: '/rest/CHENGFENG_SET_TRAIN_INFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //车次订单列表
    orders(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_TRAIN_ORDERS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //计算结算金额
    clear(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_TRAIN_CLEAR',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取车次结算单
    finalStatement(data) {
         return axios({
            url: '/rest/CHENGFENG_SET_TRAIN_CLEAR',
            method: 'post',
            data: serverMoudle(data)
        });
    },
}