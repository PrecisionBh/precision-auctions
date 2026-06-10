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

  try {

    await sendOutbidEmail(
      "precision.bh@gmail.com",
      "Test Team",
      500,
      "Precision Scotch Doubles",
      "https://auctions.precisioncues.com/liveauctions/14d741d4-3691-4dbc-a185-bf587739366b"
    )

    return res.status(200).json({
      success: true,
      message:
        "Test email sent",
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      success: false,
      error:
        "Failed to send email",
    })

  }

}