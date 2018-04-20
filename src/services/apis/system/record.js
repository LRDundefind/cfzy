import axios from "../../index";
import { serverMoudle } from '@/util/fetch'

export const record = {
    //新增档位
    add(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_STALLS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取市场列表
    marketList(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SAAS_MARKET',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //列表
    list(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_STALLS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取货品列表
    goodsList(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_GOODS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //添加货品
    addGoods(data) {
        return axios({
            url: '/rest/CHENGFENG_ADD_GOODS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //编辑货品
    editGoods(data) {
        return axios({
            url: '/rest/CHENGFENG_EDIT_GOODS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //改变状态
    status(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_STALLS_STATUS',
            method: 'post',
            data: serverMoudle(data)
        });
    }

}