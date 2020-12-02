import { request } from '@/utils/request';

//获取视频播放地址
export function getVideoUrl(id) {
  return request({
    url: '/video/url',
    method: 'get',
    params: { id }
  });
}
//获取 video 数据
export function getVideoDetail(id) {
  return request({
    url: '/video/detail',
    method: 'get',
    params: { id }
  });
}
//获取视频点赞转发评论数数据
export function getVideoDetailInfo(vid) {
  return request({
    url: '/video/detail/info',
    method: 'get',
    params: { vid }
  });
}
//相关视频
export function getRelatedVideo(id) {
  return request({
    url: '/related/allvideo',
    method: 'get',
    params: { id }
  });
}
//视频评论
export function getVideoComment(params) {
  return request({
    url: '/comment/video',
    method: 'get',
    params
  });
}
