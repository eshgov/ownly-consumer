export default function EarningsCard({ total, thisMonth, connectedAppsCount, lastPayout }: { total: number; thisMonth: number; connectedAppsCount: number; lastPayout?: string }) {
  return (
    <div className="container-card p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-sm text-slate-600">All-time earnings</div>
          <div className="text-3xl font-semibold">${total.toFixed(2)}</div>
        </div>
        <div className="pill">This month: ${thisMonth.toFixed(2)}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="text-slate-600 text-sm">Connected apps</div>
          <div className="text-lg font-medium">{connectedAppsCount}</div>
        </div>
        <div>
          <div className="text-slate-600 text-sm">Last payout</div>
          <div className="text-lg font-medium">{lastPayout ? new Date(lastPayout).toLocaleString() : '—'}</div>
        </div>
      </div>
    </div>
  )
}
