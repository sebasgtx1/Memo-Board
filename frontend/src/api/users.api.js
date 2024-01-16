import ApiService from "./ApiService";
import { backendURL } from "../config/config.js";

const apiService = new ApiService(backendURL);

export const createUser = (obj) => {
  return apiService.createObj(obj, "register");
};

export const LoginRequest = (obj) => {
  return apiService.post(obj, "login");
};
