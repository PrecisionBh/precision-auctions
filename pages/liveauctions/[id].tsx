"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import AuctionTimer from "@/components/auction/auctiontimer"

import { supabase } from "@/lib/supabase"

export default function LiveAuctionRoomPage() {

  const router = useRouter()

  const { id } = router.query

  const [loading, setLoading] =
    useState(true)

  const [auction, setAuction] =
    useState<any>(null)

  const [user, setUser] =
    useState<any>(null)

  useEffect(() => {

    if (id) {

      checkAuth()

    }

  }, [id])

  const checkAuth = async () => {

    try {

      const {
        data,
      } = await supabase.auth.getUser()

      if (!data.user) {

        window.location.href = "/"

        return

      }

      setUser(data.user)

      fetchAuction()

    } catch (err) {

      console.error(err)

    }

  }

  const fetchAuction = async () => {

    try {

      const {
        data,
        error,
      } = await supabase
        .from("auctions")
        .select("*")
        .eq(
          "id",
          id
        )
        .single()

      if (error) {

        console.error(error)

        return

      }

      setAuction(data)

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

    }

  }

  if (
    loading ||
    !auction
  ) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <p className="text-zinc-500 font-bold text-lg">

          Loading Auction Room...

        </p>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-black text-white flex flex-col pt-24 overflow-hidden">

      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">

        {/* TOP */}

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

            <span className="text-red-400 uppercase tracking-[0.3em] text-sm font-black">

              LIVE AUCTION ROOM

            </span>

          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none">

            {auction.name}

          </h1>

          <p className="text-zinc-500 text-lg mt-6 max-w-3xl">

            Real-time calcutta bidding,
            favorites, max bids,
            live chat,
            and auction action.

          </p>

        </div>

        {/* TIMER */}

        <AuctionTimer
          tournamentName={
            auction.name
          }
          startTime={
            auction.start_time
          }
        />

      </main>

      <Footer />

    </div>

  )

}