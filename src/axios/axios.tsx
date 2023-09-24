import axios from 'axios';

const url = /*process.env.NODE_ENV === 'production' ?*/ '/backend' //:'http://localhost:3000'

export const instance = axios.create({
    baseURL: url
  });

export function addAuthorization(AuthHeader:string){
  instance.defaults.headers.common['Authorization'] = AuthHeader;
}

export default instance;