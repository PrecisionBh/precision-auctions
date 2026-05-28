"use client"

type Props = {
  sortMode: string

  onAddTeam: () => void

  onSort: (
    mode: string
  ) => void
}

export default function AuctionActions({
  sortMode,
  onAddTeam,
  onSort,
}: Props) {

  return (

    <div className="flex flex-wrap gap-4 mb-8">

      {/* ADD TEAM */}

      <button
        onClick={onAddTeam}
        className="bg-orange-500 hover:bg-orange-600 transition px-6 py-4 rounded-2xl font-black text-white shadow-[0_0_35px_rgba(249,115,22,0.45)]"
      >
        Add Team
      </button>

      {/* SORT HIGH LOW */}

      <button
        onClick={() =>
          onSort(
            "high-low"
          )
        }
        className={`px-6 py-4 rounded-2xl font-black transition ${
          sortMode === "high-low"
            ? "bg-orange-500 text-white"
            : "bg-zinc-900 border border-zinc-700 text-white hover:border-orange-500"
        }`}
      >
        Fargo High → Low
      </button>

      {/* SORT LOW HIGH */}

      <button
        onClick={() =>
          onSort(
            "low-high"
          )
        }
        className={`px-6 py-4 rounded-2xl font-black transition ${
          sortMode === "low-high"
            ? "bg-orange-500 text-white"
            : "bg-zinc-900 border border-zinc-700 text-white hover:border-orange-500"
        }`}
      >
        Fargo Low → High
      </button>

    </div>

  )

}