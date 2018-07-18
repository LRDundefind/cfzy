
import md5 from 'js-md5';
import Cookies from 'js-cookie'
const unchangeable={
  language : 'zh_CN',
  terminal_type : 'OWNER_PC',
  version : 1,
} 
/**
 * 处理固定传参
 * @param  {[type]} params [其他入参]
 * @return {[type]}        [description]
 */
export function serverMoudle(params) {
  //去参数前后空格
  if (params) {
    for (var Key in params){
      if (typeof(params[Key]) == 'string') {
        params[Key] = params[Key].trim();
      }
    }
  }
  let randomKey = Cookies.get('randomKey') || ''
  let owner_ids = Cookies.get('owner_id') || ''
  let roleIds = Cookies.get('roleId') || ''
  let uids = Cookies.get('uid') || ''
  let gids = JSON.parse(Cookies.get('gid')) || ''
  //console.log(gids)
  // let randomKey = window.localStorage.getItem('randomKey') || ''
  // let owner_ids = window.localStorage.getItem('owner_id') || ''
  // let roleIds = window.localStorage.getItem('roleId') || ''
  // let uids = window.localStorage.getItem('uid') || ''
  // let gids = JSON.parse(window.localStorage.getItem('gid')) || ''
 
  const changeable={
    uid : uids,
    roleId:roleIds,
    owner_id : owner_ids,
    gid : gids.gid
  } 
  //console.log(changeable)
  //console.log(changeable)
  // params.owner_id=window.localStorage.getItem('owner_id') || '';
  // params.gid=JSON.parse(window.localStorage.getItem('gid'))[0].gid || ''
  let nObj= Object.assign({},params,unchangeable,changeable);
  //参数base64处理，签名MD5加密
  let BaseTransferEntity = new Object();
  BaseTransferEntity.object = Base64.encode(JSON.stringify(nObj));
  BaseTransferEntity.sign   = md5.hex(BaseTransferEntity.object + randomKey);
  return BaseTransferEntity
}