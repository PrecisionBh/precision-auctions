"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

type Props = {
  onLoginClick?: () => void
}

export default function Header({
  onLoginClick,
}: Props) {

  const [user, setUser] =
    useState<any>(null)

  const [profile, setProfile] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    checkUser()

  }, [])

  const checkUser = async () => {

    try {

      const {
        data,
      } = await supabase.auth.getUser()

      if (data.user) {

        setUser(data.user)

        const {
          data: profileData,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()

        setProfile(profileData)

      }

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

    }

  }

  const handleLogout = async () => {

    await supabase.auth.signOut()

    window.location.reload()

  }

  return (

    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/20">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LEFT */}

        <Link href="/">

          <div className="cursor-pointer">

            <h1 className="text-2xl font-black tracking-[0.15em] text-white">

              PRECISION AUCTIONS

            </h1>

            <p className="text-xs text-zinc-500 uppercase tracking-[0.35em] mt-1 font-semibold">

              Live Pool Calcuttas

            </p>

          </div>

        </Link>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          {!loading && (

            <>

              {/* ADMIN */}

              {profile?.is_admin && (

                <Link href="/admin">

                  <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2.5 rounded-2xl text-sm font-black text-white shadow-[0_0_25px_rgba(249,115,22,0.35)]">

                    Admin

                  </button>

                </Link>

              )}

              {/* LOGGED OUT */}

              {!user && (

                <>

                  <button
                    onClick={onLoginClick}
                    className="border border-zinc-700 hover:border-zinc-500 transition px-5 py-2.5 rounded-2xl text-sm font-semibold text-white"
                  >
                    Login
                  </button>

                  <Link href="/register">

                    <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2.5 rounded-2xl text-sm font-black text-white">

                      Create Account

                    </button>

                  </Link>

                </>

              )}

              {/* LOGGED IN */}

              {user && (

                <>

                  <div className="hidden sm:flex items-center px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800">

                    <p className="text-sm text-zinc-300 font-bold">

                      {profile?.username || "User"}

                    </p>

                  </div>

                  <button
                    onClick={handleLogout}
                    className="border border-red-500/30 hover:border-red-400 hover:bg-red-500/10 transition px-5 py-2.5 rounded-2xl text-sm font-black text-red-300"
                  >
                    Logout
                  </button>

                </>

              )}

            </>

          )}

        </div>

      </div>

    </header>

  )

}