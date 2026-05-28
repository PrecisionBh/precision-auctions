"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { supabase } from "@/lib/supabase"

export default function RegisterPage() {

  const router = useRouter()

  const [firstName, setFirstName] =
    useState("")

  const [lastName, setLastName] =
    useState("")

  const [username, setUsername] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [phoneNumber, setPhoneNumber] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password
    ) {

      alert(
        "Please fill out all required fields."
      )

      return
    }

    if (password !== confirmPassword) {

      alert(
        "Passwords do not match."
      )

      return
    }

    try {

      setLoading(true)

      const {
        data,
        error,
      } = await supabase.auth.signUp({

        email,
        password,

      })

      if (error) {

        alert(error.message)

        return
      }

      const user =
        data.user

        console.log(
  "AUTH USER:",
  user
)

      if (!user) {

        alert(
          "User creation failed."
        )

        return
      }

      const {
  error: profileError,
  data: profileData,
} = await supabase
  .from("profiles")
  .insert({

    id: user.id,

    first_name:
      firstName,

    last_name:
      lastName,

    username,

    email,

    phone_number:
      phoneNumber || null,

  })
  .select()

console.log(
  "PROFILE INSERT DATA:",
  profileData
)

console.log(
  "PROFILE INSERT ERROR:",
  profileError
)

      if (profileError) {

        alert(
          profileError.message
        )

        return
      }

      alert(
        "Account created successfully!"
      )

      router.push("/")

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

    <div className="relative min-h-screen overflow-hidden bg-black text-white flex flex-col">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[140px]" />

      </div>

      <Header />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:py-20">

        <div className="w-full max-w-md rounded-[32px] border border-orange-500/20 bg-zinc-900/75 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(249,115,22,0.25)]">

          {/* TOP */}

          <div className="mb-8 text-center">

            <div className="flex items-center justify-center gap-3 mb-5">

              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

              <span className="text-orange-400 uppercase tracking-[0.3em] text-xs font-black">
                LIVE ACCESS
              </span>

            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              Create Account
            </h1>

            <p className="text-zinc-400 mt-4 leading-relaxed text-sm sm:text-base">
              Join Precision Auctions and access
              live pool calcuttas and tournament action.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* FIRST NAME */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                First Name <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
                placeholder="Enter first name"
                className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white placeholder:text-zinc-600"
              />

            </div>

            {/* LAST NAME */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Last Name <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
                placeholder="Enter last name"
                className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white placeholder:text-zinc-600"
              />

            </div>

            {/* USERNAME */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Username <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                placeholder="Create username"
                className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white placeholder:text-zinc-600"
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Email <span className="text-red-400">*</span>
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Enter email"
                className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white placeholder:text-zinc-600"
              />

            </div>

            {/* PHONE */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Phone Number
                <span className="text-zinc-600 ml-2 text-xs">
                  Optional
                </span>
              </label>

              <input
                type="text"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(
                    e.target.value
                  )
                }
                placeholder="Enter phone number"
                className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition text-white placeholder:text-zinc-600"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Password <span className="text-red-400">*</span>
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
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Create password"
                  className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-5 py-4 pr-20 outline-none focus:border-orange-500 transition text-white placeholder:text-zinc-600"
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

            {/* CONFIRM PASSWORD */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
                className={`w-full bg-black/60 border rounded-2xl px-5 py-4 outline-none transition text-white placeholder:text-zinc-600 ${
                  confirmPassword.length > 0
                    ? confirmPassword === password
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-zinc-700 focus:border-orange-500"
                }`}
              />

              {confirmPassword.length > 0 && (

                <p
                  className={`text-sm mt-2 ${
                    confirmPassword === password
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >

                  {confirmPassword === password
                    ? "Passwords match"
                    : "Passwords do not match"}

                </p>

              )}

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-2xl font-black text-lg shadow-[0_0_35px_rgba(249,115,22,0.45)] disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* LOGIN LINK */}

            <div className="text-center pt-2">

              <p className="text-zinc-400 text-sm">

                Already have an account?{" "}

                <Link
                  href="/"
                  className="text-orange-400 hover:text-orange-300 transition font-bold"
                >
                  Login
                </Link>

              </p>

            </div>

          </form>

        </div>

      </main>

      <Footer />

    </div>

  )

}