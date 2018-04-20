import axios from "../../index";
import { serverMoudle } from '@/util/fetch'

export const creditRules = {
    //获取赊账规则
    getInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_CREDIT_RULES',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //列表
    editInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_CREDIT_RULES',
            method: 'post',
            data: serverMoudle(data)
        });
    },

};