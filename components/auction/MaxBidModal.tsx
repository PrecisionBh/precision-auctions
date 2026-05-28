"use client"

type Props = {
  open: boolean
  onClose: () => void
  team: any
}

export default function MaxBidModal({
  open,
  onClose,
  team,
}: Props) {

  if (!open || !team)
    return null

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">

        {/* GLOW */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.12),transparent_55%)]" />

        <div className="relative z-10">

          {/* TITLE */}

          <p className="text-[10px] uppercase tracking-[0.35em] text-orange-400 font-black mb-3">

            Set Max Bid

          </p>

          <h2 className="text-3xl font-black text-white leading-tight">

            {team.player1_name}

            <br />

            {team.player2_name}

          </h2>

          <p className="mt-3 text-zinc-500 text-sm leading-relaxed">

            Your max bid will automatically bid for you up to your selected amount.

          </p>

          {/* INPUT */}

          <div className="mt-6">

            <label className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-black">

              Max Bid Amount

            </label>

            <input
              type="number"
              placeholder="Enter max bid"
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none focus:border-orange-500"
            />

          </div>

          {/* ACTIONS */}

          <div className="mt-6 flex items-center gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 py-3 font-black text-zinc-300"
            >

              Cancel

            </button>

            <button className="flex-1 rounded-2xl bg-orange-500 py-3 font-black text-white hover:bg-orange-400 transition">

              Save Max Bid

            </button>

          </div>

        </div>

      </div>

    </div>

  )

}