"use client"

import { useState } from "react"

import BidRow from "./BidRow"
import BidNowModal from "./BidNowModal"
import MaxBidModal from "./MaxBidModal"
import AuctionSummaryBar from "./AuctionSummaryBar"

type Props = {
  teams: any[]
  auction: any

  favoriteIds: number[]
  user: any

  setFavoriteIds: React.Dispatch<
    React.SetStateAction<number[]>
  >
}

export default function BidBoard({
  teams,
  auction,
  user,
  favoriteIds,
  setFavoriteIds,
}: Props) {

  const [
    selectedTeam,
    setSelectedTeam,
  ] = useState<any>(null)

  const [
    showBidModal,
    setShowBidModal,
  ] = useState(false)

  const [
    showMaxBidModal,
    setShowMaxBidModal,
  ] = useState(false)

  const [
    filter,
    setFilter,
  ] = useState<
    "all" |
    "live" |
    "favorites" |
    "winning"
  >("all")

  const filteredTeams =
  teams.filter(team => {

    if (
      filter === "live"
    ) {

      const endTime =
        new Date(
          team.extended_end_time ||
          auction.end_time
        ).getTime()

      return (
        endTime >
        Date.now()
      )

    }

    if (
      filter === "favorites"
    ) {

      return favoriteIds.includes(
        team.id
      )

    }

    if (
      filter === "winning"
    ) {

      return (
        team.current_winner ===
        user?.id
      )

    }

    return true

  })

  const handleBid = (
    team: any
  ) => {

    console.log(
      "BID CLICKED",
      team
    )

    setSelectedTeam(team)

    setShowBidModal(true)

  }

  const handleMaxBid = (
    team: any
  ) => {

    console.log(
      "MAX BID CLICKED",
      team
    )

    setSelectedTeam(team)

    setShowMaxBidModal(true)

  }

  return (

    <>

    <AuctionSummaryBar
  teams={teams}
  user={user}
  favoriteIds={favoriteIds}
/>

      {/* FILTER BAR */}

      <div className="mt-8 mb-4 flex flex-wrap gap-2">

        <button
          onClick={() =>
            setFilter("all")
          }
          className={`rounded-xl px-4 py-2 text-sm font-black transition ${
            filter === "all"
              ? "bg-orange-500 text-white"
              : "border border-zinc-700 bg-zinc-900 text-zinc-400"
          }`}
        >
          All
        </button>

        <button
          onClick={() =>
            setFilter("live")
          }
          className={`rounded-xl px-4 py-2 text-sm font-black transition ${
            filter === "live"
              ? "bg-orange-500 text-white"
              : "border border-zinc-700 bg-zinc-900 text-zinc-400"
          }`}
        >
          Live
        </button>

        <button
          onClick={() =>
            setFilter("favorites")
          }
          className={`rounded-xl px-4 py-2 text-sm font-black transition ${
            filter === "favorites"
              ? "bg-orange-500 text-white"
              : "border border-zinc-700 bg-zinc-900 text-zinc-400"
          }`}
        >
          Favorites
        </button>

        <button
          onClick={() =>
            setFilter("winning")
          }
          className={`rounded-xl px-4 py-2 text-sm font-black transition ${
            filter === "winning"
              ? "bg-orange-500 text-white"
              : "border border-zinc-700 bg-zinc-900 text-zinc-400"
          }`}
        >
          Winning
        </button>

      </div>

      <div className="overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950/90">

        {/* DESKTOP HEADER */}

        <div className="hidden md:grid grid-cols-[60px_1.6fr_120px_140px_180px_120px_190px] items-center border-b border-zinc-800 bg-zinc-900/90 px-4 py-4 text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-black">

          <div>#</div>

          <div>Team</div>

          <div>Fargo</div>

          <div>Current</div>

          <div>Winning</div>

          <div>Time Left</div>

          <div className="text-right">

            Actions

          </div>

        </div>

        {/* ROWS */}

        <div>

          {filteredTeams.map(
            (
              team,
              index
            ) => (

              <BidRow
  key={team.id}
  team={team}
  index={index}
  auction={auction}
  onBid={handleBid}
  onMaxBid={handleMaxBid}
  favoriteIds={favoriteIds}
  setFavoriteIds={setFavoriteIds}
/>

            )
          )}

        </div>

      </div>

      <BidNowModal
        open={showBidModal}
        team={selectedTeam}
        auction={auction}
        onClose={() => {

          setShowBidModal(false)

          setSelectedTeam(null)

        }}
      />

      <MaxBidModal
  open={showMaxBidModal}
  team={selectedTeam}
  auction={auction}
  onClose={() => {

    setShowMaxBidModal(false)

    setSelectedTeam(null)

  }}
/>

    </>

  )

}