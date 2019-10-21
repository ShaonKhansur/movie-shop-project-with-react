import http from './httpServices';
import {apiUrl} from '../config.json';


export function login(email, password) {
  return http.post(apiUrl + '/auth', {
    email: email,
    password: password
  });
}