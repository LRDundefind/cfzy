import axios from "../../index";
import { serverMoudle } from '@/util/fetch'

export const sysSpending = {
    //支出类型列表
    list(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_TYPE',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //修改支出类型状态
    editStatus(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_TYPESTATUS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //添加支出类型
    addList(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_TYPE',
            method: 'post',
            data: serverMoudle(data)
        });
    },


}