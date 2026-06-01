const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

import { serve } from "https://deno.land/std/http/server.ts"

import {
  createClient,
} from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {

  console.log(
    "METHOD",
    req.method
  )

  if (
    req.method ===
    "OPTIONS"
  ) {

    return new Response(
      "ok",
      {
        headers:
          corsHeaders,
      }
    )

  }

  try {

    console.log(
      "PLACE BID FUNCTION STARTED"
    )

    const authHeader =
      req.headers.get(
        "Authorization"
      )!

    const supabase =
      createClient(
        Deno.env.get(
          "SUPABASE_URL"
        )!,
        Deno.env.get(
          "SUPABASE_SERVICE_ROLE_KEY"
        )!,
        {
          global: {
            headers: {
              Authorization:
                authHeader,
            },
          },
        }
      )

    const {
      auctionId,
      teamId,
      amount,
    } = await req.json()

    console.log(
      "REQUEST",
      {
        auctionId,
        teamId,
        amount,
      }
    )

    const {
      data: userData,
    } =
      await supabase.auth.getUser(
        authHeader.replace(
          "Bearer ",
          ""
        )
      )

    const bidderId =
      userData.user?.id

    console.log(
      "BIDDER",
      bidderId
    )

    if (!bidderId) {

      return new Response(
  JSON.stringify({
    error:
      "Unauthorized",
  }),
  {
    status: 401,
    headers:
      corsHeaders,
  }
)

    }

    const MIN_INCREMENT =
      10

    const manualAmount =
  Number(amount)

let liveAmount =
  manualAmount

let liveWinner =
  bidderId

    const {
      data: team,
      error: teamError,
    } =
      await supabase
        .from(
          "tournament_teams"
        )
        .select("*")
        .eq(
          "id",
          teamId
        )
        .single()

    if (
      teamError ||
      !team
    ) {

      throw teamError

    }

    console.log(
      "TEAM FOUND",
      team.id
    )

    const currentBid =
      Number(
        team.current_bid || 0
      )

    if (
      manualAmount <
      currentBid +
        MIN_INCREMENT
    ) {

      return new Response(
  JSON.stringify({
    error:
      `Minimum bid is $${currentBid + MIN_INCREMENT}`,
  }),
  {
    status: 400,
    headers:
      corsHeaders,
  }
)

    }
  

    const {
  data: auction,
} =
  await supabase
    .from(
      "auctions"
    )
    .select(
      "id,start_time,end_time"
    )
    .eq(
      "id",
      auctionId
    )
    .single()

if (auction) {

  const now =
    new Date()

    

  const startTime =
  new Date(
    auction.start_time
  )

console.log(
  "NOW",
  now.toISOString()
)

console.log(
  "START",
  startTime.toISOString()
)

if (
  now < startTime
) {

    return new Response(
  JSON.stringify({
    success: false,
    error: "Auction has not started yet."
  }),
  {
    status: 200,
    headers: corsHeaders,
  }
)

  }

}

    if (auction) {

      const now =
        new Date()

      const endTime =
  new Date(
    team.extended_end_time ||
    auction.end_time
  )

      const remaining =
        endTime.getTime() -
        now.getTime()

        if (remaining <= 0) {

  return new Response(
    JSON.stringify({
      error:
        "This team auction has ended",
    }),
    {
      status: 400,
      headers:
        corsHeaders,
    }
  )

}

console.log(

      "INSERTING MANUAL BID"

    )



    const {

      error: manualBidError,

    } =

      await supabase

        .from("bids")

        .insert({

          auction_id:

            auctionId,

          team_id:

            teamId,

          bidder_id:

            bidderId,

          amount:

            manualAmount,

        })



    if (manualBidError) {



  return new Response(

    JSON.stringify({

      success: false,

      error:

        manualBidError.message,

    }),

    {

      status: 200,

      headers:

        corsHeaders,

    }

  )



}



    let liveAmount =

      manualAmount



    let liveWinner =

      bidderId



    console.log(

      "MANUAL BID INSERTED",

      {

        liveAmount,

        liveWinner,

      }

    )

      console.log(
        "SECONDS REMAINING",
        remaining / 1000
      )

      if (
        remaining <= 60000
      ) {

        console.log(
          "ANTI SNIPE FIRED"
        )

        const newEndTime =
          new Date(
            now.getTime() +
              60000
          )

        await supabase
  .from(
    "tournament_teams"
  )
  .update({
    extended_end_time:
      newEndTime.toISOString(),
  })
  .eq(
    "id",
    teamId
  )

      }

    }

    const {
      data: maxBids,
      error: maxBidsError,
    } =
      await supabase
        .from(
          "max_bids"
        )
        .select("*")
        .eq(
          "auction_id",
          auctionId
        )
        .eq(
          "team_id",
          teamId
        )
        .order(
          "max_amount",
          {
            ascending:
              false,
          }
        )

    if (maxBidsError) {
      throw maxBidsError
    }

    console.log(
      "MAX BIDS",
      JSON.stringify(
        maxBids
      )
    )

    if (maxBids) {

  maxBids.sort(
    (a: any, b: any) =>
      Number(b.max_amount) -
      Number(a.max_amount)
  )

}

if (
  maxBids &&
  maxBids.length > 1
) {

  const leader =
    maxBids[0]

  const challenger =
    maxBids.find(
      (x: any) =>
        x.bidder_id !==
        leader.bidder_id
    )

  if (challenger) {

    const nextBidder =
      liveWinner ===
      leader.bidder_id
        ? challenger
        : leader

    const nextAmount =
      liveAmount +
      MIN_INCREMENT

    if (
      Number(
        nextBidder.max_amount
      ) >= nextAmount
    ) {

      await supabase
        .from("bids")
        .insert({
          auction_id:
            auctionId,
          team_id:
            teamId,
          bidder_id:
            nextBidder.bidder_id,
          amount:
            nextAmount,
        })

    }

  }

}

    console.log(
      "FINAL RESULT",
      {
        liveAmount,
        liveWinner,
      }
    )

    await supabase
      .from(
        "tournament_teams"
      )
      .update({
        current_bid:
          liveAmount,
        current_winner:
          liveWinner,
      })
      .eq(
        "id",
        teamId
      )

    return new Response(
  JSON.stringify({
    success: true,
    currentBid:
      liveAmount,
    currentWinner:
      liveWinner,
  }),
  {
    status: 200,
    headers:
      corsHeaders,
  }
)

  } catch (err: any) {

    console.error(
      "PLACE BID ERROR",
      err
    )

    return new Response(
  JSON.stringify({
    error:
      err.message,
  }),
  {
    status: 500,
    headers:
      corsHeaders,
  }
)
  }

})