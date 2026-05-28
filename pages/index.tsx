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

  const handleProtectedAction =
    () => {

      if (!user) {

        setOpenLogin(true)

        return

      }

      window.location.href =
        "/liveauctions"

    }

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col pt-24">

      <AuthModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      />

      <Header
        onLoginClick={() => setOpenLogin(true)}
      />

      <main className="flex-1 flex items-center">

        {/* HERO */}

        <section className="relative w-full">

          {/* BACKGROUND GLOW */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_45%)]" />

          <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">

            {/* LIVE */}

            <div className="flex items-center gap-3 mb-8">

              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

              <span className="text-red-400 uppercase tracking-[0.3em] text-sm font-bold">

                LIVE AUCTIONS

              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black max-w-6xl leading-[0.95]">

              The Modern
              <br />
              Pool Auction Platform

            </h1>

            {/* DESCRIPTION */}

            <p className="text-zinc-400 text-lg md:text-2xl max-w-3xl mt-10 leading-relaxed">

              Real-time calcuttas built for pool players.
              Watchlists, anti-sniper protection,
              live bidding, and tournament action —
              all in one place.

            </p>

            {/* ACTIONS */}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-14">

              {/* ENTER AUCTIONS */}

              <button
                onClick={
                  handleProtectedAction
                }
                className="bg-orange-500 hover:bg-orange-600 transition px-10 py-5 rounded-3xl font-black text-xl text-white shadow-[0_0_45px_rgba(249,115,22,0.35)]"
              >

                Enter Live Auctions

              </button>

              {/* WATCH DEMO */}

              <button
                onClick={() => {

                  alert(
                    "Demo coming soon."
                  )

                }}
                className="border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50 transition px-10 py-5 rounded-3xl font-bold text-xl text-white backdrop-blur"
              >

                Watch Demo

              </button>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>

  )

}