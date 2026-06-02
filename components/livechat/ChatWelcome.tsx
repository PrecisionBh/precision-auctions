"use client"

type Props = {
  onEnter: () => void
}

export default function ChatWelcome({
  onEnter,
}: Props) {

  return (

    <div className="h-[400px] overflow-y-auto p-4">

      <div className="mx-auto max-w-sm rounded-3xl border border-orange-500/30 bg-zinc-950 p-5 text-center shadow-[0_0_40px_rgba(249,115,22,0.15)]">

        <div className="mb-4 text-5xl">
          👑
        </div>

        <h2 className="text-xl font-black text-white">
          Welcome to Precision Auctions
        </h2>

        <p className="mt-4 text-zinc-300 leading-relaxed">
          Hey everyone,
        </p>

        <p className="mt-3 text-zinc-400 leading-relaxed">
          I'm Brandon, owner of Precision.
          Thank you for supporting our events and
          being part of the action.
        </p>

        <p className="mt-3 text-zinc-400 leading-relaxed">
          Have fun, enjoy the competition,
          and remember there are real players
          behind every team. A little friendly
          trash talk is welcome, but let's keep
          things respectful and make this a great
          experience for everyone.
        </p>

        <p className="mt-3 text-zinc-400 leading-relaxed">
          Good luck to all players and bidders!
        </p>

        <p className="mt-4 font-black text-orange-400">
          — Brandon
        </p>

        <button
          onClick={onEnter}
          className="mt-6 rounded-2xl bg-orange-500 px-8 py-3 font-black text-white transition hover:bg-orange-400"
        >
          Enter Chat
        </button>

      </div>

    </div>

  )

}