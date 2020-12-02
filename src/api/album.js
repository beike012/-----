import { request } from '@/utils/request';

//获取 album 数据
export function getAlbumDetail(id) {
  return request({
    url: '/album',
    method: 'get',
    params: { id }
  });
}
