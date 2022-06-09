import axios from "axios";
import { baseApiUrl } from "../constants/api";

export const getDatingProfile = async (identity = "") => {
  return axios
    .post(`${baseApiUrl}/dating-profile`, {
      identity,
    })
    .then((response) => response.data);
};

export const getManifesto = async (identity = "") => {
  return axios
    .post(`${baseApiUrl}/manifesto`, {
      identity,
    })
    .then((response) => response.data);
};

export const answerQuestion = async (identity = "", question = "") => {
  return axios
    .post(`${baseApiUrl}/question`, {
      identity,
      question,
    })
    .then((response) => response.data);
};

export const getFreestyle = async (identity = "") => {
  return axios
    .post(`${baseApiUrl}/freestyle`, {
      identity,
    })
    .then((response) => response.data);
};

export const getOpinion = async (identity = "", url = "") => {
  return axios
    .post(`${baseApiUrl}/opinion`, {
      identity,
      url,
    })
    .then((response) => response.data);
};

export const pingServer = async () => {
  return axios
    .get(`${baseApiUrl}/ping`)
    .then((response) => response.status === 204);
};
