import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type ContactMessage } from '../api/client'

export function CmsMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [replySubject, setReplySubject] = useState('')
  const [replyBody, setReplyBody] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getMessages()
      setMessages(data)
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openReply = (msg: ContactMessage) => {
    setSelected(msg)
    setReplySubject(`Re: ${msg.subject}`)
    setReplyBody('')
  }

  const sendReply = async () => {
    if (!selected) return
    try {
      await api.replyMessage(selected.id, replySubject, replyBody)
      setStatus('Reply sent via email')
      setSelected(null)
      await load()
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Failed to send reply')
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Contact Messages</h1>
        <div className="flex gap-3">
          <Link to="/cms" className="text-sm text-primary hover:underline">← CMS Dashboard</Link>
          <Link to="/" className="text-sm text-slate-500 hover:underline">View Site</Link>
        </div>
      </header>

      {status && (
        <div className="mx-6 mt-4 px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm">{status}</div>
      )}

      <div className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <p className="text-slate-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-500">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="glass-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{msg.name} <span className="text-slate-500 font-normal">&lt;{msg.email}&gt;</span></p>
                    <p className="text-sm text-primary mt-1">{msg.subject}</p>
                    <p className="text-xs text-slate-500 mt-1">{new Date(msg.timestamp).toLocaleString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${msg.replied ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600'}`}>
                    {msg.replied ? 'Replied' : 'New'}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{msg.message}</p>
                {msg.reply_content && (
                  <div className="mt-3 p-3 rounded-lg bg-primary/5 text-sm">
                    <p className="text-xs text-slate-500 mb-1">Your reply ({msg.reply_timestamp ? new Date(msg.reply_timestamp).toLocaleString() : ''})</p>
                    {msg.reply_content}
                  </div>
                )}
                {!msg.replied && (
                  <button onClick={() => openReply(msg)} className="mt-3 text-sm text-primary hover:underline">
                    Reply via Email
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="glass-card p-6 w-full max-w-lg space-y-4">
            <h3 className="font-semibold">Reply to {selected.name}</h3>
            <input
              className="w-full px-3 py-2 rounded-lg glass border border-white/10 text-sm"
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
            />
            <textarea
              rows={5}
              className="w-full px-3 py-2 rounded-lg glass border border-white/10 text-sm resize-none"
              placeholder="Your reply..."
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
            />
            <div className="flex gap-2">
              <button onClick={sendReply} className="px-4 py-2 rounded-lg bg-primary text-white text-sm">Send Reply</button>
              <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg glass text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
