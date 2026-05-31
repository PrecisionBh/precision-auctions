"use client"

import {
  useEffect,
  useRef,
} from "react"

import ChatMessage from "./ChatMessage"

type Message = {
  id: string
  username: string
  message: string
}

type Props = {
  messages: Message[]
}

export default function ChatMessages({
  messages,
}: Props) {

  const bottomRef =
    useRef<HTMLDivElement>(
      null
    )

  useEffect(() => {

    bottomRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      })

  }, [messages])

  return (

    <div className="h-[400px] overflow-y-auto px-5 py-4 space-y-3">

      {messages.length === 0 ? (

        <div className="flex h-full items-center justify-center">

          <p className="text-sm text-zinc-500">

            No messages yet.
            Start the trash talk 😎

          </p>

        </div>

      ) : (

        <>

          {messages.map(
            (message) => (

              <ChatMessage
                key={message.id}
                username={
                  message.username
                }
                message={
                  message.message
                }
              />

            )
          )}

          <div
            ref={bottomRef}
          />

        </>

      )}

    </div>

  )

}