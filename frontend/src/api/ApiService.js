import axios from "axios";
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(id, endpoint) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("GET operation failed:", error);
      throw error;
    }
  }
  async getCategories(endpoint) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("GET operation failed:", error);
      throw error;
    }
  }

  async getById(id, endpoint) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("GET operation failed:", error);
      throw error;
    }
  }

  async post(obj, endpoint) {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, obj);
      return response.data;
    } catch (error) {
      console.error("POST operation failed:", error);
      throw error;
    }
  }

  async putObj(id, obj, endpoint) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/${endpoint}/${id}`,
        obj
      );
      return response.data;
    } catch (error) {
      console.error("PUT operation failed:", error);
      throw error;
    }
  }

  async deleteObj(id, endpoint) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("DELETE operation failed:", error);
      throw error;
    }
  }
}

export default ApiService;
