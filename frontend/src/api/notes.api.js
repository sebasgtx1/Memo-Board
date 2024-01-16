import ApiService from "./ApiService";
import { backendURL } from "../config/config.js";

const apiService = new ApiService(backendURL);
export const getNotes = (id) => {
  return apiService.get(id, "notes");
};
export const getNote = (id) => {
  return apiService.getById(id, "note");
};
export const createNote = (obj) => {
  console.log(obj);
  return apiService.post(obj, "notes");
};
export const putNote = (id, obj) => {
  return apiService.putObj(id, obj, "note");
};
export const deleteNote = (id) => {
  return apiService.deleteObj(id, "notes");
};
