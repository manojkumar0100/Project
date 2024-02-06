/* eslint-disable react-refresh/only-export-components */
import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import { stringify } from 'querystring'
import setupAxios from  '../../interceptors/axios';

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
      setCurrentUser(auth.userdata);
      localStorage.setItem("token", auth?.token?.access);
      localStorage.setItem("refreshToken", auth?.token?.refresh);
      // console.log("IN auth");
      // console.log(auth.token.access);
      // console.log(auth.token.refresh);
      // console.log("Userdata");
      // console.log(auth.userdata);
      
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, currentUser, logout, setCurrentUser} = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)


  useEffect(() => {
    try {
      if (auth && auth.userdata) {
        console.log("IN");
        setCurrentUser(auth.userdata);
      } else {
        
        console.log("HEREj");
        console.log(auth?.token?.access);
        console.log(auth?.token?.refresh);
        console.log(auth?.userdata);
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("refreshToken"));
        
        // Handle the case where user data is not available
      
        //logout();
        console.log("WHERE");
        setupAxios();
      }
    } catch (error) {
      console.error(error);
      logout();
    } finally {
      setShowSplashScreen(false);
    }
  }, [auth, logout, setCurrentUser, setShowSplashScreen]);
  
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
 

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth ,AuthContext}
