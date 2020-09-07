import axios from 'axios';
import { message } from 'antd';

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    // console.log(config)
    // config.headers.user_id = sessionStorage.getItem("user_id")
    return config;
  },
  (error) => {
    // do something with request error
    console.log('error'); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // console.log('service.interceptors',res)
    if (res.code !== 200) {
      message.error(res.msg);
      if (res.code === 10060 || res.code === '10060') {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    console.log('err' + error); // for debug
    message.error(error.message);
    return Promise.reject(error);
  }
);

const service1 = axios.create({
  baseURL: process.env.VUE_APP_MOCK_API, // url = base url + request url
  timeout: 5000 // request timeout
});

// request interceptor
service1.interceptors.request.use(
  (config) => {
    console.log(config);
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

export { service as request, service1 as testRequest };
