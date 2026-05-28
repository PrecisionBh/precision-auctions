"use client"

import { useEffect, useState } from "react"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import LiveAuctionCard from "@/components/auction/LiveAuctionCard"

import { supabase } from "@/lib/supabase"

export default function LiveAuctionsPage() {

  const [user, setUser] =
    useState<any>(null)

  const [liveAuctions, setLiveAuctions] =
    useState<any[]>([])

  const [upcomingAuctions, setUpcomingAuctions] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    checkAuth()

  }, [])

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

      fetchAuctions()

    } catch (err) {

      console.error(err)

    }

  }

  const fetchAuctions = async () => {

    try {

      const {
        data,
        error,
      } = await supabase
        .from("auctions")
        .select("*")
        .order(
          "start_time",
          { ascending: true }
        )

      if (error) {

        console.error(error)

        return

      }

      const live =
        (data || []).filter(
          (auction) =>
            auction.is_live === true
        )

      const upcoming =
        (data || []).filter(
          (auction) =>
            auction.is_live === false
        )

      setLiveAuctions(live)

      setUpcomingAuctions(
        upcoming
      )

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

    }

  }

  const handleEnterAuction = (
    auctionId: string
  ) => {

    window.location.href =
      `/liveauctions/${auctionId}`

  }

  return (

    <div className="min-h-screen bg-black text-white flex flex-col pt-24 overflow-hidden">

      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">

        {/* PAGE HEADER */}

        <div className="mb-16">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

            <span className="text-red-400 uppercase tracking-[0.3em] text-sm font-black">

              LIVE AUCTIONS

            </span>

          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none">

            Auction Lobby

          </h1>

          <p className="text-zinc-500 text-lg mt-6 max-w-2xl">

            Enter upcoming and live
            tournament auctions.

          </p>

        </div>

         {/* DIVIDER */}

            <div className="relative my-20">

              <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-70" />

              <div className="absolute inset-0 blur-md bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            </div>

        {/* LOADING */}

        {loading && (

          <div className="flex items-center justify-center py-32">

            <p className="text-zinc-500 font-bold text-lg">

              Loading Auctions...

            </p>

          </div>

        )}

        {!loading && (

          <>

            {/* UPCOMING */}

            <section className="mb-20">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-3 h-3 rounded-full bg-orange-500" />

                <h2 className="text-3xl font-black">

                  Upcoming Auctions

                </h2>

              </div>

              {upcomingAuctions.length === 0 ? (

                <div className="border border-zinc-800 bg-zinc-900/60 rounded-[32px] p-14 text-center">

                  <h3 className="text-2xl font-black mb-3">

                    No Upcoming Auctions

                  </h3>

                  <p className="text-zinc-500">

                    No scheduled auctions yet.

                  </p>

                </div>

              ) : (

                <div className="grid grid-cols-1 gap-8">

                  {upcomingAuctions.map(
                    (auction) => (

                      <LiveAuctionCard
                        key={auction.id}
                        auction={{
                          ...auction,
                          is_live: false,
                        }}
                      />

                    )
                  )}

                </div>

              )}

            </section>

            {/* DIVIDER */}

            <div className="relative my-20">

              <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-70" />

              <div className="absolute inset-0 blur-md bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            </div>

            {/* LIVE */}

            <section>

              <div className="flex items-center gap-3 mb-8">

                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

                <h2 className="text-3xl font-black">

                  Live Now

                </h2>

              </div>

              {liveAuctions.length === 0 ? (

                <div className="border border-zinc-800 bg-zinc-900/60 rounded-[32px] p-14 text-center">

                  <h3 className="text-2xl font-black mb-3">

                    No Live Auctions

                  </h3>

                  <p className="text-zinc-500">

                    Check back later for live action.

                  </p>

                </div>

              ) : (

                <div className="grid grid-cols-1 gap-8">

                  {liveAuctions.map(
                    (auction) => (

                      <LiveAuctionCard
                        key={auction.id}
                        auction={{
                          ...auction,
                          is_live: true,
                        }}
                      />

                    )
                  )}

                </div>

              )}

            </section>

          </>

        )}

      </main>

      <Footer />

    </div>

  )

}