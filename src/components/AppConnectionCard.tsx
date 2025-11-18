import { ConnectedApp } from '../lib/types'

export default function AppConnectionCard({ app, onConnect, onManage }: { app: ConnectedApp; onConnect: (id: string) => void; onManage: (id: string) => void }) {
  const initials = app.name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase()
  const statusClass = app.status === 'connected' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'
  return (
    <div className="container-card p-4 flex items-center justify-between hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700">{initials}</div>
        <div>
          <div className="font-medium text-slate-900">{app.name}</div>
          <div className="text-xs text-slate-600 capitalize">{app.category}</div>
          <div className={`mt-2 inline-flex items-center text-xs px-2 py-0.5 rounded-full border ${statusClass}`}>{app.status === 'connected' ? 'Connected' : 'Not Connected'}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-slate-600">Earned</div>
        <div className="font-semibold">${app.earnings.toFixed(2)}</div>
        <div className="text-xs text-slate-500">{app.status === 'connected' ? `Last synced ${app.lastSyncedAt ? new Date(app.lastSyncedAt).toLocaleString() : '—'}` : 'Not yet synced'}</div>
      </div>
      <div className="ml-4">
        {app.status === 'disconnected' ? (
          <button className="btn-primary" onClick={() => onConnect(app.id)}>Connect</button>
        ) : (
          <button className="btn-ghost" onClick={() => onManage(app.id)}>Manage</button>
        )}
      </div>
    </div>
  )
}
