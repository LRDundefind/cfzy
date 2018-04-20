import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const client = {
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
    }
}