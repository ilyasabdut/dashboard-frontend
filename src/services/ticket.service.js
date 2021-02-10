import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

const getAll = () => {
  return axios.get(API_URL + '/tickets');
};

const getNumber = () => {
  return axios.get(API_URL + `/tickets/number`);
};

const get = (id) => {
  return axios.get(`/tickets/${id}`);
};

const create = (data) => {
  return axios.post("/tickets", data);
};

const update = (id, data) => {
  return axios.put(`/tickets/${id}`, data);
};

export default {
  getAll,
  getNumber,
  get,
  create,
  update,
};
