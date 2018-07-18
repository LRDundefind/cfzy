
//
//export const analysis = {
//  //
//  listS(data) {
//      return axios({
//          url: '/rest/CHENGFENG_GET_DAYINCOME',
//          method: 'post',
//          data: serverMoudle(data)
//      });
//  },
//  listZ(data) {
//       return axios({
//          url: '/rest/CHENGFENG_GET_DAYEXPEND',
//          method: 'post',
//          data: serverMoudle(data)
//      });
//  },
//  listW(data) {
//      return axios({
//          url: '/rest/CHENGFENG_GET_DAYCHECK',
//          method: 'post',
//          data: serverMoudle(data)
//      });
//  }
//}

import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const analysis = {

  employeeSale(data) {
    return axios({
      url: '/rest/CHENGFENG_GET_EMPLOYEE_SALE_STATISTICS',
      method: 'post',
      data: serverMoudle(data)
    });
  },

  stallStallIncome(data) {
    return axios({
      url: '/rest/CHENGFENG_GET_STALLFUND_INCOME_STATISTICS',
      method: 'post',
      data: serverMoudle(data)
    });
  },
  stallFundPay(data) {
    return axios({
      url: '/rest/CHENGFENG_GET_STALLFUND_PAY_STATISTICS',
      method: 'post',
      data: serverMoudle(data)
    });
  },
  stallFundReceive(data) {
    return axios({
      url: '/rest/CHENGFENG_GET_STALLFUND_RECEIVE_STATISTICS',
      method: 'post',
      data: serverMoudle(data)
    });
  },
  listSale(data) {
    return axios({
      url: '/rest/CHENGFENG_GET_SALE_STATISTICS',
      method: 'post',
      data: serverMoudle(data)
    });
  },
  listCreditReceive(data) {
    return axios({
      url: '/rest/CHENGFENG_GET_CREDIT_RECEIVE_STATISTICS',
      method: 'post',
      data: serverMoudle(data)
    });
  },
  listCreditNotReceive(data) {
    return axios({
      url: '/rest/CHENGFENG_GET_CREDIT_NOT_RECEIVE_STATISTICS',
      method: 'post',
      data: serverMoudle(data)
    });
  },
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
  },
  listW(data) {
    return axios({
      url: '/rest/CHENGFENG_GET_DAYCHECK',
      method: 'post',
      data: serverMoudle(data)
    });
  }

}

