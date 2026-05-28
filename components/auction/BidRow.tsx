"use client"

import {
  Star,
  Gavel,
  TrendingUp,
} from "lucide-react"

type Props = {
  team: any
  index: number
}

export default function BidRow({
  team,
  index,
}: Props) {

  return (

    <>

      {/* DESKTOP */}

      <div className="hidden md:grid grid-cols-[60px_1.6fr_120px_140px_160px_170px] items-center border-b border-zinc-900 px-4 py-4 hover:bg-zinc-900/70 transition-all duration-200">

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

            {team.winning_bidder ||
              "No Bids"}

          </p>

        </div>

        {/* ACTIONS */}

        <div className="flex items-center justify-end gap-2">

          {/* BID */}

          <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white transition hover:bg-orange-400">

            <Gavel size={14} />

            Bid

          </button>

          {/* MAX */}

          <button className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-black text-zinc-300 transition hover:border-orange-500 hover:text-orange-400">

            <TrendingUp size={14} />

            Max

          </button>

          {/* FAVORITE */}

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-400 transition hover:border-yellow-500 hover:text-yellow-400">

            <Star size={16} />

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

              {team.winning_bidder ||
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

            <button className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white">

              Bid

            </button>

            <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-black text-zinc-300">

              Max

            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-400">

              <Star size={15} />

            </button>

          </div>

        </div>

      </div>

    </>

  )

}