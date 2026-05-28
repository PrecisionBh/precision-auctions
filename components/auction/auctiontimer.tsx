"use client"

import { useEffect, useState } from "react"

type Props = {
  tournamentName: string
  startTime: string
}

export default function AuctionTimer({
  tournamentName,
  startTime,
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

    <div className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8">

      {/* GLOW */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_35%)]" />

      <div className="relative z-10">

        {/* TOURNAMENT */}

        <p className="text-orange-400 uppercase tracking-[0.3em] text-xs font-black mb-5">

          Tournament Auction

        </p>

        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-10">

          {tournamentName}

        </h2>

        {/* TIMER */}

        <div className="bg-black/40 border border-zinc-800 rounded-3xl px-8 py-7 inline-flex flex-col">

          <p className="text-zinc-500 text-sm uppercase tracking-[0.2em] mb-3 font-black">

            {isLive
              ? "Auction Status"
              : "Starts In"}

          </p>

          <p
            className={`text-5xl md:text-6xl font-black ${
              isLive
                ? "text-green-400"
                : "text-orange-400"
            }`}
          >

            {timeLeft}

          </p>

        </div>

      </div>

    </div>

  )

}