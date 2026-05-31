"use client"

import { useState } from "react"
import Link from "next/link"

import { supabase } from "@/lib/supabase"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AuthModal({
  open,
  onClose,
}: Props) {

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    if (loading) return

    try {

      setLoading(true)

      const {
  data,
  error,
} = await supabase.auth.signInWithPassword({

  email,
  password,

})

console.log("LOGIN DATA:", data)
console.log("LOGIN ERROR:", error)

      if (error) {

        alert(error.message)

        return
      }

      window.location.reload()

    } catch (err) {

      console.error(err)

      alert(
        "Something went wrong."
      )

    } finally {

      setLoading(false)

    }

  }

  if (!open) return null

  return (

    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center px-4">

      {/* ORANGE GLOW */}

      <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full" />

      {/* MODAL */}

      <div className="relative w-full max-w-md bg-zinc-900/75 backdrop-blur-2xl border border-orange-500/20 rounded-[32px] p-6 sm:p-8 shadow-[0_0_60px_rgba(249,115,22,0.25)]">

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition text-xl"
        >
          ✕
        </button>

        {/* HEADER */}

        <div className="mb-8 text-center">

          <div className="flex items-center justify-center gap-3 mb-5">

            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

            <span className="text-orange-400 uppercase tracking-[0.3em] text-xs font-black">
              LIVE ACCESS
            </span>

          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Welcome Back
          </h2>

          <p className="text-zinc-400 mt-4 leading-relaxed text-sm sm:text-base">
            Login to access live calcuttas,
            bidding, watchlists, and tournament action.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-orange-500 transition placeholder:text-zinc-600"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 pr-20 text-white outline-none focus:border-orange-500 transition placeholder:text-zinc-600"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-orange-400 hover:text-orange-300 transition font-semibold"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-2xl font-black text-white text-lg shadow-[0_0_35px_rgba(249,115,22,0.45)] disabled:opacity-50"
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

          {/* LINKS */}

          <div className="flex items-center justify-between pt-2">

            <Link
              href="/forgot-password"
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              Forgot Password?
            </Link>

            <Link
              href="/register"
              className="text-sm text-orange-400 hover:text-orange-300 transition font-bold"
            >
              Create Account
            </Link>

          </div>

        </form>

      </div>

    </div>

  )

}