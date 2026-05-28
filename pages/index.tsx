export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <header className="border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Precision Auctions
            </h1>

            <p className="text-sm text-zinc-500">
              Live Pool Auctions
            </p>
          </div>

          <div className="flex items-center gap-4">

            <button className="text-sm text-zinc-300 hover:text-white transition">
              Watchlist
            </button>

            <button className="text-sm text-zinc-300 hover:text-white transition">
              My Bids
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg text-sm font-semibold">
              Sell Item
            </button>

          </div>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

            <span className="text-sm uppercase tracking-widest text-red-400 font-semibold">
              Live Auctions
            </span>

          </div>

          <h2 className="text-5xl font-bold leading-tight max-w-3xl">
            The Modern Live Auction Platform For Pool Players
          </h2>

          <p className="text-zinc-400 mt-6 max-w-2xl text-lg">
            Bid live, track auctions in real-time, build watchlists,
            and never miss a deal again.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {[1,2,3,4,5,6].map((item) => (

            <div
              key={item}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500 transition"
            >

              <div className="flex items-center justify-between mb-4">

                <span className="text-xs uppercase tracking-wider text-orange-400 font-semibold">
                  Ending Soon
                </span>

                <span className="text-sm text-zinc-500">
                  02:14
                </span>

              </div>

              <h3 className="text-xl font-bold mb-2">
                Shane vs Fedor Calcutta
              </h3>

              <p className="text-zinc-400 text-sm mb-6">
                Race to 9 • Pro Event • Finals
              </p>

              <div className="flex items-end justify-between">

                <div>

                  <p className="text-zinc-500 text-sm">
                    Current Bid
                  </p>

                  <p className="text-3xl font-bold text-orange-400">
                    $420
                  </p>

                </div>

                <button className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg font-semibold">
                  Bid
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  )
}