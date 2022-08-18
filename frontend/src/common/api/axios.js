
import axios from 'axios';
import moment from 'moment';
import { resetLogin } from '../../features/auth/authSlice';
import { API_URL, getRefreshToken, getToken, user } from './http-config';

// const axios1 = axios.create({
//     baseURL: API_URL,
//   });
  
// axios1.interceptors.response.use(
//   (config) => {
//     return config
//   },
//   function async (err){
//     const {
//           config,
//           response : {data}
//           } = err;
//     const originalRequest = config
//     console.log(err.config, err.data.code)
//     if(err.data.code===1003){
// 			// Refreshtoken을 통해 Accesstoken을 재발급한다.
// 			return axios.post(
//         API_URL +'reissue', {accessToken: getToken(), refreshToken: getRefreshToken()}
//       )
// 				.then(res => {
// 					// Response가 정상이라면
// 					if(res.status === 200){
// 						console.log('Inteceptors.Response] got succeed')
// 						localStorage.setItem('user', JSON.stringify(res.data.data));
// 						axios.defaults.headers.common['Authorizaion'] =
// 						  localStorage.getItem('user').accessToken;
// 						// 실패했던 요청을 다시 수행한다.
// 						return axios(originalRequest);
// 					}
// 				})
// 		} // Refreshtoken이 만료됬을때

// 	}

// 	);



// export default axios1;

// axios.interceptors.request.use(
//   (config) => {
//     const nowTime = moment(new Date()).format()
//     const loginDate = localStorage.getItem('expireDate')
//     console.log(moment.duration(nowTime.diff(loginDate).asMilliseconds()))
//   }
// )
let isTokenRefreshing = false;
let refreshSubscribers = [];
let newAccessToken = ''

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};
axios.interceptors.response.use(
    (response) => {
        console.log(response)
        // const nowTime = moment(new Date()).format()
        // const loginDate = localStorage.getItem('expireDate')
        // console.log(moment.duration((nowTime).diff(loginDate).asMilliseconds()))
      return response;
    },
    async (error) => {
        const {
            config,
            response : {data}
          } = error;
        const code = data.code
        const originalRequest = config;
        if (code === 1013) {
        // if (error.response.data.message === "") {
          if (!isTokenRefreshing){
            isTokenRefreshing = true
            const user = JSON.parse(localStorage.getItem('user'));
            let accessToken = user ? user.accessToken : null;
            let refreshToken = user ? user.refreshToken : null;
            axios.post(API_URL+"reissue", {accessToken: accessToken, refreshToken: refreshToken}, {withCredentials: true})
              .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data.data))
                newAccessToken = response.data.data.accessToken
                isTokenRefreshing = false;
                originalRequest.headers= { ...originalRequest.headers, 'X-Auth-Token': newAccessToken} 
                // return axios(originalRequest)
                onTokenRefreshed(newAccessToken);
              })
              // .catch((err) =>{
              //   localStorage.clear()
              //   window.location.href = '/'
              // })
          }
          const retryOriginalRequest = new Promise((resolve) => {
              addRefreshSubscriber((accessToken) => {
                originalRequest.headers= { ...originalRequest.headers, 'X-Auth-Token': accessToken} 
                resolve(axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        // }
      }
      return Promise.reject(error);
    }
  );



