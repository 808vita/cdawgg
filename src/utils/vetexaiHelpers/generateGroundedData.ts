export const testGroundedData = async () => {
  let newAccessToken: any = "";
  try {
    const response = await fetch("/api/gen-token");
    const genToken = await response.json();
    console.log(genToken);

    newAccessToken = genToken.token;
  } catch (error) {
    console.log("errored out ");
    return;
  }

  //   const token = `Bearer ${accessToken.access_token}`;
  const token = `Bearer ${newAccessToken}`;

  const reqBody = JSON.stringify({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "when is diwali in 2024 ?",
          },
        ],
      },
    ],
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

  const PROJECT_ID = "";
  const LOCATION_ID = "";
  const API_ENDPOINT = "";
  const MODEL_ID = "";
/***
 * leaky 
 * can expose gcp project -- good for testing but not production safe
 */
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

    if (!response?.ok) {
      console.log(json);
      return json;
    }

    if (response?.ok) {
      console.log(json, "response ");

      return json;
    }
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
};
