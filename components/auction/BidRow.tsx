"use client"

"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  Star,
  Gavel,
  TrendingUp,
} from "lucide-react"

import { supabase } from "@/lib/supabase"

type Props = {
  team: any
  index: number
  auction: any
  onBid: (team: any) => void
  onMaxBid: (team: any) => void

  favoriteIds: number[]

  setFavoriteIds: React.Dispatch<
    React.SetStateAction<number[]>
  >
}

export default function BidRow({
  team,
  index,
  auction,
  onBid,
  onMaxBid,
  favoriteIds,
  setFavoriteIds,
}: Props) {

    const [
    timeLeft,
    setTimeLeft,
  ] = useState("")

  const isFavorite =
  favoriteIds.includes(
    team.id
  )

const toggleFavorite =
  async () => {

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) {

      alert(
        "Please sign in first."
      )

      return

    }

    if (isFavorite) {

      const { error } =
        await supabase
          .from(
            "auction_favorites"
          )
          .delete()
          .eq(
            "user_id",
            user.id
          )
          .eq(
            "auction_id",
            auction.id
          )
          .eq(
            "team_id",
            team.id
          )

      if (!error) {

        setFavoriteIds(
  favoriteIds.filter(
    id => id !== team.id
  )
)

      }

    } else {

      const { error } =
        await supabase
          .from(
            "auction_favorites"
          )
          .insert({
            user_id:
              user.id,
            auction_id:
              auction.id,
            team_id:
              team.id,
          })

      if (!error) {

        setFavoriteIds([
  ...favoriteIds,
  team.id,
])

      }

    }

  }

  useEffect(() => {

    const updateTimer =
      () => {

        const now =
  Date.now()

const startTime =
  new Date(
    auction.start_time
  ).getTime()

if (
  now < startTime
) {

  setTimeLeft(
    "Opening Soon"
  )

  return

}

const endTime =
  team.extended_end_time ||
  auction.end_time

const difference =
  new Date(
    endTime
  ).getTime() -
  now

if (
  difference <= 0
) {

  setTimeLeft(
    "Closed"
  )

  return

}

        const totalSeconds =
  Math.floor(
    difference / 1000
  )

const hours =
  Math.floor(
    totalSeconds / 3600
  )

const minutes =
  Math.floor(
    (
      totalSeconds % 3600
    ) / 60
  )

const seconds =
  totalSeconds % 60

setTimeLeft(
  `${hours}h ${minutes}m ${seconds
    .toString()
    .padStart(2, "0")}s`
)

      }

    updateTimer()

    const interval =
      setInterval(
        updateTimer,
        1000
      )

    return () =>
      clearInterval(
        interval
      )

  }, [
    team.extended_end_time,
    auction?.end_time,
  ])

  return (

    <>

      {/* DESKTOP */}

      <div className="hidden md:grid grid-cols-[60px_1.6fr_120px_140px_180px_120px_190px] items-center border-b border-zinc-900 px-4 py-4 hover:bg-zinc-900/70 transition-all duration-200">

        {/* NUMBER */}

        <div className="text-zinc-500 font-bold text-sm">

          #{team.display_order || index + 1}

        </div>

        {/* TEAM */}

        <div>

          <p className="font-bold text-white text-sm leading-tight">

            {team.player1_name}

          </p>

          <p className="font-bold text-white text-sm leading-tight">

            {team.player2_name}

          </p>

        </div>

        {/* FARGO */}

        <div>

          <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm font-bold text-zinc-300">

            {team.robustness}

          </div>

        </div>

        {/* CURRENT BID */}

        <div>

          <p className="text-lg font-black text-orange-400 drop-shadow-[0_0_12px_rgba(251,146,60,0.85)]">

            $

            {team.current_bid || 0}

          </p>

        </div>

        {/* WINNING BIDDER */}

<div>

 <p className="text-sm font-semibold text-green-400 truncate">
  {team.current_winner_profile?.username ||
    "No Bids"}
</p>

</div>

{/* TIMER */}

<div>

  <p
    className={`text-sm font-black ${
  timeLeft === "Closed"
    ? "text-red-500"
    : timeLeft === "Opening Soon"
    ? "text-red-500"
    : "text-green-400"
}`}
  >

    {timeLeft}

  </p>

</div>

        {/* ACTIONS */}

        <div className="flex items-center justify-end gap-2 pr-2">

          {/* BID */}

          <button
            onClick={() => onBid(team)}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white transition hover:bg-orange-400"
          >

            <Gavel size={14} />

            Bid

          </button>

          {/* MAX */}

          <button
  onClick={() =>
    onMaxBid(team)
  }
  className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-black text-zinc-300 transition hover:border-orange-500 hover:text-orange-400"
>
            <TrendingUp size={14} />

            Max

          </button>

          {/* FAVORITE */}

         <button
  onClick={
  toggleFavorite
}
  className={`
    flex h-10 w-10
    items-center
    justify-center
    rounded-xl
    border
    transition
    ${
      isFavorite
        ? "border-yellow-500 text-yellow-400"
        : "border-zinc-700 text-zinc-400 hover:border-yellow-500 hover:text-yellow-400"
    }
  `}
>
            <Star
  size={16}
  fill={
    isFavorite
      ? "currentColor"
      : "none"
  }
/>

          </button>

        </div>

      </div>

      {/* MOBILE */}

      <div className="md:hidden border-b border-zinc-900 px-4 py-4">

        {/* TOP */}

        <div className="flex items-start justify-between gap-3">

          <div>

            <p className="text-xs text-zinc-500 font-bold mb-1">

              #{team.display_order || index + 1}

            </p>

            <p className="font-bold text-white text-sm leading-tight">

              {team.player1_name}

            </p>

            <p className="font-bold text-white text-sm leading-tight">

              {team.player2_name}

            </p>

          </div>

          <div className="text-right">

            <p className="text-orange-400 text-2xl font-black">

              $

              {team.current_bid || 0}

            </p>

            <p className="text-green-400 text-xs font-semibold">
  {team.current_winner_profile?.username ||
    "No Bids"}
</p>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="mt-4 flex items-center justify-between gap-2">

          <div className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-bold text-zinc-300">

            {team.robustness} Fargo

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() => onBid(team)}
              className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white"
            >

              Bid

            </button>

           <button
  onClick={() =>
    onMaxBid(team)
  }
  className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-black text-zinc-300"
>
              Max

            </button>

          <button
  onClick={
  toggleFavorite
}
  className={`
    flex h-10 w-10
    items-center
    justify-center
    rounded-xl
    border
    transition
    ${
      isFavorite
        ? "border-yellow-500 text-yellow-400"
        : "border-zinc-700 text-zinc-400 hover:border-yellow-500 hover:text-yellow-400"
    }
  `}
>
             <Star
  size={15}
  fill={
    isFavorite
      ? "currentColor"
      : "none"
  }
/>

            </button>

          </div>

        </div>

      </div>

    </>

  )

}