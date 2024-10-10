import { jsonrepair } from "jsonrepair";
import { toDataURL } from "./getBase64Image";
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
export const damageDetection = async (imgUrl) => {
  let newAccessToken: any = "";
  if (imgUrl === "") {
    return;
  }

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

  let convertedImage: any = await toDataURL(imgUrl);
  // update loading state
  //set loading to true here

  let response = "" as any;

  try {
    const backendResponse = await fetch("/api/damage_detection", {
      method: "POST",
      body: JSON.stringify({
        token,
        convertedImage,
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
