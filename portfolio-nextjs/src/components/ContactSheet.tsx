"use client"

import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Mail, Calendar, Linkedin, Github, Twitter, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export type ContactSheetProps = {
  isOpen: boolean
  onClose: () => void
}

// Accessible focus trap (very light)
function useFocusTrap(enabled: boolean, containerRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!enabled) return
    const el = containerRef.current
    if (!el) return

    const focusable = el.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      if (focusable.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          ;(last as HTMLElement)?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          ;(first as HTMLElement)?.focus()
        }
      }
    }

    el.addEventListener("keydown", handler)
    ;(first as HTMLElement)?.focus()
    return () => el.removeEventListener("keydown", handler)
  }, [enabled, containerRef])
}

const Backdrop = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    aria-hidden
    className="fixed inset-0 z-40 bg-black/70 dark:bg-black/80 backdrop-blur-xl"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  />
)

const ContactSheet: React.FC<ContactSheetProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<"quick" | "form">("quick")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const panelRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setStatus("success")
      e.currentTarget.reset()
    } catch (err: any) {
      setStatus("error")
      setErrorMsg(err?.message || "Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // body scroll lock
  useEffect(() => {
    if (!mounted) return
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, mounted])

  // close on ESC
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  useFocusTrap(isOpen, panelRef)

  if (!mounted) return null

  const portalTarget = document.body

  const QuickConnect = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Email card */}
      <motion.a
        href="mailto:amrkhaaled.eng12@gmail.com"
        className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-5 md:p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-lg"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div 
            className="h-10 w-10 rounded-xl bg-black dark:bg-white grid place-items-center border border-black/10 dark:border-white/10"
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="w-5 h-5 text-white dark:text-black" />
          </motion.div>
          <div className="text-black dark:text-white text-lg font-semibold">Email</div>
        </div>
        <div className="text-black dark:text-white font-medium">amrkhaaled.eng12@gmail.com</div>
        <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">Send me a direct email</div>
      </motion.a>

      {/* Book a Call card */}
      <motion.a
        href="mailto:amrkhaaled.eng12@gmail.com"
        className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-5 md:p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-lg"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div 
            className="h-10 w-10 rounded-xl bg-black dark:bg-white grid place-items-center border border-black/10 dark:border-white/10"
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
          >
            <Calendar className="w-5 h-5 text-white dark:text-black" />
          </motion.div>
          <div className="text-black dark:text-white text-lg font-semibold">Book a Call</div>
        </div>
        <div className="text-black dark:text-white font-medium">Schedule a time slot</div>
        <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">Schedule a call on my calendar</div>
      </motion.a>

      {/* Availability banner */}
      <motion.div 
        className="md:col-span-2 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-gray-900 text-black dark:text-white px-4 py-3 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <motion.span 
          className="inline-block w-2.5 h-2.5 rounded-full bg-green-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        Currently available for new projects and opportunities
      </motion.div>
    </div>
  )

  const Form = (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {status === "success" && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMsg}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input name="name" required disabled={status === "sending"} className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input type="email" name="email" required disabled={status === "sending"} className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Subject</label>
        <input name="subject" disabled={status === "sending"} className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50" placeholder="What’s this about?" />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Message</label>
        <textarea name="message" required rows={5} disabled={status === "sending"} className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50" placeholder="Tell me about your project..." />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} disabled={status === "sending"} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50">Cancel</button>
        <button type="submit" disabled={status === "sending"} className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed">
          {status === "sending" ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  )

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div aria-modal="true" role="dialog" aria-label="Contact options">
          <Backdrop onClick={onClose} />

          {/* Bottom sheet panel */}
          <motion.div
            ref={panelRef}
            className="fixed inset-x-0 bottom-0 z-50"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="mx-auto max-w-2xl">
              <div className="mx-4 mb-4 rounded-3xl border border-gray-200 bg-white backdrop-blur-xl p-5 md:p-6 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
                {/* drag handle + close */}
                <div className="flex items-center justify-center relative mb-4">
                  <div className="h-1.5 w-16 rounded-full bg-gray-300" />
                  <button aria-label="Close" onClick={onClose} className="absolute right-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-600 hover:text-black">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* top social icons */}
                <div className="flex items-center justify-center gap-6 text-gray-600 mb-5">
                  <a href="https://linkedin.com/in/amrkhaled" target="_blank" rel="noreferrer" className="hover:text-black"><Linkedin className="w-5 h-5" /></a>
                  <a href="https://github.com/amrkhaled" target="_blank" rel="noreferrer" className="hover:text-black"><Github className="w-5 h-5" /></a>
                  <a href="https://twitter.com/amrkhaled" target="_blank" rel="noreferrer" className="hover:text-black"><Twitter className="w-5 h-5" /></a>
                </div>

                {/* segmented tabs */}
                <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-2xl p-1 mb-5">
                  <button
                    onClick={() => setTab("quick")}
                    className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${tab === "quick" ? "bg-white text-black shadow-sm" : "text-gray-600"}`}
                  >
                    Quick connect
                  </button>
                  <button
                    onClick={() => setTab("form")}
                    className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${tab === "form" ? "bg-white text-black shadow-sm" : "text-gray-600"}`}
                  >
                    Fill a form
                  </button>
                </div>

                {tab === "quick" ? QuickConnect : Form}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalTarget
  )
}

export default ContactSheet