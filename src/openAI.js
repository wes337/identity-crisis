import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export const getDatingProfile = async (identity = "") => {
  const prompt = `Write a dating profile for a ${identity}:`;

  const response = await openAI.createCompletion("text-davinci-002", {
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

  const response = await openAI.createCompletion("text-davinci-002", {
    prompt,
    temperature: 0.9,
    max_tokens: 2048,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 1.0,
    best_of: 3,
    n: 3,
  });

  let manifesto = "";

  response.data.choices.forEach((choice) => {
    manifesto += choice.text;
  });

  return manifesto;
};

export const answerQuestion = async (identity = "", question = "") => {
  const prompt =
    question.trim().length > 0
      ? `${question}\n Write a ${identity}'s answer:`
      : `Write how a ${identity} would make a sarcastic comment:`;

  const response = await openAI.createCompletion("text-davinci-002", {
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

export default openAI;
