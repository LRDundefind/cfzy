import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const analysis = {
    //
    listS(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_DAYINCOME',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    listZ(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_DAYEXPEND',
            method: 'post',
            data: serverMoudle(data)
        });
    }
}