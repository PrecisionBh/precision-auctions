import Link from "next/link"

export default function Footer() {

  return (

    <footer className="border-t border-zinc-800 bg-black">

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND */}

          <div>

            <h2 className="text-2xl font-black tracking-wider text-white">
              PRECISION AUCTIONS
            </h2>

            <p className="text-zinc-500 mt-4 leading-relaxed">

              The modern live auction platform
              built specifically for pool players,
              calcuttas, and tournament action.

            </p>

          </div>

          {/* LINKS */}

          <div>

            <h3 className="text-white font-bold mb-4">
              Navigation
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

              <Link
                href="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                href="/register"
                className="hover:text-white transition"
              >
                Create Account
              </Link>

            </div>

          </div>

          {/* STATUS */}

          <div>

            <h3 className="text-white font-bold mb-4">
              Platform
            </h3>

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

              <span className="text-zinc-400">
                Live Auctions Active
              </span>

            </div>

          </div>

        </div>

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-zinc-600 text-sm">
            © 2026 Precision Auctions. All rights reserved.
          </p>

          <p className="text-zinc-600 text-sm">
            Powered by Precision Cues
          </p>

        </div>

      </div>

    </footer>

  )

}