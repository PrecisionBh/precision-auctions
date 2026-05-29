import { serve } from "https://deno.land/std/http/server.ts"

import {
  createClient,
} from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {

  try {

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

    if (!bidderId) {

      return new Response(
        JSON.stringify({
          error:
            "Unauthorized",
        }),
        { status: 401 }
      )

    }

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

    const MIN_INCREMENT =
      10

    const currentBid =
      Number(
        team.current_bid || 0
      )

    if (
      amount <
      currentBid +
        MIN_INCREMENT
    ) {

      return new Response(
        JSON.stringify({
          error:
            `Minimum bid is $${currentBid + MIN_INCREMENT}`,
        }),
        { status: 400 }
      )

    }

    await supabase
      .from("bids")
      .insert({
        auction_id:
          auctionId,
        team_id:
          teamId,
        bidder_id:
          bidderId,
        amount,
      })

    await supabase
      .from(
        "tournament_teams"
      )
      .update({
        current_bid:
          amount,
        current_winner:
          bidderId,
      })
      .eq(
        "id",
        teamId
      )

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 }
    )

  } catch (err: any) {

    return new Response(
      JSON.stringify({
        error:
          err.message,
      }),
      { status: 500 }
    )

  }

})