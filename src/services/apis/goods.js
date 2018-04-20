import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const goods = {
    //获取货品品类
    list(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_INVENTORY',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //入库员（卖手）列表
    editGoods(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_INVENTORY',
            method: 'post',
            data: serverMoudle(data)
        });
    },
 
}