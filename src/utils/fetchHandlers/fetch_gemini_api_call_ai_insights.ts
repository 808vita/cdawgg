import {
  availablePromptsArray,
  // genTypesKeys2LoadingState,
} from "../helpers/promptSelection";
import { jsonrepair } from "jsonrepair";
import { escapeSpecialChars } from "./fetchHelpers/fetchHelpers";
/**
 *
 * @param currentSelectedReviewsState
 * @param selectedGenType
 * @returns response object
 *
 *
 * function used to call backend api route endpoint "api/mutli_segement_prompting"
 *
 *
 * the api calls segemented into smaller chunks to aviod nextjs route api timeout limitiation of 10secs
 */
export async function backend_call_genani_ai_insights(
  currentSelectedReviewsState: string,
  selectedGenType: string,
  setLoadingState
) {
  if (
    !currentSelectedReviewsState ||
    !availablePromptsArray.includes(selectedGenType)
  ) {
    return;
  }

  // update loading state
  //set loading to true here
  setLoadingState(true);

  let response = "" as any;
  let processedText = escapeSpecialChars(currentSelectedReviewsState);

  try {
    const backendResponse = await fetch("/api/mutli_segement_prompting", {
      method: "POST",
      body: JSON.stringify({
        currentSelectedReviewsState: processedText,
        selectedGenType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await backendResponse.json();

    if (!backendResponse.ok) {
      console.log("error", json.error);
    }

    if (backendResponse.ok) {
      console.log("success", json);
    }
    response = jsonrepair(json);
  } catch (e: any) {
    response = {
      error: e.message,
    };
  }

  if (response) {
    // update loading state
    //set loading to false here
    setLoadingState(false);
  }

  console.log({ response }, "from v2", selectedGenType);

  if (response.error) {
    console.log(response);
    return response;
  }
  console.log(JSON.parse(response), "from v2", selectedGenType);
  // console.log(response);

  // return "oof";
  return JSON.parse(response);
}
