import {request} from '@/utils/request'

//搜索
export function search(params) {
  return request({
    url: '/search',
    method: 'get',
    params
  })
}
//单曲
//根据id播放单曲
export function getSongUrl(id) {
  return request({
    url: '/song/url',
    method: 'get',
    params:{id}
  })
}