/**
 * api key from env
 */
export const apiKey = process.env.GEMINI_API_KEY as string;

/**
 * generation config for gemini api calls
 */
export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  // maxOutputTokens: 8192,
  maxOutputTokens: 600,
  responseMimeType: "application/json",
};

export const PROJECT_ID = process.env.PROJECT_ID as string;
export const LOCATION_ID = process.env.LOCATION_ID as string;
export const API_ENDPOINT = process.env.API_ENDPOINT as string;
export const MODEL_ID = process.env.MODEL_ID as string;
