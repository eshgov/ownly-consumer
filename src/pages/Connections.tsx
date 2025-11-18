import { useMemo, useState } from 'react'
import { useAppState } from '../lib/state'
import AppConnectionCard from '../components/AppConnectionCard'
import ConnectModal from '../components/ConnectModal'
import { useToast } from '../components/Toast'

type Filter = 'all' | 'connected' | 'disconnected'

export default function Connections() {
  const { state, connectApp } = useAppState()
  const { disconnectApp } = useAppState()
  const { show } = useToast()
  const [filter, setFilter] = useState<Filter>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return state.apps
    return state.apps.filter(a => a.status === filter)
  }, [state.apps, filter])

  const selected = state.apps.find(a => a.id === selectedId)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Connections</h1>
        <p className="text-slate-600">Control which apps share data with Ownly and how much they’ve earned you.</p>
      </div>

      <div className="flex gap-2">
        <button className={`pill ${filter==='all' ? 'border-primary text-primary' : ''}`} onClick={()=>setFilter('all')}>All</button>
        <button className={`pill ${filter==='connected' ? 'border-primary text-primary' : ''}`} onClick={()=>setFilter('connected')}>Connected</button>
        <button className={`pill ${filter==='disconnected' ? 'border-primary text-primary' : ''}`} onClick={()=>setFilter('disconnected')}>Not connected</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(app => (
          <AppConnectionCard
            key={app.id}
            app={app}
            onConnect={(id)=>{ setSelectedId(id); setModalOpen(true) }}
            onManage={(id)=>{ 
              const target = state.apps.find(a=>a.id===id)
              if (target?.status === 'connected') {
                if (confirm(`Disconnect ${target.name}?`)) { disconnectApp(id); show(`${target.name} disconnected`) }
              }
            }}
          />
        ))}
      </div>

      <ConnectModal
        open={modalOpen}
        app={selected}
        onClose={()=>setModalOpen(false)}
        onAuthorize={()=>{
          if (selected) {
            connectApp(selected.id)
            show(`${selected.name} connected. You’ll start earning from this data.`)
          }
          setModalOpen(false)
        }}
      />
    </div>
  )
}
