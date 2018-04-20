import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const login = {
    
    auth(params) {
        return axios({
            url: '/rest/auth',
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
    }
}