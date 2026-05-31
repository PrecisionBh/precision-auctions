"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"

type Message = {
  id: string
  username: string
  message: string
}

type Props = {
  auctionId: string
}

export default function LiveAuctionChat({
  auctionId,
}: Props) {

  const [
    messages,
    setMessages,
  ] = useState<Message[]>([])

  const [
  isOpen,
  setIsOpen,
] = useState(false)

  const [
    loading,
    setLoading,
  ] = useState(false)

  useEffect(() => {

    if (!auctionId)
      return

    fetchMessages()

    const channel =
      supabase
        .channel(
          `chat-${auctionId}`
        )

        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table:
              "auction_chat_messages",
            filter:
              `auction_id=eq.${auctionId}`,
          },
          (payload) => {

            const message =
              payload.new as Message

            setMessages(
              (prev) => [
                ...prev,
                message,
              ]
            )

          }
        )

        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )

    }

  }, [auctionId])

  const fetchMessages =
    async () => {

      const {
        data,
        error,
      } =
        await supabase
          .from(
            "auction_chat_messages"
          )
          .select(
            `
            id,
            username,
            message
          `
          )
          .eq(
            "auction_id",
            auctionId
          )
          .order(
            "created_at",
            {
              ascending: true,
            }
          )

      if (error) {

        console.error(
          error
        )

        return

      }

      setMessages(
        data || []
      )

    }

  const handleSend =
    async (
      message: string
    ) => {

      try {

        setLoading(true)

        const {
          data: { user },
        } =
          await supabase.auth.getUser()

        if (!user)
          return

        const {
          data: profile,
        } =
          await supabase
            .from(
              "profiles"
            )
            .select(
              "username"
            )
            .eq(
              "id",
              user.id
            )
            .single()

        const {
          error,
        } =
          await supabase
            .from(
              "auction_chat_messages"
            )
            .insert({

              auction_id:
                auctionId,

              user_id:
                user.id,

              username:
                profile
                  ?.username ||
                "Anonymous",

              message,

            })

        if (error)
          throw error

      } catch (err) {

        console.error(
          err
        )

      } finally {

        setLoading(false)

      }

    }

 return (

  <div className="fixed bottom-6 right-6 z-50">

    {!isOpen ? (

      <button
        onClick={() =>
          setIsOpen(true)
        }
        className="rounded-full bg-orange-500 px-6 py-4 font-black text-white shadow-[0_0_25px_rgba(249,115,22,0.35)] transition hover:bg-orange-400"
      >

        💬 Live Chat

      </button>

    ) : (

      <div className="w-[380px] overflow-hidden rounded-[28px] border border-orange-500/20 bg-zinc-950 shadow-[0_0_40px_rgba(249,115,22,0.15)]">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/70 px-5 py-4">

          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-orange-400">

            Live Auction Chat

          </p>

          <button
            onClick={() =>
              setIsOpen(false)
            }
            className="text-xl font-black text-orange-400 hover:text-orange-300"
          >

            —

          </button>

        </div>

        <ChatMessages
          messages={messages}
        />

        <ChatInput
          onSend={
            handleSend
          }
          loading={
            loading
          }
        />

      </div>

    )}

  </div>

)
}