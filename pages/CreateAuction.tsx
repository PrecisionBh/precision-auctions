"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { supabase } from "@/lib/supabase"

export default function CreateAuctionPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [user, setUser] =
    useState<any>(null)

  const [profile, setProfile] =
    useState<any>(null)

  const [auctionName, setAuctionName] =
    useState("")

  const [startTime, setStartTime] =
    useState("")

  const [endTime, setEndTime] =
    useState("")

  const [minimumBidIncrement, setMinimumBidIncrement] =
    useState(5)

  const [minimumStartingBid, setMinimumStartingBid] =
    useState(20)

  useEffect(() => {

    checkAdmin()

  }, [])

  const checkAdmin = async () => {

    const {
      data,
    } = await supabase.auth.getUser()

    if (!data.user) {

      router.push("/")

      return
    }

    setUser(data.user)

    const {
      data: profileData,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (!profileData?.is_admin) {

      router.push("/")

      return
    }

    setProfile(profileData)

  }

  const handleCreateAuction = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    if (loading) return

    try {

      setLoading(true)

      const {
        error,
      } = await supabase
        .from("auctions")
        .insert({

          name: auctionName,

          start_time:
            startTime,

          end_time:
            endTime,

          minimum_bid_increment:
            minimumBidIncrement,

          minimum_starting_bid:
            minimumStartingBid,

          created_by:
            user.id,

        })

      if (error) {

        alert(error.message)

        return
      }

      alert(
        "Auction created successfully!"
      )

      router.push("/")

    } catch (err) {

      console.error(err)

      alert(
        "Something went wrong."
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="relative min-h-screen overflow-hidden bg-black text-white flex flex-col">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[140px]" />

      </div>

      <Header />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">

        <div className="w-full max-w-2xl rounded-[32px] border border-orange-500/20 bg-zinc-900/75 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(249,115,22,0.25)]">

          {/* TOP */}

          <div className="mb-10 text-center">

            <div className="flex items-center justify-center gap-3 mb-5">

              <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />

              <span className="text-orange-400 uppercase tracking-[0.3em] text-xs font-black">
                ADMIN PANEL
              </span>

            </div>

            <h1 className="text-4xl sm:text-5xl font-black">
              Create Auction
            </h1>

            <p className="text-zinc-400 mt-4">
              Create a live calcutta event.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleCreateAuction}
            className="space-y-6"
          >

            {/* AUCTION NAME */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Auction Name
              </label>

              <input
                type="text"
                value={auctionName}
                onChange={(e) =>
                  setAuctionName(
                    e.target.value
                  )
                }
                placeholder="Friday Night Open Calcutta"
                className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white placeholder:text-zinc-600"
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
                  value={startTime}
                  onChange={(e) =>
                    setStartTime(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  End Time
                </label>

                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) =>
                    setEndTime(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white"
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
                  value={minimumBidIncrement}
                  onChange={(e) =>
                    setMinimumBidIncrement(
                      Number(e.target.value)
                    )
                  }
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Minimum Starting Bid
                </label>

                <input
                  type="number"
                  value={minimumStartingBid}
                  onChange={(e) =>
                    setMinimumStartingBid(
                      Number(e.target.value)
                    )
                  }
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white"
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-2xl font-black text-lg shadow-[0_0_35px_rgba(249,115,22,0.45)] disabled:opacity-50"
            >

              {loading
                ? "Creating Auction..."
                : "Create Auction"}

            </button>

          </form>

        </div>

      </main>

      <Footer />

    </div>

  )

}