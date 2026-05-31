"use client"

type Props = {
  username: string
  message: string
}

export default function ChatMessage({
  username,
  message,
}: Props) {

  return (

    <div className="rounded-2xl border border-zinc-800 bg-black/60 px-4 py-3">

      <p className="text-xs font-black text-orange-400">

        {username}

      </p>

      <p className="mt-1 text-sm text-zinc-200 break-words">

        {message}

      </p>

    </div>

  )

}