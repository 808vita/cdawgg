import type { NextApiRequest, NextApiResponse } from "next";
import { apiKey, generationConfig } from "../prompts/apiKey";

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { availableSysPrompts, systemPromptsObject } from "../prompts/systemPromptsObject";


/**
 *
 * @param req
 * @param res
 * @returns json
 *
 * api controller - backend
 *
 * handles generation of - concise lists for multiple prompts
 * makes use of text data and makes gemini api call
 *
 */
export const apiGeminiApiCall = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { currentSelectedReviewsState, selectedGenType } = req.body;

  if (currentSelectedReviewsState === "" || !availableSysPrompts.includes(selectedGenType)) {
    return res.status(400).json({ error: "fill all fields" });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: {
      parts: [systemPromptsObject[selectedGenType] as unknown as Part],
      role: "model",
    },
  });

  const parts = [{ text: currentSelectedReviewsState }];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });

  let response = "" as any;

  try {
    if (
      result.response.promptFeedback &&
      result.response.promptFeedback.blockReason
    ) {
      response = {
        error: `Blocked for ${result.response.promptFeedback.blockReason}`,
      };
      return res.status(200).json(response);
    }
    //@ts-ignore
    response = result.response.candidates[0].content.parts[0].text;
    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};