import type {
  NextApiRequest,
  NextApiResponse,
} from "next"

import {
  sendOutbidEmail,
} from "@/lib/email"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
    })

  }

  try {

    const {
      email,
      teamName,
      bidAmount,
      auctionName,
      auctionUrl,
    } = req.body

    await sendOutbidEmail(
      email,
      teamName,
      bidAmount,
      auctionName,
      auctionUrl
    )

    return res.status(200).json({
      success: true,
    })

    } catch (error: any) {

    console.error(
      "SEND OUTBID EMAIL ERROR:",
      error
    )

    return res.status(500).json({
      success: false,
      error: error?.message || String(error),
    })

  }

}