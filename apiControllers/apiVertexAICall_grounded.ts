import type { NextApiRequest, NextApiResponse } from "next";
import {
  PROJECT_ID,
  LOCATION_ID,
  API_ENDPOINT,
  MODEL_ID,
} from "../prompts/apiKey";

export const apiVertexAICall_grounded = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { token, selectedQuestion } = req.body;

  if (selectedQuestion === "" || typeof selectedQuestion !== "string") {
    return res.status(400).json({ error: "fill all fields" });
  }
  const reqBody = JSON.stringify({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: selectedQuestion,
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [
        {
          text: `Important you need to be very precise and concise. Do not be verbose. 
          Please provide only key points as lists. Important do not provide any additional suggestions , improvements, explanation.
          Only answer the question as is, and be as concise as possible.
          `,
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
    tools: [
      {
        googleSearchRetrieval: {
          dynamicRetrievalConfig: {
            mode: "MODE_DYNAMIC",
            dynamicThreshold: 0,
            // need to always ground
          },
          /**
           * An optional field to set the threshold to invoke the dynamic retrieval configuration. It is a floating point value in the range [0,1].
           * If you don't set the dynamicThreshold field, the threshold value defaults to 0.7.
           *
           */
        },
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
