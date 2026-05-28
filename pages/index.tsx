"use client"

import { useEffect, useState } from "react"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AuthModal from "@/components/auth/AuthModal"

import { supabase } from "@/lib/supabase"

export default function Home() {

  const [openLogin, setOpenLogin] =
    useState(false)

  const [user, setUser] =
    useState<any>(null)

  useEffect(() => {

    checkUser()

  }, [])

  const checkUser = async () => {

    const {
      data,
    } = await supabase.auth.getUser()

    setUser(data.user)

  }

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">

      <AuthModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      />

      <Header
        onLoginClick={() => setOpenLogin(true)}
      />

      <main className="flex-1">

        {/* LOGIN BANNER */}

        {!user && (

          <div className="bg-orange-500/10 border-b border-orange-500/20">

            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

              <p className="text-orange-300 text-sm sm:text-base text-center sm:text-left">

                Please login or create an account
                to access live auctions and bidding.

              </p>

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setOpenLogin(true)
                  }
                  className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-xl font-bold text-sm"
                >
                  Login
                </button>

                <a
                  href="/register"
                  className="border border-orange-500/30 hover:border-orange-400 transition px-5 py-2 rounded-xl font-bold text-sm text-orange-300"
                >
                  Create Account
                </a>

              </div>

            </div>

          </div>

        )}

        {/* HERO */}

        <section className="relative">

          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />

          <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

              <span className="text-red-400 uppercase tracking-[0.3em] text-sm font-bold">
                LIVE AUCTIONS
              </span>

            </div>

            <h2 className="text-5xl md:text-7xl font-black max-w-5xl leading-none">

              The Modern
              <br />
              Pool Auction Platform

            </h2>

            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed">

              Live calcuttas, real-time bidding,
              watchlists, anti-sniper protection,
              and tournament action built specifically
              for pool players.

            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">

              {!user ? (

                <button
                  onClick={() =>
                    setOpenLogin(true)
                  }
                  className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl font-black text-lg"
                >
                  Enter Auctions
                </button>

              ) : (

                <button
                  className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl font-black text-lg"
                >
                  Enter Live Auctions
                </button>

              )}

              <button className="border border-zinc-700 hover:border-zinc-500 transition px-8 py-4 rounded-2xl font-semibold text-lg">
                Watch Demo
              </button>

            </div>

          </div>

        </section>

        {/* AUCTIONS */}

        <section className="max-w-7xl mx-auto px-4 pb-24">

          <div className="flex items-center justify-between mb-8">

            <h3 className="text-3xl font-black">
              Ending Soon
            </h3>

            <span className="text-zinc-500 text-sm uppercase tracking-[0.2em]">

              {user
                ? "Live Auctions"
                : "Preview Only"}

            </span>

          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition ${
            !user
              ? "opacity-60 blur-[1px]"
              : ""
          }`}>

            {[1,2,3,4,5,6].map((item) => (

              <div
                key={item}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
              >

                <div className="flex items-center justify-between mb-5">

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                    Live
                  </span>

                  <span className="text-sm text-zinc-500">
                    02:14
                  </span>

                </div>

                <h4 className="text-2xl font-black mb-2">
                  Shane vs Fedor
                </h4>

                <p className="text-zinc-500 mb-8">
                  Race to 9 Finals
                </p>

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-zinc-500 text-sm mb-1">
                      Current Bid
                    </p>

                    <p className="text-4xl font-black text-orange-400">
                      $420
                    </p>

                  </div>

                  {!user ? (

                    <button
                      onClick={() =>
                        setOpenLogin(true)
                      }
                      className="bg-orange-500 px-5 py-3 rounded-xl font-bold"
                    >
                      Login
                    </button>

                  ) : (

                    <button
                      className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl font-bold"
                    >
                      Bid
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

      <Footer />

    </div>

  )

}