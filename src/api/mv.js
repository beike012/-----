import {request} from '@/utils/request'

//根据mvid播放mv
export function getMvUrl(id) {
  return request({
    url: '/mv/url',
    method: 'get',
    params:{id}
  })
}
//获取 mv 数据
export function getMvDetail(mvid) {
  return request({
    url: '/mv/detail',
    method: 'get',
    params:{mvid}
  })
}
//获取 mv 点赞转发评论数数据
export function getMvDetailInfo(mvid) {
  return request({
    url: '/mv/detail/info',
    method: 'get',
    params:{mvid}
  })
}
//相关视频
export function getRelatedVideo(id) {
  return request({
    url: '/related/allvideo',
    method: 'get',
    params:{id}
  })
}