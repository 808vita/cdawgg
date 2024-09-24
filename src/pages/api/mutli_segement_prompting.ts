// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apiGeminiApiCall } from "../../../apiControllers/apiGeminiApiCall";

/**
 *
 * @param req
 * @param res
 * @returns
 *
 * multi segemented
 * this api route can generate - concise lists for multiple prompts
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return apiGeminiApiCall(req, res);
  }

  if (req.method !== "POST") {
    return res.status(400).json({
      msg: "only POST requests",
    });
  }
}