"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import AuctionTimer from "@/components/auction/auctiontimer"
import BidBoard from "@/components/auction/BidBoard"

import { supabase } from "@/lib/supabase"
import LiveAuctionChat from "@/components/livechat/LiveAuctionChat"

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

    const [
  favoriteIds,
  setFavoriteIds,
] = useState<number[]>([])

    useEffect(() => {

  if (!id) return

  const bidsChannel =
    supabase
      .channel(
        `auction-${id}`
      )

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bids",
        },
        () => {

          console.log(
            "Bid Update"
          )

          fetchAuction()

        }
      )

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table:
            "tournament_teams",
        },
        () => {

          console.log(
            "Team Update"
          )

          fetchAuction()

        }
      )

      .subscribe()

  return () => {

    supabase.removeChannel(
      bidsChannel
    )

  }

}, [id])

  useEffect(() => {

    if (id) {

      checkAuth()

    }

    }, [id])

useEffect(() => {

  const interval =
    setInterval(
      async () => {

        try {

          await supabase.functions.invoke(
            "process-next-max-bid"
          )

        } catch (err) {

          console.error(
            "AUTO BID ERROR",
            err
          )

        }

      },
      1000
    )

  return () =>
    clearInterval(
      interval
    )

}, [])

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

await loadFavorites(
  data.user.id
)

fetchAuction()

    } catch (err) {

      console.error(err)

    }

  }

  const loadFavorites =
  async (
    userId: string
  ) => {

    const {
      data,
      error,
    } = await supabase
      .from(
        "auction_favorites"
      )
      .select(
        "team_id"
      )
      .eq(
        "user_id",
        userId
      )

    if (error) {

      console.error(error)

      return

    }

    setFavoriteIds(
      (data || []).map(
        fav => fav.team_id
      )
    )

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
    current_winner_profile:profiles!tournament_teams_current_winner_fkey(
      id,
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
  endTime={
    auction?.end_time || ""
  }
  totalTeams={
    teams.length
  }
/>

        {/* BID BOARD */}

        <BidBoard
  teams={teams}
  auction={auction}
  favoriteIds={favoriteIds}
  setFavoriteIds={
    setFavoriteIds
  }
  user={user}
/>

{auction && (
  <LiveAuctionChat
    auctionId={auction.id}
  />
)}

      </main>

      <Footer />

    </div>

  )

}