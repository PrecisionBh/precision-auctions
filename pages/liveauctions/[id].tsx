"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import AuctionTimer from "@/components/auction/auctiontimer"
import BidBoard from "@/components/auction/BidBoard"

import { supabase } from "@/lib/supabase"

export default function LiveAuctionRoomPage() {

  const router = useRouter()

  const { id } = router.query

  const [loading, setLoading] =
    useState(true)

  const [auction, setAuction] =
    useState<any>(null)

  const [teams, setTeams] =
    useState<any[]>([])

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

      const {
        data: teamsData,
        error: teamsError,
      } = await supabase
        .from("tournament_teams")
.select(`
  *,
  winner:profiles!current_winner(
    username
  )
`)
        .eq(
          "tournament_id",
          data.tournament_id
        )
        .order(
          "display_order",
          { ascending: true }
        )

      if (teamsError) {

        console.error(
          teamsError
        )

      }

      const formattedTeams =
        (teamsData || []).map(
          (team) => ({

            ...team,

            auction_id:
              data.id,

          })
        )

      setTeams(
        formattedTeams
      )

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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        {/* LIVE LABEL */}

        <div className="flex items-center justify-center gap-3 mb-6">

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-red-500 blur-md opacity-80" />

            <div className="relative w-3 h-3 rounded-full bg-red-500 animate-pulse" />

          </div>

          <span className="text-red-400 uppercase tracking-[0.35em] text-xs font-black">

            LIVE AUCTION ROOM

          </span>

        </div>

        {/* TIMER */}

        <AuctionTimer
          tournamentName={
            auction?.name || ""
          }
          startTime={
            auction?.start_time || ""
          }
          totalTeams={
            teams.length
          }
        />

        {/* BID BOARD */}

        <BidBoard
          teams={teams}
        />

      </main>

      <Footer />

    </div>

  )

}