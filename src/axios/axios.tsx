import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const url = /*process.env.NODE_ENV === 'production' ?*/ '/backend' //:'http://localhost:3000'

const refreshAuthLogic = (failedRequest:any) =>{
  localStorage.setItem("afterlogin", "exit");
  localStorage.removeItem("jwt");
  window.open("/account", "_blank");
  alert("Nejste přihlášen/a pokračujte v nově otevřené záložce a po jejím zavření stiskněte ok.");
  let jwtString = localStorage.getItem("jwt") || "";
  if(jwtString !== ""){
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + jwtString;
  }
  return Promise.resolve();
}

export const instance = axios.create({
    baseURL: url
  });

// Instantiate the interceptor
createAuthRefreshInterceptor(instance, refreshAuthLogic, {statusCodes: [401]});

export function addAuthorization(AuthHeader:string){
  instance.defaults.headers.common['Authorization'] = AuthHeader;
}

export default instance;