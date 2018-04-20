import axios from "../../index";
import { serverMoudle } from '@/util/fetch'

export const enterprise = {
    //获取企业信息
    getInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_COMPANY',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //列表
    editInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_COMPANY',
            method: 'post',
            data: serverMoudle(data)
        });
    },

};