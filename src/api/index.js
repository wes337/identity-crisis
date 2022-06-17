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

export const getAvatar = async (identity = "", retry = true) => {
  // This is a pretty hacky way to use this DALL-E mini API.
  // If Hugging Face configures CORs correctly, this will stop working
  return axios
    .post(
      "https://bf.dallemini.ai/generate",
      {
        prompt: `avatar for a ${identity}`,
      },
      {
        credentials: "omit",
        referrer: "https://hf.space/",
        mode: "cors",
      }
    )
    .then((response) => {
      return response.data?.images;
    })
    .catch((error) => {
      // Queue is full, try again in 5 seconds
      if (error.code === "ERR_NETWORK" && retry) {
        return setTimeout(() => {
          return getAvatar(identity, false);
        }, 5000);
      }
    });
};
