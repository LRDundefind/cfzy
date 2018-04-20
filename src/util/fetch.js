
import md5 from 'js-md5';
const unchangeable={
  language : 'zh_CN',
  terminal_type : 'OWNER_PC',
  version : 1,
} 

export function serverMoudle(params) {
 
  let randomKey = window.localStorage.getItem('randomKey') || ''
  let owner_ids = window.localStorage.getItem('owner_id') || ''
  let roleIds = window.localStorage.getItem('roleId') || ''
  let uids = window.localStorage.getItem('uid') || ''
  let gids = JSON.parse(window.localStorage.getItem('gid')) || ''
 
  const changeable={
    uid : uids,
    roleId:roleIds,
    owner_id : owner_ids,
    gid : gids[0].gid
  } 
  console.log(changeable)
  // params.owner_id=window.localStorage.getItem('owner_id') || '';
  // params.gid=JSON.parse(window.localStorage.getItem('gid'))[0].gid || ''
 let nObj= Object.assign({},params,unchangeable,changeable);

  let BaseTransferEntity = new Object();
  BaseTransferEntity.object = Base64.encode(JSON.stringify(nObj));
  BaseTransferEntity.sign   = md5.hex(BaseTransferEntity.object + randomKey);
  return BaseTransferEntity
}