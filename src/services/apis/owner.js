import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const owner = {
    //获取货主列表
    list(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_GOOD_OWNER',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //货主详情
    info(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_GOOD_OWNER_INFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //修改|新增货主信息
    addEdit(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_GOOD_OWNERINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取货主交易记录
    ownerTrans(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_GOOD_OWNER_TRANS',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //获取货主会员记录
    ownerRemit(data) {
         return axios({
            url: '/rest/CHENGFENG_GET_GOOD_OWNER_REMIT',
            method: 'post',
            data: serverMoudle(data)
        });
    }

}