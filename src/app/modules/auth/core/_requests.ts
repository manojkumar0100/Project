import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/api/accounts/login/`;
export const REGISTER_URL = `${API_URL}/api/accounts/register/`;
export const REQUEST_PASSWORD_URL = `${API_URL}/api/accounts/password/forgot/`;
export const VERIFY_EMAIL_URL = `${API_URL}/api/accounts/verify/email/`;
export const RESET_PASSWORD_URL = `${API_URL}/api/accounts/password/reset/`
export const REFRESH_TOKEN = `${API_URL}/api/accounts/refresh/`

// Server should return AuthModel

export async function login(email: string, password: string) {
  const response = await axios.post<AuthModel>(LOGIN_URL, {
    email,
    password
});
    
    console.log(response);
    return response;
}




// Server should return AuthModel
// export async function register(email: string,mobile: string,firstname: string,lastname: string,password: string,) {
//     const response = await axios.post(REGISTER_URL, {
//       email,
//       mobile,
//       first_name: firstname,
//       last_name: lastname,
//       password,
//     });
   
//      return response;
    
//   }

// Modify your _requests.js file

export async function register(email: string, mobile: string, firstname: string, lastname: string, password: string) {
  try {
    const response = await axios.post(REGISTER_URL, {
      email,
      mobile,
      first_name: firstname,
      last_name: lastname,
      password,
    });
    
    return response.data; // Return the data from the server

  } catch (error) {
    
      throw error;
    }
  }
  






// Server should return object => { result: boolean } (Is Email in DB)
export async function requestPassword(email: string) {
  //console.log(email);
  const response= await axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    username:email,
  });
  //console.log(response);
  return response;
  // return true;
}

export async function resetPassword(email: string,code:string,password:string) {
  // console.log(email);
  // console.log(code);
  // console.log(password);
  const response= await axios.post<{ result: boolean }>(RESET_PASSWORD_URL, {
    username:email,
    password,
    code,
  });
  //console.log(response);
  return response;
  
  //console.log(response);
  // return response;
  // return true;
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}

export async function verifyemailid(email: string,code:string){
  const response = await axios.post(VERIFY_EMAIL_URL,{
    email,
    code,
  });
  console.log(response);
  return response;
  // console.log(response);
}


// export async function verifyemailid(email: string,code:string){
//   const response = await axios.post(VERIFY_EMAIL_URL,{
//     email,
//     code,
//   });
//   console.log(response);
//   return response;
//   // console.log(response);
// }






export async function refreshToken(){
  console.log("IN RFRESH FUNCTION");
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(REFRESH_TOKEN, { refreshToken }, { withCredentials: true });

    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Assuming response.data contains the necessary information
      return response.data as AuthModel;
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    // Handle refresh error (e.g., redirect to login page)
  }
  // console.log(response);
};

// export refreshToken = async (): Promise<AuthModel | undefined> => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     const response = await axios.post(REFRESH_TOKEN, { refreshToken }, { withCredentials: true });

//     if (response.status === 200) {
//       const { token } = response.data;
//       localStorage.setItem('token', token);

//       // Assuming response.data contains the necessary information
//       return response.data as AuthModel;
//     }
//   } catch (error) {
//     console.error('Error refreshing access token:', error);
//     // Handle refresh error (e.g., redirect to login page)
//   }

//   return undefined;
// };
// export default refreshToken;

