"use client"

import { useState } from "react"

import { supabase } from "@/lib/supabase"

type Props = {
  open: boolean

  tournamentId: string

  currentCount: number

  onClose: () => void

  onCreated: () => void
}

export default function AddTeamModal({
  open,
  tournamentId,
  currentCount,
  onClose,
  onCreated,
}: Props) {

  const [loading, setLoading] =
    useState(false)

  const [newTeam, setNewTeam] =
    useState({

      player1_name: "",
      player1_fargo: "",
      player1_phone: "",

      player2_name: "",
      player2_fargo: "",

    })

  if (!open) return null

  const handleAddTeam = async () => {

    if (
      !newTeam.player1_name ||
      !newTeam.player2_name
    ) {

      alert(
        "Please enter both player names."
      )

      return

    }

    try {

      setLoading(true)

      const player1Fargo =
        Number(
          newTeam.player1_fargo || 0
        )

      const player2Fargo =
        Number(
          newTeam.player2_fargo || 0
        )

      const robustness =
        player1Fargo +
        player2Fargo

      const {
        error,
      } = await supabase
        .from("tournament_teams")
        .insert({

          tournament_id:
            tournamentId,

          player1_name:
            newTeam.player1_name,

          player1_fargo:
            player1Fargo,

          player1_phone:
            newTeam.player1_phone,

          player2_name:
            newTeam.player2_name,

          player2_fargo:
            player2Fargo,

          robustness,

          status:
            "registered",

          registration_paid:
            true,

          entry_paid:
            false,

          display_order:
            currentCount + 1,

        })

      if (error) {

        alert(error.message)

        return

      }

      setNewTeam({

        player1_name: "",
        player1_fargo: "",
        player1_phone: "",

        player2_name: "",
        player2_fargo: "",

      })

      onCreated()

      onClose()

    } catch (err) {

      console.error(err)

      alert(
        "Something went wrong."
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative">

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition"
        >
          ✕
        </button>

        {/* HEADER */}

        <div className="mb-8 text-center">

          <p className="text-orange-400 uppercase tracking-[0.3em] text-xs font-black mb-3">
            ADD TEAM
          </p>

          <h2 className="text-4xl font-black text-white">
            Add Auction Team
          </h2>

        </div>

        {/* FORM */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PLAYER 1 */}

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Player 1 Name"
              value={
                newTeam.player1_name
              }
              onChange={(e) =>
                setNewTeam({
                  ...newTeam,
                  player1_name:
                    e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white font-bold outline-none focus:border-orange-500"
            />

            <input
              type="number"
              placeholder="Player 1 Fargo"
              value={
                newTeam.player1_fargo
              }
              onChange={(e) =>
                setNewTeam({
                  ...newTeam,
                  player1_fargo:
                    e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white font-bold outline-none focus:border-orange-500"
            />

          </div>

          {/* PLAYER 2 */}

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Player 2 Name"
              value={
                newTeam.player2_name
              }
              onChange={(e) =>
                setNewTeam({
                  ...newTeam,
                  player2_name:
                    e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white font-bold outline-none focus:border-orange-500"
            />

            <input
              type="number"
              placeholder="Player 2 Fargo"
              value={
                newTeam.player2_fargo
              }
              onChange={(e) =>
                setNewTeam({
                  ...newTeam,
                  player2_fargo:
                    e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white font-bold outline-none focus:border-orange-500"
            />

          </div>

        </div>

        {/* PHONE */}

        <div className="mt-6 flex justify-center">

          <input
            type="text"
            placeholder="Player 1 Phone Number"
            value={
              newTeam.player1_phone
            }
            onChange={(e) =>
              setNewTeam({
                ...newTeam,
                player1_phone:
                  e.target.value,
              })
            }
            className="w-full max-w-md bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white font-bold outline-none focus:border-orange-500 text-center"
          />

        </div>

        {/* FOOTER */}

        <div className="flex justify-end mt-8">

          <button
            onClick={handleAddTeam}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition px-8 py-4 rounded-2xl font-black text-white shadow-[0_0_35px_rgba(249,115,22,0.45)]"
          >

            {loading
              ? "Saving..."
              : "Save Team"}

          </button>

        </div>

      </div>

    </div>

  )

}