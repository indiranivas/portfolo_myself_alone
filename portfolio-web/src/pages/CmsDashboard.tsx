import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { usePortfolio } from '../context/PortfolioContext'
import type { Award, Education, Experience, Project } from '../types/portfolio'

type Tab = 'personal' | 'skills' | 'experience' | 'projects' | 'education' | 'awards'

const tabs: { id: Tab; label: string }[] = [
  { id: 'personal', label: 'Personal' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full px-3 py-2 rounded-lg glass border border-white/10 focus:border-primary/50 focus:outline-none text-sm'

export function CmsDashboard() {
  const { logout, username } = useAuth()
  const { data, refresh } = usePortfolio()
  const [tab, setTab] = useState<Tab>('personal')
  const [status, setStatus] = useState('')
  const [personal, setPersonal] = useState({
    name: '', tagline: '', email: '', phone: '', location: '', linkedin: '', github: '',
  })

  useEffect(() => {
    setPersonal({
      name: data.name,
      tagline: data.tagline,
      email: data.email,
      phone: data.phone,
      location: data.location,
      linkedin: data.linkedin,
      github: data.github,
    })
  }, [data])

  const flash = (msg: string) => {
    setStatus(msg)
    setTimeout(() => setStatus(''), 3000)
  }

  const savePersonal = async () => {
    await api.updatePersonal(personal)
    await refresh()
    flash('Personal info saved')
  }

  const saveSkills = async (category: string, techStr: string) => {
    const tech = techStr.split(',').map((t) => t.trim()).filter(Boolean)
    await api.updateSkills(category, tech)
    await refresh()
    flash('Skills updated')
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Portfolio CMS</h1>
          <p className="text-xs text-slate-500">Logged in as {username}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/cms/messages" className="text-sm text-primary hover:underline">Messages</Link>
          <Link to="/" className="text-sm text-slate-500 hover:text-primary">View Site</Link>
          <button onClick={logout} className="text-sm px-3 py-1.5 rounded-lg glass">Logout</button>
        </div>
      </header>

      {status && (
        <div className="mx-6 mt-4 px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm">{status}</div>
      )}

      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">
        <nav className="flex md:flex-col gap-2 md:w-48 shrink-0 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                tab === t.id ? 'bg-primary text-white' : 'glass text-slate-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 glass-card p-6">
          {tab === 'personal' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              {Object.entries(personal).map(([key, val]) => (
                <Field key={key} label={key}>
                  <input
                    className={inputClass}
                    value={val}
                    onChange={(e) => setPersonal({ ...personal, [key]: e.target.value })}
                  />
                </Field>
              ))}
              <button onClick={savePersonal} className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium">
                Save
              </button>
            </div>
          )}

          {tab === 'skills' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Skills</h2>
              {Object.entries(data.skills).map(([key, cat]) => (
                <div key={key} className="border-b border-white/10 pb-4">
                  <p className="font-medium mb-1">{cat.title}</p>
                  <p className="text-xs text-slate-500 mb-2">{cat.description}</p>
                  <input
                    className={inputClass}
                    defaultValue={cat.tech.join(', ')}
                    id={`skill-${key}`}
                  />
                  <button
                    onClick={() => {
                      const el = document.getElementById(`skill-${key}`) as HTMLInputElement
                      saveSkills(key, el.value)
                    }}
                    className="mt-2 px-4 py-1.5 rounded-lg bg-primary text-white text-xs"
                  >
                    Update
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'experience' && (
            <CrudList<Experience>
              title="Experience"
              items={data.experience}
              emptyItem={{ role: '', company: '', period: '', location: '', description: [''], tech: [] }}
              renderFields={(item, set) => (
                <>
                  <Field label="Role"><input className={inputClass} value={item.role} onChange={(e) => set({ ...item, role: e.target.value })} /></Field>
                  <Field label="Company"><input className={inputClass} value={item.company} onChange={(e) => set({ ...item, company: e.target.value })} /></Field>
                  <Field label="Period"><input className={inputClass} value={item.period} onChange={(e) => set({ ...item, period: e.target.value })} /></Field>
                  <Field label="Location"><input className={inputClass} value={item.location} onChange={(e) => set({ ...item, location: e.target.value })} /></Field>
                  <Field label="Description (one per line)">
                    <textarea className={inputClass} rows={3} value={item.description.join('\n')} onChange={(e) => set({ ...item, description: e.target.value.split('\n') })} />
                  </Field>
                  <Field label="Tech (comma-separated)">
                    <input className={inputClass} value={item.tech.join(', ')} onChange={(e) => set({ ...item, tech: e.target.value.split(',').map((t) => t.trim()) })} />
                  </Field>
                </>
              )}
              onSave={(index, item) => api.saveExperience(index, item)}
              onDelete={(index) => api.deleteExperience(index)}
              onRefresh={refresh}
              flash={flash}
            />
          )}

          {tab === 'projects' && (
            <CrudList<Project>
              title="Projects"
              items={data.projects}
              emptyItem={{ name: '', description: '', impact: '', tech: [], link: '' }}
              renderFields={(item, set) => (
                <>
                  <Field label="Name"><input className={inputClass} value={item.name} onChange={(e) => set({ ...item, name: e.target.value })} /></Field>
                  <Field label="Description"><textarea className={inputClass} rows={2} value={item.description} onChange={(e) => set({ ...item, description: e.target.value })} /></Field>
                  <Field label="Impact"><textarea className={inputClass} rows={2} value={item.impact} onChange={(e) => set({ ...item, impact: e.target.value })} /></Field>
                  <Field label="Tech"><input className={inputClass} value={item.tech.join(', ')} onChange={(e) => set({ ...item, tech: e.target.value.split(',').map((t) => t.trim()) })} /></Field>
                  <Field label="Link"><input className={inputClass} value={item.link || ''} onChange={(e) => set({ ...item, link: e.target.value })} /></Field>
                </>
              )}
              onSave={(index, item) => api.saveProject(index, item)}
              onDelete={(index) => api.deleteProject(index)}
              onRefresh={refresh}
              flash={flash}
            />
          )}

          {tab === 'education' && (
            <CrudList<Education>
              title="Education"
              items={data.education}
              emptyItem={{ degree: '', institution: '', location: '', period: '', cgpa: '' }}
              renderFields={(item, set) => (
                <>
                  <Field label="Degree"><input className={inputClass} value={item.degree} onChange={(e) => set({ ...item, degree: e.target.value })} /></Field>
                  <Field label="Institution"><input className={inputClass} value={item.institution} onChange={(e) => set({ ...item, institution: e.target.value })} /></Field>
                  <Field label="Location"><input className={inputClass} value={item.location} onChange={(e) => set({ ...item, location: e.target.value })} /></Field>
                  <Field label="Period"><input className={inputClass} value={item.period} onChange={(e) => set({ ...item, period: e.target.value })} /></Field>
                  <Field label="CGPA"><input className={inputClass} value={item.cgpa} onChange={(e) => set({ ...item, cgpa: e.target.value })} /></Field>
                </>
              )}
              onSave={(index, item) => api.saveEducation(index, item)}
              onDelete={(index) => api.deleteEducation(index)}
              onRefresh={refresh}
              flash={flash}
            />
          )}

          {tab === 'awards' && (
            <CrudList<Award>
              title="Awards"
              items={data.awards}
              emptyItem={{ title: '', organization: '', date: '', description: '', score: '', tags: [] }}
              renderFields={(item, set) => (
                <>
                  <Field label="Title"><input className={inputClass} value={item.title} onChange={(e) => set({ ...item, title: e.target.value })} /></Field>
                  <Field label="Organization"><input className={inputClass} value={item.organization} onChange={(e) => set({ ...item, organization: e.target.value })} /></Field>
                  <Field label="Date"><input className={inputClass} value={item.date} onChange={(e) => set({ ...item, date: e.target.value })} /></Field>
                  <Field label="Description"><textarea className={inputClass} rows={2} value={item.description} onChange={(e) => set({ ...item, description: e.target.value })} /></Field>
                  <Field label="Score"><input className={inputClass} value={item.score || ''} onChange={(e) => set({ ...item, score: e.target.value })} /></Field>
                </>
              )}
              onSave={(index, item) => api.saveAward(index, item)}
              onDelete={(index) => api.deleteAward(index)}
              onRefresh={refresh}
              flash={flash}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function CrudList<T>({
  title,
  items,
  emptyItem,
  renderFields,
  onSave,
  onDelete,
  onRefresh,
  flash,
}: {
  title: string
  items: T[]
  emptyItem: T
  renderFields: (item: T, set: (item: T) => void) => React.ReactNode
  onSave: (index: number | null, item: T) => Promise<unknown>
  onDelete: (index: number) => Promise<unknown>
  onRefresh: () => Promise<void>
  flash: (msg: string) => void
}) {
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [draft, setDraft] = useState<T>(emptyItem)

  const startNew = () => {
    setDraft({ ...emptyItem })
    setEditing('new')
  }

  const startEdit = (index: number) => {
    setDraft({ ...items[index] })
    setEditing(index)
  }

  const save = async () => {
    const index = editing === 'new' ? null : editing
    await onSave(index, draft)
    await onRefresh()
    setEditing(null)
    flash(`${title} saved`)
  }

  const remove = async (index: number) => {
    if (!confirm('Delete this item?')) return
    await onDelete(index)
    await onRefresh()
    flash('Deleted')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={startNew} className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm">+ Add</button>
      </div>

      {editing !== null && (
        <div className="mb-6 p-4 rounded-xl border border-primary/30 space-y-3">
          {renderFields(draft, setDraft)}
          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="px-4 py-1.5 rounded-lg glass text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg glass">
            <span className="text-sm font-medium truncate">
              {(item as Record<string, string>).name || (item as Record<string, string>).title || (item as Record<string, string>).role || (item as Record<string, string>).degree || `Item ${i + 1}`}
            </span>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(i)} className="text-xs text-primary">Edit</button>
              <button onClick={() => remove(i)} className="text-xs text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
