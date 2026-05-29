"use client"

import { useState } from "react"

import BidRow from "./BidRow"
import BidNowModal from "./BidNowModal"

type Props = {
  teams: any[]
  auction: any
}

export default function BidBoard({
  teams,
  auction,
}: Props) {

  const [
    selectedTeam,
    setSelectedTeam,
  ] = useState<any>(null)

  const [
    showBidModal,
    setShowBidModal,
  ] = useState(false)

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

  return (

    <>

      <div className="mt-8 overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950/90">

        {/* DESKTOP HEADER */}

        <div className="hidden md:grid grid-cols-[60px_1.6fr_120px_140px_160px_170px] items-center border-b border-zinc-800 bg-zinc-900/90 px-4 py-4 text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-black">

          <div>#</div>

          <div>Team</div>

          <div>Fargo</div>

          <div>Current</div>

          <div>Winning</div>

          <div className="text-right">

            Actions

          </div>

        </div>

        {/* ROWS */}

        <div>

          {teams.map(
            (
              team,
              index
            ) => (

              <BidRow
                key={team.id}
                team={team}
                index={index}
                onBid={handleBid}
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

    </>

  )

}