"use client"

type Props = {
  teams: any[]
  user: any
  favoriteIds: number[]
}

export default function AuctionSummaryBar({
  teams,
  user,
  favoriteIds,
}: Props) {

  const auctionTotal =
    teams.reduce(
      (sum, team) =>
        sum +
        Number(team.current_bid || 0),
      0
    )

  const winningTeams =
    teams.filter(
      team =>
        team.current_winner ===
        user?.id
    )

  const amountOwed =
    winningTeams.reduce(
      (sum, team) =>
        sum +
        Number(team.current_bid || 0),
      0
    )

  const favoriteCount =
    favoriteIds.length

  return (

    <div className="mt-6 mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">

      {/* AUCTION TOTAL */}

      <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.08)] px-5 py-4">

        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">

          Auction Total

        </p>

        <p className="mt-1 text-2xl font-black text-orange-400">

          ${auctionTotal.toLocaleString()}

        </p>

      </div>

      {/* WINNING */}

      <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.08)] px-5 py-4">

        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">

          My Winning Total

        </p>

        <p className="mt-1 text-2xl font-black text-orange-400">

          ${amountOwed.toLocaleString()}

        </p>

        <p className="mt-1 text-xs font-bold text-zinc-500">

          {winningTeams.length} Teams

        </p>

      </div>

      {/* FAVORITES */}

      <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.08)] px-5 py-4">

        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">

          Favorites

        </p>

        <p className="mt-1 text-2xl font-black text-orange-400">

          {favoriteCount}

        </p>

        <p className="mt-1 text-xs font-bold text-zinc-500">

          Watchlist Teams

        </p>

      </div>

    </div>

  )

}