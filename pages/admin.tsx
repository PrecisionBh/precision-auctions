"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { supabase } from "@/lib/supabase"

export default function AdminPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(true)

  const [auctions, setAuctions] =
    useState<any[]>([])

  useEffect(() => {

    checkAdmin()

  }, [])

  const checkAdmin = async () => {

    const {
      data,
    } = await supabase.auth.getUser()

    if (!data.user) {

      router.push("/")

      return
    }

    const {
      data: profile,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (!profile?.is_admin) {

      router.push("/")

      return
    }

    fetchAuctions()

  }

  const fetchAuctions = async () => {

    const {
      data,
      error,
    } = await supabase
      .from("auctions")
      .select("*")
      .order(
        "created_at",
        { ascending: false }
      )

    if (error) {

      console.error(error)

      return
    }

    setAuctions(data || [])

    setLoading(false)

  }

  const handleDeleteAuction = async (
    auctionId: string
  ) => {

    const confirmed =
      confirm(
        "Delete this auction?"
      )

    if (!confirmed) return

    const {
      error,
    } = await supabase
      .from("auctions")
      .delete()
      .eq("id", auctionId)

    if (error) {

      alert(error.message)

      return
    }

    fetchAuctions()

  }

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <p className="text-zinc-500">
          Loading Admin Panel...
        </p>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-black text-white flex flex-col">

      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">

        {/* TOP */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <p className="text-orange-400 uppercase tracking-[0.3em] text-xs font-black mb-3">
              ADMIN PANEL
            </p>

            <h1 className="text-5xl font-black">
              Auctions
            </h1>

            <p className="text-zinc-500 mt-3">
              Manage live calcuttas and entries.
            </p>

          </div>

          <Link href="/CreateAuction">

            <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl font-black text-lg shadow-[0_0_35px_rgba(249,115,22,0.45)]">

              Create Auction

            </button>

          </Link>

        </div>

        {/* AUCTIONS */}

        {auctions.length === 0 ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

            <h2 className="text-3xl font-black mb-3">
              No Auctions Yet
            </h2>

            <p className="text-zinc-500">
              Create your first live auction.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {auctions.map((auction) => (

              <div
                key={auction.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
              >

                {/* TOP */}

                <div className="mb-8">

                  <div className="flex items-center justify-between mb-4">

                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                      Auction
                    </span>

                    <span className="text-sm text-zinc-500">
                      Live
                    </span>

                  </div>

                  <h2 className="text-3xl font-black leading-tight">
                    {auction.name}
                  </h2>

                </div>

                {/* INFO */}

                <div className="space-y-4 mb-8">

                  <div>

                    <p className="text-zinc-500 text-sm mb-1">
                      Start Time
                    </p>

                    <p className="font-semibold">
                      {new Date(
                        auction.start_time
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm mb-1">
                      End Time
                    </p>

                    <p className="font-semibold">
                      {new Date(
                        auction.end_time
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

                {/* BUTTONS */}

<div className="flex flex-col gap-3">

  <Link
    href={`/entries/${auction.id}`}
  >

    <button className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-2xl font-black">

      Edit Entries

    </button>

  </Link>

  <Link
    href={`/auction/${auction.id}`}
  >

    <button className="w-full border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 transition py-3 rounded-2xl font-black text-white">

      Edit Auction Info

    </button>

  </Link>

  <button
    onClick={() =>
      handleDeleteAuction(
        auction.id
      )
    }
    className="w-full border border-red-500/30 hover:border-red-400 hover:bg-red-500/10 transition py-3 rounded-2xl font-black text-red-300"
  >

    Delete Auction

  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      <Footer />

    </div>

  )

}