import ApiService from "./ApiService";
import { backendURL } from "../config/config.js";

const apiService = new ApiService(backendURL);
export const getCategories = () => {
  return apiService.getCategories("categories");
};

export const getCategory = (id) => {
  if (id === null) return;
  return apiService.getById(id, "category");
};
