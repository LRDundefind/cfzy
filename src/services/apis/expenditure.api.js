import axios from "../index";
import { serverMoudle } from '@/util/fetch'
var token=window.localStorage.getItem('token') || ''

// 接口要求参数加密处理进行封装方法  auth:王欣宇 2018-04-04 
export const PAY = {
    
    index(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_PAY',
            method: 'post',
            header:  {'Authorization': 'Bearer' + token},
            data: serverMoudle(params) || {}
        });
    },
    Huozhu(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_REMIT',
            method: 'post',
            header:  {'Authorization': 'Bearer' + token},
            data: serverMoudle(params) || {}
        });
    },
}