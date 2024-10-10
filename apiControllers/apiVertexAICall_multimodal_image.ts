import type { NextApiRequest, NextApiResponse } from "next";
import {
  PROJECT_ID,
  LOCATION_ID,
  API_ENDPOINT,
  MODEL_ID,
} from "../prompts/apiKey";

export const apiVertexAICall_multimodal_image = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { token, convertedImage } = req.body;

  if (convertedImage === "" || typeof convertedImage !== "string") {
    return res.status(400).json({ error: "fill all fields" });
  }
  const reqBody = JSON.stringify({
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: convertedImage,
            },
          },
          {
            text: `in the picture is the television display damaged? Please answer as true or false`,
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [
        {
          text: `Important you need to be very precise and concise. Do not be verbose. Just answer in true or false.`,
        },
      ],
    },
    generationConfig: {
      temperature: 1,
      maxOutputTokens: 800,
      topP: 0.95,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "OFF",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "OFF",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "OFF",
      },
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "OFF",
      },
    ],
  });

  try {
    const response = await fetch(
      // `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:streamGenerateContent`, this streams the content
      `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:generateContent`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },

        body: reqBody,
      }
    );
    const json = await response.json();

    if (!response.ok) {
      //   console.log(json);
      return res.status(500).json(json);
    }

    if (response.ok) {
      //   console.log(json, "response ");

      return res.status(200).json(json);
    }
  } catch (error) {
    // console.log("error", error);

    return res.status(400).json({ error: error });
  }
};
