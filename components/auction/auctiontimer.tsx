"use client"

import { useEffect, useState } from "react"

type Props = {
  tournamentName: string
  startTime: string
  totalTeams?: number
}

export default function AuctionTimer({
  tournamentName,
  startTime,
  totalTeams = 0,
}: Props) {

  const [timeLeft, setTimeLeft] =
    useState("")

  const [isLive, setIsLive] =
    useState(false)

  useEffect(() => {

    const updateCountdown =
      () => {

        const now =
          new Date().getTime()

        const start =
          new Date(
            startTime
          ).getTime()

        const difference =
          start - now

        if (difference <= 0) {

          setIsLive(true)

          setTimeLeft("LIVE")

          return

        }

        const days =
          Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
          )

        const hours =
          Math.floor(
            (
              difference %
              (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
          )

        const minutes =
          Math.floor(
            (
              difference %
              (1000 * 60 * 60)
            ) /
            (1000 * 60)
          )

        const seconds =
          Math.floor(
            (
              difference %
              (1000 * 60)
            ) / 1000
          )

        if (days > 0) {

          setTimeLeft(
            `${days}d ${hours}h ${minutes}m`
          )

          return

        }

        if (hours > 0) {

          setTimeLeft(
            `${hours}h ${minutes}m ${seconds}s`
          )

          return

        }

        setTimeLeft(
          `${minutes}m ${seconds}s`
        )

      }

    updateCountdown()

    const interval =
      setInterval(
        updateCountdown,
        1000
      )

    return () =>
      clearInterval(interval)

  }, [startTime])

  return (

    <div className="relative overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950/95 px-5 py-6 md:px-7 md:py-7">

      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_55%)]" />

      <div className="relative z-10">

        {/* TOP BAR */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          {/* LEFT */}

          <div>

            {/* LIVE LABEL */}

            <div className="flex items-center gap-2 mb-3">

              <div className="relative">

                <div className="absolute inset-0 rounded-full bg-red-500 blur-md opacity-80" />

                <div className="relative w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />

              </div>

              <span className="text-[10px] uppercase tracking-[0.35em] text-red-400 font-black">

                Live Auction Room

              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">

              {tournamentName}

            </h1>

            {/* SUBTEXT */}

            <div className="flex items-center gap-2 mt-3 flex-wrap">

              <span className="text-zinc-500 text-xs md:text-sm font-medium">

                Scotch Doubles

              </span>

              <div className="w-1 h-1 rounded-full bg-zinc-700" />

              <span className="text-zinc-500 text-xs md:text-sm font-medium">

                {totalTeams} Teams

              </span>

              <div className="w-1 h-1 rounded-full bg-zinc-700" />

              <span className="text-orange-400 text-xs md:text-sm font-semibold">

                Live Bidding

              </span>

            </div>
            </div>

          {/* RIGHT TIMER */}

          <div className="relative overflow-hidden rounded-2xl border border-orange-500/25 bg-black/40 px-5 py-4 min-w-[180px] md:min-w-[220px]">

            {/* GLOW */}

            <div className="absolute inset-0 bg-orange-500/10 blur-2xl" />

            <p className="relative z-10 text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-black mb-1">

              {isLive
                ? "Auction Live"
                : "Starts In"}

            </p>

            <div
              className={`relative z-10 text-3xl md:text-5xl font-black tracking-tight ${
                isLive
                  ? "text-green-400 drop-shadow-[0_0_18px_rgba(74,222,128,0.85)]"
                  : "text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.95)]"
              }`}
            >

              {timeLeft}

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}