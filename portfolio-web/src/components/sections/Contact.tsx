import { FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

export function Contact() {
  const { data } = usePortfolio()
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('fail')
      setStatus('ok')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('err')
    }
  }

  return (
    <section id="contact" className="section-pad py-24 md:py-32 border-t rule">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-mono text-xs tracking-[0.28em] uppercase text-mute mb-4">Contact</p>
        <h2 className="font-display text-[12vw] md:text-[6.5vw] leading-[0.85] text-paper mb-4">
          LET&apos;S BUILD
        </h2>
        <p className="text-mute max-w-md mb-12">
          Open to FDE / AI engineering conversations. Reach out — I read every message.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-14">
        <form onSubmit={onSubmit} className="space-y-5">
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-widest text-mute">Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-paper/20 py-3 text-paper placeholder:text-mute/50 focus:border-accent outline-none transition"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-widest text-mute">Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-paper/20 py-3 text-paper placeholder:text-mute/50 focus:border-accent outline-none transition"
              placeholder="you@company.com"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-widest text-mute">Message</span>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-paper/20 py-3 text-paper placeholder:text-mute/50 focus:border-accent outline-none transition resize-none"
              placeholder="What are we building?"
            />
          </label>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="min-h-11 px-8 py-3 bg-accent text-ink font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'ok' && <p className="text-accent text-sm">Sent — I&apos;ll get back to you.</p>}
          {status === 'err' && (
            <p className="text-hot text-sm">
              Couldn&apos;t send. Email me at{' '}
              <a className="underline" href={`mailto:${data.email}`}>
                {data.email}
              </a>
            </p>
          )}
        </form>

        <div className="space-y-6 text-sm">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-mute mb-2">Email</p>
            <a href={`mailto:${data.email}`} className="text-paper text-lg hover:text-accent transition">
              {data.email}
            </a>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-mute mb-2">Location</p>
            <p className="text-paper/70">{data.location}</p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/70 hover:text-accent transition underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={data.github.startsWith('http') ? data.github : `https://${data.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/70 hover:text-accent transition underline-offset-4 hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
