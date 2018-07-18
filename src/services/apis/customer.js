import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const customer = {
    //
    list(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_CUSTOMER',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    info(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_CUSTOMERINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    transaction(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_CUSTOMER_ORDER',
            method: 'post',
            data: serverMoudle(data)
        });
    },remittance(data){
        return axios({
            url: '/rest/CHENGFENG_GET_CUSTOMER_TRANSFER',
            method: 'post',
            data: serverMoudle(data)
        });
    },editInfo(data){
        return axios({
            url: '/rest/CHENGFENG_SET_CUSTOMERINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },downLIST(data){
        // 打印催账单
        return axios({
            url: '/rest/CHENGFENG_GET_CUSTOMER_CALL',
            method: 'post',
            data: serverMoudle(data)
        });
    },getCredit(data){
        // 获取赊账情况
        return axios({
            url: '/rest/CHENGFENG_GET_CUSTOMER_CREDIT',
            method: 'post',
            data: serverMoudle(data)
        });
    },
};