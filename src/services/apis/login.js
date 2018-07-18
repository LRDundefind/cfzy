import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const login = {
    
    auth(params) {
        return axios({
            url: '/rest/CHENGFENG_GET_LOGIN',
            method: 'get',
            params: params || {}
        });
    },
    getmessname(params){
    	return axios({
            url: '/rest/CHENGFENG_GET_SMS',
            method: 'get',
            params: params || {}
        });
    },
    zhuce(params){
    	return axios({
            url: '/rest/CHENGFENG_SET_NEWUSER',
            method: 'get',
            params: params || {}
        });
    },
    //验证手机号
    numberCheck(params){
        return axios({
            url: '/rest/CHENGFENG_NUMBER_CHECK',
            method: 'get',
            params: params || {}
        });
    }
}