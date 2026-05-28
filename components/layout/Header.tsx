"use client"

import Link from "next/link"

type Props = {
  onLoginClick?: () => void
}

export default function Header({
  onLoginClick,
}: Props) {

  return (

    <header className="border-b border-zinc-800 bg-black/80 backdrop-blur sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link href="/">

          <div>

            <h1 className="text-2xl font-black tracking-wider text-white">
              PRECISION AUCTIONS
            </h1>

            <p className="text-xs text-zinc-500 uppercase tracking-[0.3em] mt-1">
              Live Pool Calcuttas
            </p>

          </div>

        </Link>

        <div className="flex items-center gap-3">

          <button
            onClick={onLoginClick}
            className="border border-zinc-700 hover:border-zinc-500 transition px-5 py-2 rounded-xl text-sm font-semibold text-white"
          >
            Login
          </button>

          <Link href="/register">

            <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-xl text-sm font-bold text-white">
              Create Account
            </button>

          </Link>

        </div>

      </div>

    </header>

  )

}