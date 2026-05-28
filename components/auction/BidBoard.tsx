"use client"

import BidRow from "./BidRow"

type Props = {
  teams: any[]
}

export default function BidBoard({
  teams,
}: Props) {

  return (

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
            />

          )
        )}

      </div>

    </div>

  )

}