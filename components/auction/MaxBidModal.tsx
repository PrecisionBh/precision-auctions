"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Toast from "@/components/toast"

type Props = {
  open: boolean
  onClose: () => void
  team: any
  auction: any
}

export default function MaxBidModal({
  open,
  onClose,
  team,
  auction,
}: Props) {

  const [maxBid, setMaxBid] =
    useState("")

  const [loading, setLoading] =
    useState(false)

    const [
  toast,
  setToast,
] = useState({
  show: false,
  type: "success" as
    "success" |
    "error" |
    "warning",
  title: "",
  message: "",
})

  if (!open || !team)
    return null

  const handleSaveMaxBid =
    async () => {

      try {

        setLoading(true)

        const now =
  new Date()

const startTime =
  new Date(
    team.auction_start_time ||
    auction?.start_time
  )

if (
  now < startTime
) {

  setToast({
    show: true,
    type: "warning",
    title: "Auction Not Live",
    message:
      "Max bids can only be set once the auction starts.",
  })

  return

}



        const amount =
          Number(maxBid)

        if (
          !amount ||
          amount <= 0
        ) {

          setToast({
  show: true,
  type: "warning",
  title: "Invalid Max Bid",
  message: "Enter a valid max bid amount.",
})

          return

        }

        const {
          data: { user },
        } =
          await supabase.auth.getUser()

        if (!user) {

          setToast({
  show: true,
  type: "warning",
  title: "Login Required",
  message: "Please login before setting a max bid.",
})

          return

        }

        const {
          error,
        } =
          await supabase
            .from("max_bids")
            .upsert(
  {
    auction_id: team.auction_id,
    team_id: team.id,
    bidder_id: user.id,
    max_amount: amount,
  },
  {
    onConflict:
      "auction_id,team_id,bidder_id",
  }
)

        if (error)
          throw error

        setToast({
  show: true,
  type: "success",
  title: "Max Bid Saved",
  message: `$${amount.toLocaleString()} max bid saved successfully.`,
})

        setMaxBid("")

        onClose()

      } catch (err: any) {

        console.error(
          "MAX BID ERROR:",
          err
        )

        setToast({
  show: true,
  type: "error",
  title: "Max Bid Failed",
  message: err.message || "Something went wrong.",
})

      } finally {

        setLoading(false)

      }

    }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.12),transparent_55%)]" />

        <div className="relative z-10">

          <p className="text-[10px] uppercase tracking-[0.35em] text-orange-400 font-black mb-3">

            Set Max Bid

          </p>

          <h2 className="text-3xl font-black text-white leading-tight">

            {team.player1_name}

            <br />

            {team.player2_name}

          </h2>

          <p className="mt-3 text-zinc-500 text-sm leading-relaxed">

            Your max bid will automatically bid for you up to your selected amount at the $10 minimum increment. To remove your max bid set your max bid to 0. 

          </p>

          <div className="mt-6">

            <label className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-black">

              Max Bid Amount

            </label>

            <input
              type="number"
              value={maxBid}
              onChange={(e) =>
                setMaxBid(
                  e.target.value
                )
              }
              placeholder="Enter max bid"
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-orange-500"
            />

          </div>

          <div className="mt-6 flex items-center gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 py-3 font-black text-zinc-300"
            >

              Cancel

            </button>

            <button
              onClick={
                handleSaveMaxBid
              }
              disabled={loading}
              className="flex-1 rounded-2xl bg-orange-500 py-3 font-black text-white hover:bg-orange-400 transition disabled:opacity-50"
            >

              {loading
                ? "Saving..."
                : "Save Max Bid"}

            </button>

          </div>

        </div>

      </div>

      <Toast
  show={toast.show}
  type={toast.type}
  title={toast.title}
  message={toast.message}
  onClose={() =>
    setToast({
      ...toast,
      show: false,
    })
  }
/>

    </div>

  )

}