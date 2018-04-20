import axios from "../../index";
import { serverMoudle } from '@/util/fetch'

export const personal = {
    //获取个人资料
    getInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_INFORMATION',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //设置个人资料
    editInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_INFORMATION',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //修改手机号
    alterPhone(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_PHONE',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //修改密码
    alterPassword(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_PASSWORD',
            method: 'post',
            data: serverMoudle(data)
        });
    },

};