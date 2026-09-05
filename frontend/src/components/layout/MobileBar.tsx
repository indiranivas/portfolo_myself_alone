import { useLayout } from '../../context/LayoutContext'

export function MobileBar() {
  const { tab, setTab, openContact } = useLayout()

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200 px-4 py-3 flex items-center justify-between gap-2">
      <div className="flex gap-1">
        {(['profile', 'portfolio'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3.5 py-2 rounded-full text-xs font-medium capitalize ${
              tab === t ? 'bg-neutral-900 text-white' : 'text-neutral-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <button
        onClick={openContact}
        className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-medium"
      >
        Message
      </button>
    </div>
  )
}
