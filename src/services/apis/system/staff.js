import axios from "../../index";
import { serverMoudle } from '@/util/fetch'

export const staff = {
    //新增员工
    add(data) {
        return axios({
            url: '/rest/',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //列表
    list(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_EMPLOYEE',
            method: 'post',
            data: serverMoudle(data)
        });
    },
     //编辑财务
     editor_MONEY(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_FINANCEINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //编辑卖手
    editor_PAY(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_SELEINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
     //添加财务
     add_MONEY(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_FINANCE',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //添加卖手
    add_PAY(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_SELE',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    // 获取卖手信息
    get_PAYmessage(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELE',
            method: 'post',
            data: serverMoudle(data)
        });
    },
}