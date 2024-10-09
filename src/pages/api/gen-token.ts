import { GoogleAuth } from "google-auth-library";
import type { NextApiRequest, NextApiResponse } from "next";

const credentialJson = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // valid sessison then move forward with rest of code
  // test getserver session is working
  // return res.json({
  //   message: "Success",
  // });

  const getAccessToken = async (jToken?: any) => {
    // console.log(credentialJson)
    const auth = new GoogleAuth({
      credentials: credentialJson,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    if (!accessToken.token) {
      throw new Error("GCP access token is not available");
    }
    const gcpAccessToken = accessToken.token;
    // console.log("gcpAccessToken",gcpAccessToken)

    return gcpAccessToken;
  };

  if (req.method === "GET") {
    // console.log(req.body);
    const gcpToken = await getAccessToken();
    // console.log("gcpToken",gcpToken)
    return res.status(200).json({
      token: gcpToken,
    });
  }
}
