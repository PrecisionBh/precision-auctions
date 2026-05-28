"use client"

type Props = {
  entries: any[]

  onEntriesChange: (
    entries: any[]
  ) => void

  onSave: (
    entry: any
  ) => void

  onDelete: (
    entryId: number
  ) => void
}

export default function AuctionTable({
  entries,
  onEntriesChange,
  onSave,
  onDelete,
}: Props) {

  return (

    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      {/* HEADER */}

      <div className="grid grid-cols-[1.2fr_1.2fr_120px_120px_140px_180px] gap-4 border-b border-zinc-800 bg-black/40 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-zinc-500">

        <div>
          Player 1
        </div>

        <div>
          Player 2
        </div>

        <div>
          Fargo 1
        </div>

        <div>
          Fargo 2
        </div>

        <div>
          Total
        </div>

        <div className="text-right">
          Actions
        </div>

      </div>

      {/* ROWS */}

      {entries.map((entry) => (

        <div
          key={entry.id}
          className="grid grid-cols-[1.2fr_1.2fr_120px_120px_140px_180px] gap-4 items-center border-b border-zinc-800 px-6 py-4"
        >

          {/* PLAYER 1 */}

          <input
            type="text"
            value={
              entry.player1_name || ""
            }
            onChange={(e) => {

              onEntriesChange(

                entries.map((item) =>
                  item.id === entry.id
                    ? {
                        ...item,
                        player1_name:
                          e.target.value,
                      }
                    : item
                )

              )

            }}
            className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition font-bold text-white"
          />

          {/* PLAYER 2 */}

          <input
            type="text"
            value={
              entry.player2_name || ""
            }
            onChange={(e) => {

              onEntriesChange(

                entries.map((item) =>
                  item.id === entry.id
                    ? {
                        ...item,
                        player2_name:
                          e.target.value,
                      }
                    : item
                )

              )

            }}
            className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition font-bold text-white"
          />

          {/* FARGO 1 */}

          <input
            type="number"
            value={
              entry.player1_fargo || ""
            }
            onChange={(e) => {

              const value =
                Number(
                  e.target.value
                )

              onEntriesChange(

                entries.map((item) =>
                  item.id === entry.id
                    ? {
                        ...item,
                        player1_fargo:
                          value,

                        robustness:
                          value +
                          (item.player2_fargo || 0),
                      }
                    : item
                )

              )

            }}
            className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition font-bold text-white"
          />

          {/* FARGO 2 */}

          <input
            type="number"
            value={
              entry.player2_fargo || ""
            }
            onChange={(e) => {

              const value =
                Number(
                  e.target.value
                )

              onEntriesChange(

                entries.map((item) =>
                  item.id === entry.id
                    ? {
                        ...item,
                        player2_fargo:
                          value,

                        robustness:
                          (item.player1_fargo || 0) +
                          value,
                      }
                    : item
                )

              )

            }}
            className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition font-bold text-white"
          />

          {/* TOTAL */}

          <div className="font-black text-orange-400 text-lg">

            {entry.robustness || 0}

          </div>

          {/* ACTIONS */}

          <div className="flex items-center justify-end gap-3">

            <button
              onClick={() =>
                onSave(entry)
              }
              className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl font-black text-white"
            >
              Save
            </button>

            <button
              onClick={() =>
                onDelete(
                  entry.id
                )
              }
              className="border border-red-500/30 hover:border-red-400 hover:bg-red-500/10 transition px-5 py-3 rounded-xl font-black text-red-300"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

      {/* EMPTY */}

      {entries.length === 0 && (

        <div className="py-16 text-center text-zinc-500 font-bold">

          No teams found.

        </div>

      )}

    </div>

  )

}