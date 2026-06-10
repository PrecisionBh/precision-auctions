import nodemailer from "nodemailer"

export const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:
        process.env.GMAIL_USER,
      pass:
        process.env.GMAIL_APP_PASSWORD,
    },
  })

export async function sendOutbidEmail(
  email: string,
  teamName: string,
  bidAmount: number,
  auctionName: string,
  auctionUrl: string
) {

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: `You've Been Outbid - ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h1 style="color:#f97316;">
          You've Been Outbid
        </h1>

        <p>
          Another bidder has taken the lead on:
          <strong>${teamName}</strong>
        </p>

        <p>
          Current Bid:
          <strong>$${bidAmount}</strong>
        </p>

        <p>
          Auction:
          <strong>${auctionName}</strong>
        </p>

        <p>
          Don't lose your spot.
        </p>

        <p>
          <strong>
            Increase your bid to stay in the battle and reclaim the lead before the auction ends.
          </strong>
        </p>

        <a
          href="${auctionUrl}"
          style="
            display:inline-block;
            margin-top:20px;
            padding:14px 24px;
            background:#f97316;
            color:white;
            text-decoration:none;
            border-radius:10px;
            font-weight:bold;
          "
        >
          Return To Auction
        </a>

      </div>
    `,
  })

}

export async function sendMaxBidReachedEmail(
  email: string,
  teamName: string,
  maxBid: number,
  currentBid: number,
  auctionName: string,
  auctionUrl: string
) {

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Your Max Bid Has Been Reached - ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h1 style="color:#ef4444;">
          Your Max Bid Has Been Reached
        </h1>

        <p>
          Your maximum bid of
          <strong>$${maxBid}</strong>
          has been reached.
        </p>

        <p>
          Current Bid:
          <strong>$${currentBid}</strong>
        </p>

        <p>
          Team:
          <strong>${teamName}</strong>
        </p>

        <p>
          Auction:
          <strong>${auctionName}</strong>
        </p>

        <p>
          You are no longer the leading bidder.
        </p>

        <p>
          <strong>
            Increase your max bid to stay in the battle and continue bidding automatically on your behalf.
          </strong>
        </p>

        <a
          href="${auctionUrl}"
          style="
            display:inline-block;
            margin-top:20px;
            padding:14px 24px;
            background:#ef4444;
            color:white;
            text-decoration:none;
            border-radius:10px;
            font-weight:bold;
          "
        >
          Increase Max Bid
        </a>

      </div>
    `,
  })

}

export async function sendWinnerEmail(
  email: string,
  teamName: string,
  winningBid: number,
  auctionName: string,
  auctionUrl: string
) {

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Congratulations! You Won ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h1 style="color:#22c55e;">
          Congratulations!
        </h1>

        <p>
          You are the winning bidder for:
          <strong>${teamName}</strong>
        </p>

        <p>
          Winning Bid:
          <strong>$${winningBid}</strong>
        </p>

        <p>
          Auction:
          <strong>${auctionName}</strong>
        </p>

        <p>
          Please log in to Precision Auctions and proceed to the payment page for payment instructions.
        </p>

        <a
          href="${auctionUrl}"
          style="
            display:inline-block;
            margin-top:20px;
            padding:14px 24px;
            background:#22c55e;
            color:white;
            text-decoration:none;
            border-radius:10px;
            font-weight:bold;
          "
        >
          View Payment Instructions
        </a>

      </div>
    `,
  })

}