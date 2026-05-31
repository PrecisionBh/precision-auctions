"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

type Props = {
  open: boolean
  onClose: () => void
  team: any
  auction: any
}

export default function BidNowModal({
  open,
  onClose,
  team,
  auction,
}: Props){

  const [bidAmount, setBidAmount] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  if (!open || !team)
    return null

  const handlePlaceBid = async () => {

  try {

    setLoading(true)

    const amount =
      Number(bidAmount)

    if (
      !amount ||
      amount <=
        (team.current_bid || 0)
    ) {

      alert(
        `Bid must be greater than $${team.current_bid || 0}`
      )

      return

    }

    const {
      data: { session },
    } =
      await supabase.auth.getSession()

    if (!session) {

      alert(
        "Please login first"
      )

      return

    }

    const {
      data,
      error,
    } =
      await supabase.functions.invoke(
        "placeBid",
        {
          body: {
            auctionId:
              team.auction_id,
            teamId:
              team.id,
            amount,
          },
          headers: {
            Authorization:
              `Bearer ${session.access_token}`,
          },
        }
      )

    if (error) {
      throw error
    }

    if (data?.error) {
      throw new Error(data.error)
    }

    setBidAmount("")

    onClose()

  } catch (err: any) {

    console.error(
      "BID ERROR:",
      err
    )

    alert(
      err.message ||
        JSON.stringify(err)
    )

  } finally {

    setLoading(false)

  }

}

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">

        {/* GLOW */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_55%)]" />

        <div className="relative z-10">

          {/* TITLE */}

          <p className="text-[10px] uppercase tracking-[0.35em] text-orange-400 font-black mb-3">

            Place Bid

          </p>

          <h2 className="text-3xl font-black text-white leading-tight">

            {team.player1_name}

            <br />

            {team.player2_name}

          </h2>

          <p className="mt-3 text-zinc-500 text-sm">

            Current Bid:

            <span className="text-orange-400 font-black ml-2">

              ${team.current_bid || 0}

            </span>

          </p>

          {/* INPUT */}

          <div className="mt-6">

            <label className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-black">

              Your Bid

            </label>

            <input
              type="number"
              value={bidAmount}
              onChange={(e) =>
                setBidAmount(
                  e.target.value
                )
              }
              placeholder="Enter bid amount"
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-orange-500"
            />

          </div>

          {/* ACTIONS */}

          <div className="mt-6 flex items-center gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 py-3 font-black text-zinc-300"
            >

              Cancel

            </button>

            <button
              onClick={handlePlaceBid}
              disabled={loading}
              className="flex-1 rounded-2xl bg-orange-500 py-3 font-black text-white hover:bg-orange-400 transition disabled:opacity-50"
            >

              {loading
                ? "Placing..."
                : "Place Bid"}

            </button>

          </div>

        </div>

      </div>

    </div>

  )

}