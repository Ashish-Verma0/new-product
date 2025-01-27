import axios from "axios";
import urls from "../constants/api";
// import { decrypt } from "../utils/crypto";

const handleRequest = async (
  method,
  url,
  data = null,
  id = null,
  isFormData = false
) => {
  const token = localStorage.getItem("token");
  const config = {
    method,
    url: `${urls.baseurl}${url}${id === 0 || id ? `${id}` : ""}`,
    headers: {
      "CONTENT-TYPE": isFormData ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    data: data || {},
  };
  // console.log("Calling Api->", config.url);
  try {
    const response = await axios(config);
    // let decryptedData = decrypt(response?.data);
    // console.log("res----------", decryptedData);
    return response.data;
  } catch (error) {
    // console.log("Error is here vashu", error);
    if (error.response && error.response.status === 401) {
      return 401;
    } else if (error.response && error.response.status === 402) {
      return 401;
    } else if (error.response && error.response.status >= 400) {
      return 530;
    } else {
      return error.response;
    }
  }
};

export const getFetch = async (url) => handleRequest("get", url);
export const getOneFetch = async (url, id) =>
  handleRequest("get", url, null, id);
export const postFetch = async (url, data, isFormData) =>
  handleRequest("post", url, data, false, isFormData);
export const patchFetch = async (url, data) =>
  handleRequest("patch", url, data);
export const putFetch = async (url, data, isFormData) =>
  handleRequest("put", url, data, false, isFormData);
export const deleteFetch = async (url, id) =>
  handleRequest("delete", url, null, id);
