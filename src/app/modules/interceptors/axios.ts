// axiosConfig.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
axios.defaults.baseURL = 'https://stageio.symplify.app';
// axios.defaults.headers.common['Request-Origin'] = 'website';

const setupAxios = () => {
  console.log("INACIOS");
  let i=0;
axios.interceptors.request.use((config ) => {
  
  console.log('Request Interceptor:', config);
  console.log("Axios request");
  const accessToken = localStorage.getItem('token');


  if (accessToken) {
    i++;
    console.log(i);
    console.log(accessToken);
    config.headers = config.headers || {};
    axios.defaults.headers.common['Authorization'] = `JWT ${accessToken}`;
    config.headers['Authorization'] = `JWT ${accessToken}`;
    

  }
  console.log(config);
  return config;
});
let fresh = false;

// axios.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     console.log('Response Interceptor Error:', error);
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Your response interceptor logic
//     console.log(response);
//     return response;
//   },
//   async (error) => {
//     console.log("OK");
//     console.log(error);
//     // Your error handling logic, including refresh token logic if needed
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(
  
  (response: AxiosResponse) => response,
  async (error : AxiosError) => {
    const { response, config } = error;
    console.log("IN response");
    console.log(response);
    if (response?.status === 401 && !fresh) {
      fresh=true;
      console.log('Refreshing token...');
      let refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && config?.headers) {
        try {
          //localStorage.removeItem('token');
          console.log("GENERATED--");
          console.log(refreshToken);
          const refreshResponse = await axios.post('https://stageio.symplify.app/api/accounts/refresh/', { refresh: refreshToken });
          console.log(refreshResponse);
          if(refreshResponse.status==200){
          console.log("GENERATED");
          console.log(refreshResponse);
          let newAccessToken = refreshResponse.data.access;
          let newrefreshToken =refreshResponse.data.refresh;
          if (newAccessToken) {
            
            console.log('Token refreshed successfully.');
            localStorage.setItem('token', newAccessToken);
            localStorage.setItem('refreshToken',newrefreshToken);
            config.headers['Authorization'] = `JWT ${newAccessToken}`;
            return axios(config);
          }
        }
        } catch (e) {
          console.log('Error refreshing token:', e);
        }finally
        {
          fresh=false;
        }
      }
    }
    
    return Promise.reject(error);
  }
);
 }

export default setupAxios;
