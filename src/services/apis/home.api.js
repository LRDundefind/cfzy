import axios from "../index";
import { serverMoudle } from '@/util/fetch'
var token=window.localStorage.getItem('token') || ''
// auth:wxy  2018 03 19 
// 如果使用mock对应的mock_list使用这个方法 直接获取数据
// export function shuju(params) {
//   return axios({
//     url: 'http://slams.dev.chinamobo.com/mock_list/mock_list',
//     method: 'get',
//     params: params || {}
//   });
// }
// export function headlineList(params) {
//   return axios({
//     url: 'http://slams.dev.chinamobo.com/headlineList',
//     method: 'get',
//     params: params || {}
//   });
// }

// 接口要求参数加密处理进行封装方法  auth:王欣宇 2018-04-04 
export const home = {
    //首页
    index(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SUMMARY',
            method: 'post',
            // header:  {'Authorization': 'Bearer' + token},
            data: serverMoudle(params) || {}
        });
    },
    //黑名单
    blacklist(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SAAS_BLACK',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //意见反馈
    feedBack(params) {
        return axios({
            url: 'rest/CHENGFENG_ADD_SAAS_FEEDBACK',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },

    //获取操作日志
    log(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_LOG',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取档位列表
    gearList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_GEAR',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    }

}