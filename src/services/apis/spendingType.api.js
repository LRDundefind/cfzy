import axios from "../index";
import { serverMoudle } from '@/util/fetch'
var token=window.localStorage.getItem('token') || ''

// 接口要求参数加密处理进行封装方法
export const spending = {
    
    index(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_TYPE',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    history(params){
        return axios({
            url: 'rest/CHENGFENG_SET_HISTORY',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    }
}