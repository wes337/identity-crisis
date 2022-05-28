import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export const getDatingProfile = async (identity = "") => {
  const prompt = `Write a dating profile for a ${identity}:`;

  const response = await openAI.createCompletion("text-curie-001", {
    prompt,
    temperature: 0.9,
    max_tokens: 512,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    best_of: 3,
  });

  return response.data.choices[0].text;
};

export const getManifesto = async (identity = "") => {
  const prompt = `Write a manifesto for a ${identity}:`;

  const response = await openAI.createCompletion("text-curie-001", {
    prompt,
    temperature: 0.9,
    max_tokens: 2048 - prompt.length,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.5,
    n: 3,
    best_of: 5,
  });

  let manifesto = "";

  response.data.choices.forEach((choice) => {
    manifesto += choice.text;
  });

  return manifesto;
};

export const answerQuestion = async (identity = "", question = "") => {
  const prompt = `${question}\n Write a ${identity}'s answer:`;

  const response = await openAI.createCompletion("text-curie-001", {
    prompt,
    temperature: 0.9,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    best_of: 3,
  });

  return response.data.choices[0].text;
};

export const getFreestyle = async (identity = "") => {
  const prompts = [
    `A poem written by a ${identity}:`,
    `A gangster rap written by a ${identity}:`,
    `A ${identity} describing a fun night:`,
    `Financial advice from a ${identity}:`,
    `Life advice from a ${identity}`,
    `A ${identity} describing the perfect day:`,
  ];

  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  const response = await openAI.createCompletion("text-curie-001", {
    prompt,
    temperature: 0.9,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.data.choices[0].text;
};

export const getScrapedWebsite = async (url = "") => {
  const response = await axios.get(
    `http://api.scraperapi.com?api_key=${process.env.REACT_APP_SCRAPER_API_KEY}&url=${url}`
  );

  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(response.data, "text/html");

  const main = htmlDoc.querySelector("main");

  if (main) {
    return main.textContent.slice(0, 4097);
  }

  const { textContent } = htmlDoc.body;

  return textContent.slice(0, 2000);
};

export const getOpinion = async (identity = "", url = "") => {
  const scrapedWebsite = await getScrapedWebsite(url);

  const prompt = `${scrapedWebsite}\n Write a ${identity}'s opinion:`;

  const response = await openAI.createCompletion("text-curie-001", {
    prompt,
    temperature: 0.9,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.data.choices[0].text;
};

export default openAI;
