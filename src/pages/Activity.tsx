import { useMemo, useState } from 'react'
import { useAppState } from '../lib/state'
import ActivityItem from '../components/ActivityItem'

type Filter = 'all' | 'earning' | 'connection'

export default function Activity() {
  const { state } = useAppState()
  const [filter, setFilter] = useState<Filter>('all')
  const items = useMemo(() => {
    if (filter === 'all') return state.activity
    return state.activity.filter(a => a.type === filter)
  }, [state.activity, filter])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Activity</h1>
      <div className="flex gap-2">
        <button className={`pill ${filter==='all' ? 'border-primary text-primary' : ''}`} onClick={()=>setFilter('all')}>All</button>
        <button className={`pill ${filter==='earning' ? 'border-primary text-primary' : ''}`} onClick={()=>setFilter('earning')}>Earnings</button>
        <button className={`pill ${filter==='connection' ? 'border-primary text-primary' : ''}`} onClick={()=>setFilter('connection')}>Connections</button>
      </div>
      <div className="container-card p-0">
        {items.length === 0 && <div className="p-6 text-sm text-slate-600">No activity yet</div>}
        {items.map(a => (
          <div key={a.id} className="px-6">
            <ActivityItem title={a.title} subtitle={a.subtitle} timestamp={a.timestamp} />
          </div>
        ))}
      </div>
    </div>
  )
}
