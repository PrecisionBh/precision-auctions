import { serve } from "https://deno.land/std/http/server.ts"

import {
  createClient,
} from "https://esm.sh/@supabase/supabase-js@2"


serve(async () => {
console.log("AUTO BID FUNCTION STARTED")
  const supabase =
    createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

  const MIN_INCREMENT = 10

  const {
    data: teams,
    error: teamsError,
  } = await supabase
    .from("tournament_teams")
    .select("*")
    .not("current_winner", "is", null)

  if (teamsError) {
    throw teamsError
  }

  for (const team of teams || []) {

    const {
      data: maxBids,
    } = await supabase
      .from("max_bids")
      .select("*")
      .eq("team_id", team.id)
      .order("max_amount", {
        ascending: false,
      })

    if (
      !maxBids ||
      maxBids.length < 2
    ) {
      continue
    }

    const leader =
      maxBids[0]

    const challenger =
      maxBids.find(
        (x: any) =>
          x.bidder_id !==
          leader.bidder_id
      )

    if (!challenger) {
      continue
    }

    const auctionId =
      team.auction_id ||
      leader.auction_id

    const {
      data: auction,
    } = await supabase
      .from("auctions")
      .select(
  "id,start_time,end_time"
)
      .eq("id", auctionId)
      .single()

    if (!auction) {
      continue
    }

    const now =
      new Date()

      const startTime =
  new Date(
    auction.start_time
  )

if (
  now < startTime
) {

  continue

}

    const endTime =
  new Date(
    team.extended_end_time ||
    auction.end_time
  )

    const remaining =
      endTime.getTime() -
      now.getTime()

    if (remaining <= 0) {
      continue
    }

    const nextBidder =
  team.current_winner ===
  leader.bidder_id
    ? challenger
    : leader

console.log(
  "NEXT BIDDER",
  {
    bidderId:
      nextBidder.bidder_id,
    maxAmount:
      nextBidder.max_amount,
    notified:
      nextBidder.max_reached_notified,
  }
)

const nextAmount =
  Number(team.current_bid) +
  MIN_INCREMENT

console.log(
  "NEXT AMOUNT",
  nextAmount
)

  console.log(
  "CHECKING MAX REACHED",
  {
    maxAmount:
      Number(
        nextBidder.max_amount
      ),
    nextAmount,
    result:
      Number(
        nextBidder.max_amount
      ) < nextAmount,
  }
)

if (
  Number(nextBidder.max_amount) <
  nextAmount
) {

  console.log(
    "MAX BID REACHED BLOCK HIT"
  )

  console.log(
  "FLAG VALUE",
  nextBidder.max_reached_notified
)

  if (
  !nextBidder.max_reached_notified
) {

  console.log(
    "MAX BID EMAIL ELIGIBLE"
  )

    const {
  data: profile,
} = await supabase
  .from("profiles")
  .select("email")
  .eq(
    "id",
    nextBidder.bidder_id
  )
  .single()

console.log(
  "PROFILE LOOKUP",
  profile
)

    await supabase
      .from("notifications")
      .insert({
        user_id:
          nextBidder.bidder_id,
        auction_id:
          auctionId,
        team_id:
          team.id,
        type:
          "max_bid_reached",
      })

    if (profile?.email) {
      console.log("CALLING MAX BID EMAIL")

      await fetch(
  "https://auctions.precisioncues.com/api/send-maxbid-email",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email:
              profile.email,
            teamName:
              `${team.player1_name} / ${team.player2_name}`,
            maxBid:
              nextBidder.max_amount,
            currentBid:
              team.current_bid,
            auctionName:
              "Precision Auction",
            auctionUrl:
              `https://auctions.precisioncues.com/liveauctions/${auctionId}`,
          }),
        }
      )

    }

    await supabase
      .from("max_bids")
      .update({
        max_reached_notified:
          true,
      })
      .eq(
        "id",
        nextBidder.id
      )

  }

  continue

}

    await supabase
      .from("bids")
      .insert({
        auction_id:
          auctionId,
        team_id:
          team.id,
        bidder_id:
          nextBidder.bidder_id,
        amount:
          nextAmount,
      })

    if (remaining <= 60000) {

  const newEndTime =
    new Date(
      now.getTime() + 60000
    )

  await supabase
    .from("tournament_teams")
    .update({
      extended_end_time:
        newEndTime.toISOString(),
    })
    .eq("id", team.id)

}

    await supabase
      .from("tournament_teams")
      .update({
        current_bid:
          nextAmount,
        current_winner:
          nextBidder.bidder_id,
      })
      .eq("id", team.id)

      const previousWinner =
  team.current_winner

if (
  previousWinner &&
  previousWinner !==
    nextBidder.bidder_id
) {

  const {
    data: profile,
  } = await supabase
    .from("profiles")
    .select("email")
    .eq(
      "id",
      previousWinner
    )
    .single()

  await supabase
    .from("notifications")
    .insert({
      user_id:
        previousWinner,
      auction_id:
        auctionId,
      team_id:
        team.id,
      type:
        "outbid",
    })

  if (profile?.email) {

    await fetch(
      "https://auctions.precisioncues.com/api/send-outbid-email",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email:
            profile.email,
          teamName:
            `${team.player1_name} / ${team.player2_name}`,
          bidAmount:
            nextAmount,
          auctionName:
            "Precision Auction",
          auctionUrl:
            `https://auctions.precisioncues.com/liveauctions/${auctionId}`,
        }),
      }
    )

  }

}

    console.log(
      "AUTO BID",
      team.id,
      nextAmount
    )
  }

  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      status: 200,
    }
  )
})