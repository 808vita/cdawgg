import { jsonrepair } from "jsonrepair";
/**
 *
 * @param selectedQuestion
 * @param pincode
 * @param district
 * @returns
 *
 * v2 - much safer
 * abstracted into api endpoint
 */
export const testGroundedDataV2 = async (selectedQuestion, setLoadingState) => {
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

  if (selectedQuestion === "") {
    return;
  }

  // update loading state
  //set loading to true here
  setLoadingState(true);

  let response = "" as any;

  try {
    const backendResponse = await fetch("/api/grounded_prompting", {
      method: "POST",
      body: JSON.stringify({
        token,
        selectedQuestion,
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
    response = json;
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

  console.log(response, "from v2");

  if (response?.error) {
    console.log(response);
    return response;
  }
  // console.log(JSON.parse(response), "from v2");
  // console.log(response);

  // return "oof";
  // return JSON.parse(response);
  return response;
};
