import { AxiosRequestConfig } from "axios";
import axios from "axios";
import { Env } from "../env";
import useRootStore from "../hooks/useRootStore";

const globalRequestConfig: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
  },
};

export const combineUrls = (url: string): string => {
  return `${Env.ApiUrl}${url}`;
};

export const combineConfig = (
  config: AxiosRequestConfig | undefined
): AxiosRequestConfig | undefined => {
  return { ...globalRequestConfig, ...config };
};


let oauthRequestInterceptor: number;

// const replayRequest = async (params: any, authHeader?: string) => {

//   const {session} = useRootStore().localStore

//   const originalRequest = { ...params.originalRequest };

//   if (authHeader) {
//     originalRequest.headers = {
//       ...originalRequest.headers,
//       Authorization: authHeader,
//     };
//   } else {

//     originalRequest.headers = {
//       ...originalRequest.headers,
//       Authorization: `Bearer ${session?.accessToken}`,
//     };
//   }

//   try {
//     const response = await axios(originalRequest);

//     params.resolve(response);
//   } catch (e) {
//     params.reject(e);
//   }
// };

export const setOauthRequestInterceptor = (oauth: string) => {
  oauthRequestInterceptor = axios.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {
      config.headers = { ...config.headers, Authorization: oauth };
      return config;
    }
  );
};

export const removeOauthInterceptor = () => {
  axios.interceptors.request.eject(oauthRequestInterceptor);
};