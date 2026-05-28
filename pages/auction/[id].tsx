"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { supabase } from "@/lib/supabase"

export default function AuctionSettingsPage() {

  const router = useRouter()

  const { id } = router.query

  const [loading, setLoading] =
    useState(true)

  const [auction, setAuction] =
    useState<any>(null)

  useEffect(() => {

    if (id) {

      fetchAuction()

    }

  }, [id])

  const fetchAuction = async () => {

    const {
      data,
      error,
    } = await supabase
      .from("auctions")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {

      console.error(error)

      return

    }

    setAuction(data)

    setLoading(false)

  }

  const handleUpdateAuction = async () => {

    const {
      error,
    } = await supabase
      .from("auctions")
      .update({

        name:
          auction.name,

        start_time:
          auction.start_time,

        end_time:
          auction.end_time,

        minimum_bid_increment:
          auction.minimum_bid_increment,

        minimum_starting_bid:
          auction.minimum_starting_bid,

      })
      .eq("id", id)

    if (error) {

      alert(error.message)

      return

    }

    alert(
      "Auction updated successfully!"
    )

  }

  const handleDeleteAuction = async () => {

    const confirmed =
      confirm(
        "Delete this auction?"
      )

    if (!confirmed) return

    const {
      error,
    } = await supabase
      .from("auctions")
      .delete()
      .eq("id", id)

    if (error) {

      alert(error.message)

      return

    }

    router.push("/admin")

  }

  if (loading || !auction) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <p className="text-zinc-500">
          Loading Auction...
        </p>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-black text-white flex flex-col">

      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          {/* TOP */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

            <div>

              <p className="text-orange-400 uppercase tracking-[0.3em] text-xs font-black mb-3">
                AUCTION SETTINGS
              </p>

              <h1 className="text-5xl font-black">
                Edit Auction
              </h1>

              <p className="text-zinc-500 mt-3">
                Update auction information and timing.
              </p>

            </div>

            <button
              onClick={handleDeleteAuction}
              className="bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition px-6 py-4 rounded-2xl font-black text-red-300"
            >
              Delete Auction
            </button>

          </div>

          {/* FORM */}

          <div className="space-y-6">

            {/* NAME */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Auction Name
              </label>

              <input
                type="text"
                value={auction.name || ""}
                onChange={(e) =>
                  setAuction({
                    ...auction,
                    name: e.target.value,
                  })
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition"
              />

            </div>

            {/* TIMES */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Start Time
                </label>

                <input
                  type="datetime-local"
                  value={
                    auction.start_time
                      ? new Date(
                          auction.start_time
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setAuction({
                      ...auction,
                      start_time:
                        e.target.value,
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  End Time
                </label>

                <input
                  type="datetime-local"
                  value={
                    auction.end_time
                      ? new Date(
                          auction.end_time
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setAuction({
                      ...auction,
                      end_time:
                        e.target.value,
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition"
                />

              </div>

            </div>

            {/* SETTINGS */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Minimum Bid Increment
                </label>

                <input
                  type="number"
                  value={
                    auction.minimum_bid_increment || 0
                  }
                  onChange={(e) =>
                    setAuction({
                      ...auction,
                      minimum_bid_increment:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Minimum Starting Bid
                </label>

                <input
                  type="number"
                  value={
                    auction.minimum_starting_bid || 0
                  }
                  onChange={(e) =>
                    setAuction({
                      ...auction,
                      minimum_starting_bid:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition"
                />

              </div>

            </div>

            {/* SAVE */}

            <button
              onClick={handleUpdateAuction}
              className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-2xl font-black text-lg"
            >
              Save Auction Changes
            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>

  )

}