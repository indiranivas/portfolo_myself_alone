import { FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import { externalUrl } from '../../utils/urls'
import { submitContact } from '../../utils/contactForm'

const fieldClass =
  'mt-2 w-full bg-transparent border-b border-paper/20 py-3 text-paper placeholder:text-mute/40 focus:border-accent outline-none transition'

export function Contact() {
  const { data } = usePortfolio()
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitContact({
        ...form,
        subject: 'Portfolio inquiry',
      })
      setStatus('ok')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('err')
    }
  }

  return (
    <section id="contact" className="section-pad py-24 md:py-32 border-t rule">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs tracking-[0.28em] uppercase text-mute mb-4">Contact</p>
          <h2 className="font-display text-[12vw] md:text-[6.5vw] leading-[0.85] text-paper">
            LET&apos;S <span className="text-accent">BUILD</span>
          </h2>
        </motion.div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-mute max-w-sm text-sm md:text-base"
        >
          Open to FDE / AI engineering conversations. Reach out — I read every message.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-paper/10 p-6 md:p-10 hover:border-accent/30 transition-colors"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-8">
            01 · Send a message
          </p>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="subject" value="Portfolio inquiry" />
            <p className="hidden" aria-hidden="true">
              <label>
                Don&apos;t fill this out
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Name</span>
              <input
                required
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={fieldClass}
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={fieldClass}
                placeholder="you@company.com"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Message</span>
              <textarea
                required
                name="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${fieldClass} resize-none`}
                placeholder="What are we building?"
              />
            </label>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="min-h-11 px-10 py-3 bg-accent text-ink font-display text-lg tracking-[0.12em] uppercase hover:opacity-90 disabled:opacity-50 transition"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              {status === 'ok' && (
                <p className="font-mono text-xs text-accent tracking-wide">
                  Sent — I&apos;ll get back to you soon.
                </p>
              )}
            </div>

            {status === 'err' && (
              <div className="border border-hot/40 bg-hot/5 px-4 py-3">
                <p className="text-hot text-sm">
                  Couldn&apos;t send right now. Email me directly at{' '}
                  <a className="underline underline-offset-4" href={`mailto:${data.email}`}>
                    {data.email}
                  </a>
                </p>
              </div>
            )}
          </form>
        </motion.div>

        <motion.aside
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="border border-paper/10 bg-surface/60 p-6 md:p-10 flex flex-col justify-between gap-10"
        >
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-8">
              02 · Direct lines
            </p>
            <div className="space-y-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute mb-2">Email</p>
                <a
                  href={`mailto:${data.email}`}
                  className="text-paper text-xl md:text-2xl hover:text-accent transition break-all"
                >
                  {data.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute mb-2">Location</p>
                <p className="text-paper/75 text-lg">{data.location}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-paper/10 pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute mb-4">Elsewhere</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="chip hover:border-accent hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={externalUrl(data.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="chip hover:border-accent hover:text-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
