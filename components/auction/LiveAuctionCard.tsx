"use client"

import { useRouter } from "next/router"

type Props = {
  auction: any
}

export default function LiveAuctionCard({
  auction,
}: Props) {

  const router = useRouter()

  const now =
    new Date()

  const start =
    new Date(
      auction.start_time
    )

  const end =
    new Date(
      auction.end_time
    )

  const isUpcoming =
    now < start

  const isLive =
    now >= start &&
    now < end

  const isFinished =
    now >= end

  const handleEnterAuction =
    () => {

      router.push(
        `/liveauctions/${auction.id}`
      )

    }

  return (

    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-5">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_35%)]" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2 mb-3">

            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isLive
                  ? "bg-red-500 animate-pulse"
                  : isFinished
                  ? "bg-zinc-500"
                  : "bg-orange-500"
              }`}
            />

            <span
              className={`uppercase tracking-[0.2em] text-[10px] font-black ${
                isLive
                  ? "text-red-400"
                  : isFinished
                  ? "text-zinc-400"
                  : "text-orange-400"
              }`}
            >

              {isLive
                ? "LIVE"
                : isFinished
                ? "FINISHED"
                : "UPCOMING"}

            </span>

          </div>

          <h2 className="text-2xl md:text-3xl font-black truncate">

            {auction.name}

          </h2>

          {auction.start_time && (

            <p className="text-zinc-500 text-sm mt-2">

              Starts{" "}
              {new Date(
                auction.start_time
              ).toLocaleString()}

            </p>

          )}

        </div>

        <div className="flex items-center gap-3">

          <div className="hidden sm:flex flex-col items-end">

            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">

              Status

            </p>

            <p
              className={`text-sm font-black ${
                isLive
                  ? "text-green-400"
                  : isFinished
                  ? "text-zinc-400"
                  : "text-orange-400"
              }`}
            >

              {isLive
                ? "LIVE NOW"
                : isFinished
                ? "AUCTION ENDED"
                : "STARTING SOON"}

            </p>

          </div>

          <button
            onClick={
              handleEnterAuction
            }
            className="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-2xl font-black text-sm text-white shadow-[0_0_25px_rgba(249,115,22,0.25)] whitespace-nowrap"
          >

            Enter Room

          </button>

        </div>

      </div>

    </div>

  )

}