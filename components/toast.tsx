"use client"

import { useEffect } from "react"

type Props = {
  show: boolean
  title: string
  message?: string
  type?: "success" | "error" | "warning"
  onClose: () => void
}

export default function Toast({
  show,
  title,
  message,
  type = "success",
  onClose,
}: Props) {

  useEffect(() => {

    if (!show) return

    const timer =
      setTimeout(
        onClose,
        3000
      )

    return () =>
      clearTimeout(timer)

  }, [show, onClose])

  if (!show) return null

  const colors = {

    success: {
      border:
        "border-orange-500/30",
      bg:
        "bg-orange-500/5",
      text:
        "text-orange-400",
    },

    error: {
      border:
        "border-red-500/30",
      bg:
        "bg-red-500/5",
      text:
        "text-red-400",
    },

    warning: {
      border:
        "border-yellow-500/30",
      bg:
        "bg-yellow-500/5",
      text:
        "text-yellow-400",
    },

  }

  const style =
    colors[type]

  return (

    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-top-4 duration-300">

      <div
        className={`min-w-[320px] rounded-2xl border backdrop-blur-xl px-5 py-4 shadow-2xl ${style.border} ${style.bg}`}
      >

        <h3
          className={`font-black text-lg ${style.text}`}
        >
          {title}
        </h3>

        {message && (

          <p className="mt-1 text-sm text-zinc-300">

            {message}

          </p>

        )}

      </div>

    </div>

  )

}