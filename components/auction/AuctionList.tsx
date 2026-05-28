"use client"

import { useEffect, useState } from "react"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import AuctionActions from "@/components/auction/AuctionActions"
import AddTeamModal from "@/components/auction/AddTeamModal"
import AuctionTable from "@/components/auction/AuctionTable"

import { supabase } from "@/lib/supabase"

type Props = {
  tournamentId: string
  auctionName?: string
}

export default function AuctionList({
  tournamentId,
  auctionName,
}: Props) {

  const [loading, setLoading] =
    useState(true)

  const [entries, setEntries] =
    useState<any[]>([])

  const [sortMode, setSortMode] =
    useState("high-low")

  const [showAddModal, setShowAddModal] =
    useState(false)

  useEffect(() => {

    if (tournamentId) {

      fetchEntries()

    }

  }, [tournamentId])

  const fetchEntries = async () => {

    setLoading(true)

    const {
      data,
      error,
    } = await supabase
      .from("tournament_teams")
      .select("*")
      .eq(
        "tournament_id",
        tournamentId
      )
      .eq(
        "registration_paid",
        true
      )
      .order(
        "display_order",
        { ascending: true }
      )

    if (error) {

      console.error(error)

      setLoading(false)

      return

    }

    setEntries(data || [])

    setLoading(false)

  }

  const handleSort = async (
    mode: string
  ) => {

    setSortMode(mode)

    const sorted =
      [...entries].sort(
        (a, b) => {

          if (
            mode ===
            "high-low"
          ) {

            return (
              (b.robustness || 0) -
              (a.robustness || 0)
            )

          }

          return (
            (a.robustness || 0) -
            (b.robustness || 0)
          )

        }
      )

    setEntries(sorted)

    for (
      let i = 0;
      i < sorted.length;
      i++
    ) {

      await supabase
        .from(
          "tournament_teams"
        )
        .update({

          display_order:
            i + 1,

        })
        .eq(
          "id",
          sorted[i].id
        )

    }

  }

  const handleSave = async (
    entry: any
  ) => {

    const robustness =
      Number(
        entry.player1_fargo || 0
      ) +
      Number(
        entry.player2_fargo || 0
      )

    const {
      error,
    } = await supabase
      .from("tournament_teams")
      .update({

        player1_name:
          entry.player1_name,

        player2_name:
          entry.player2_name,

        player1_fargo:
          Number(
            entry.player1_fargo
          ),

        player2_fargo:
          Number(
            entry.player2_fargo
          ),

        robustness,

      })
      .eq(
        "id",
        entry.id
      )

    if (error) {

      alert(error.message)

      return

    }

    await fetchEntries()

    alert(
      "Team updated!"
    )

  }

  const handleDelete = async (
    entryId: number
  ) => {

    const confirmed =
      confirm(
        "Delete this team?"
      )

    if (!confirmed) return

    const {
      error,
    } = await supabase
      .from("tournament_teams")
      .delete()
      .eq(
        "id",
        entryId
      )

    if (error) {

      alert(error.message)

      return

    }

    fetchEntries()

  }

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex flex-col">

        <Header />

        <div className="flex-1 flex items-center justify-center">

          <p className="text-zinc-500 font-bold">
            Loading Teams...
          </p>

        </div>

        <Footer />

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-black text-white flex flex-col">

      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-orange-400 uppercase tracking-[0.3em] text-xs font-black mb-3">
            AUCTION TEAM MANAGEMENT
          </p>

          <h1 className="text-5xl font-black">

            {auctionName ||
              "Auction Teams"}

          </h1>

          <p className="text-zinc-500 mt-3">
            Manage live tournament auction teams.
          </p>

        </div>

        {/* ACTIONS */}

        <AuctionActions
          sortMode={sortMode}
          onAddTeam={() =>
            setShowAddModal(true)
          }
          onSort={handleSort}
        />

        {/* TABLE */}

        <AuctionTable
          entries={entries}
          onEntriesChange={
            setEntries
          }
          onSave={handleSave}
          onDelete={handleDelete}
        />

      </main>

      {/* ADD TEAM MODAL */}

      <AddTeamModal
        open={showAddModal}
        tournamentId={
          tournamentId
        }
        currentCount={
          entries.length
        }
        onClose={() =>
          setShowAddModal(false)
        }
        onCreated={fetchEntries}
      />

      <Footer />

    </div>

  )

}