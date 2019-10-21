import http from "./httpServices";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";


export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl + "/auth", {
    email: email,
    password: password
  });
  localStorage.setItem("token", jwt);
};

export function logout() {
  localStorage.removeItem('token');
};

export function loginWithJwt(response){
  localStorage.setItem("token", response.headers["x-auth-token"]);
};

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};


export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser
}
