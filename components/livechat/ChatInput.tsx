"use client"

import { useState } from "react"

type Props = {
  onSend: (
    message: string
  ) => void

  loading?: boolean
}

export default function ChatInput({
  onSend,
  loading = false,
}: Props) {

  const [
    message,
    setMessage,
  ] = useState("")

  const handleSend =
    () => {

      const trimmed =
        message.trim()

      if (!trimmed)
        return

      onSend(trimmed)

      setMessage("")

    }

  return (

    <div className="border-t border-zinc-800 bg-zinc-900/70 p-4">

      <div className="flex gap-3">

        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              handleSend()

            }

          }}
          placeholder="Talk some trash..."
          className="flex-1 rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-orange-500"
        />

        <button
          onClick={
            handleSend
          }
          disabled={
            loading
          }
          className="rounded-2xl bg-orange-500 px-5 font-black text-white transition hover:bg-orange-400 disabled:opacity-50"
        >

          Send

        </button>

      </div>

    </div>

  )

}