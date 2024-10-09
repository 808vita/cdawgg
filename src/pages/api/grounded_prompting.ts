// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { apiVertexAICall_grounded } from "../../../apiControllers/apiVertexAICall_grounded";

/**
 *
 * @param req
 * @param res
 * @returns
 *
 * google search grounded responses
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return apiVertexAICall_grounded(req, res);
  }

  if (req.method !== "POST") {
    return res.status(400).json({
      msg: "only POST requests",
    });
  }
}
