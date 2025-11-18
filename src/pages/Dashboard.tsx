import { useMemo } from 'react'
import { useAppState } from '../lib/state'
import EarningsCard from '../components/EarningsCard'
import EarningsChart from '../components/EarningsChart'
import ActivityItem from '../components/ActivityItem'

export default function Dashboard() {
  const { state } = useAppState()
  const { user, earningsHistory, apps, activity } = state

  const thisMonth = useMemo(() => {
    return earningsHistory.reduce((sum, p) => sum + p.amount, 0)
  }, [earningsHistory])

  const connectedAppsCount = apps.filter(a => a.status === 'connected').length
  const lastPayout = state.payouts[0]?.timestamp
  const topApps = [...apps].sort((a, b) => b.earnings - a.earnings).slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-slate-600">Here’s how your data is performing.</p>
        </div>
        <div className="pill">Total Earnings: ${user.totalEarnings.toFixed(2)}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <EarningsCard total={user.totalEarnings} thisMonth={thisMonth} connectedAppsCount={connectedAppsCount} lastPayout={lastPayout} />
        <EarningsChart data={earningsHistory} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="container-card p-6">
          <div className="font-medium mb-4">Top Earning Apps</div>
          <div className="space-y-3">
            {topApps.map(app => (
              <div key={app.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700">
                    {app.name.slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{app.name}</div>
                    <div className="text-xs text-slate-600 capitalize">{app.category}</div>
                  </div>
                </div>
                <div className="font-medium">${app.earnings.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="container-card p-6">
          <div className="font-medium mb-4">Recent Activity</div>
          <div>
            {activity.slice(0,5).map(a => (
              <ActivityItem key={a.id} title={a.title} subtitle={a.subtitle} timestamp={a.timestamp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
