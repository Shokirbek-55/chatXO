import axios, { AxiosRequestConfig } from "axios";
import { combineConfig, combineUrls } from "../../helper/api";

const ApiService = {
  get: <R>(url: string, config?: AxiosRequestConfig) =>
    axios.get<R>(combineUrls(url), combineConfig(config)),

  post: <R, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axios.post<R>(combineUrls(url), data, combineConfig(config)),

  put: <R, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axios.put<R>(combineUrls(url), data, combineConfig(config)),

  patch: <R, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axios.patch<R>(combineUrls(url), data, combineConfig(config)),

  delete: <R>(url: string, config?: AxiosRequestConfig) =>
    axios.delete<R>(combineUrls(url), combineConfig(config)),
};

export default ApiService;
