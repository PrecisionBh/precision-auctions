"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import AuctionList from "@/components/auction/AuctionList"

import { supabase } from "@/lib/supabase"

export default function EntriesPage() {

  const router = useRouter()

  const { id } = router.query

  const [loading, setLoading] =
    useState(true)

  const [auction, setAuction] =
    useState<any>(null)

  useEffect(() => {

    if (id) {

      fetchAuction()

    }

  }, [id])

  const fetchAuction = async () => {

    const {
      data,
      error,
    } = await supabase
      .from("auctions")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {

      console.error(error)

      return

    }

    setAuction(data)

    setLoading(false)

  }

  if (
    loading ||
    !auction
  ) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <p className="text-zinc-500">
          Loading Auction...
        </p>

      </div>

    )

  }

  return (

    <AuctionList
      tournamentId={
        auction.tournament_id
      }
      auctionName={
        auction.name
      }
    />

  )

}