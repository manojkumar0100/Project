/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthModel} from './_models'
import axios,{ AxiosError, AxiosRequestConfig ,AxiosResponse} from 'axios'
const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }
  
  const lsValue: string | null = localStorage.getItem("token")
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      console.log("Calling");
      // setupAxios(axios)
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    //console.log(error);
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth.token.access)
    const refresh = JSON.stringify(auth.token.refresh)
     localStorage.setItem("token", lsValue)
     localStorage.setItem("refreshToken",refresh)
  } catch (error) {
   // console.log("error");
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

// export function setupAxios(axios: any) {
//   axios.defaults.headers.Accept = 'application/json'
//   axios.interceptors.request.use(
//     (config: {headers: {Authorization: string}}) => {
//       const auth = getAuth()
//       if (auth && auth) {
//         console.log("SJ");
//         console.log(auth);
//         config.headers.Authorization = `Bearer ${auth}`
//       }

//       return config
//     },
//     (err: any) => Promise.reject(err)
//   )
  



// Add a request interceptor

    //  console.log(1);
    // axios.defaults.baseURL = 'https://stageio.symplify.app';
  
    // axios.interceptors.request.use(
    //   (config: AxiosRequestConfig) => {
    //     console.log(2);
    //     const token = localStorage.getItem('token');
    //     if (token && config.headers) {
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    //   },
    //   (error: AxiosError) => Promise.reject(error)
    // );
  
    // axios.interceptors.response.use(
      
    //   (response: AxiosResponse) => response,
      
    //   async (error: AxiosError) => {
    //     console.log(3);
    //     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
  
    //     if (error.response && error.response.status === 401 && !originalRequest?._retry) {
    //       originalRequest._retry = true;
  
    //       try {
    //         const refreshToken = localStorage.getItem('refreshToken');
    //         const refreshResponse = await axios.post('/refresh', { refreshToken }, { withCredentials: true });
  
    //         if (refreshResponse.status === 200) {
    //           const { token } = refreshResponse.data;
    //           localStorage.setItem('token', token);
  
    //           // Update the original request's headers with the new token
    //           originalRequest.headers = originalRequest.headers || {};
    //           originalRequest.headers.Authorization = `Bearer ${token}`;
  
    //           // Retry the original request with the new token
    //           return axios(originalRequest);
    //         }
    //       } catch (refreshError) {
    //         console.error('Error refreshing access token:', refreshError);
    //         // Handle refresh error (e.g., redirect to login page)
    //       }
    //     }
  
    //     return Promise.reject(error);
    //   }
    // );
  
  
  
   







export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
