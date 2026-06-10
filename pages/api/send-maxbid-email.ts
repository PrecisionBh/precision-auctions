import type {
  NextApiRequest,
  NextApiResponse,
} from "next"

import {
  sendMaxBidReachedEmail,
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
      maxBid,
      currentBid,
      auctionName,
      auctionUrl,
    } = req.body

    await sendMaxBidReachedEmail(
      email,
      teamName,
      maxBid,
      currentBid,
      auctionName,
      auctionUrl
    )

    return res.status(200).json({
      success: true,
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      success: false,
    })

  }

}