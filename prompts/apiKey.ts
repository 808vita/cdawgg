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
