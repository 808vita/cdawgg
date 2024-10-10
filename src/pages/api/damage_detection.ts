// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { apiVertexAICall_multimodal_image } from "../../../apiControllers/apiVertexAICall_multimodal_image";

/**
 *
 * @param req
 * @param res
 * @returns
 *
 * damage detection multimodal
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return apiVertexAICall_multimodal_image(req, res);
  }

  if (req.method !== "POST") {
    return res.status(400).json({
      msg: "only POST requests",
    });
  }
}
