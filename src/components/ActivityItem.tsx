export default function ActivityItem({ title, subtitle, timestamp }: { title: string; subtitle?: string; timestamp: string }) {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-b-0">
      <div>
        <div className="text-sm font-medium text-slate-900">{title}</div>
        {subtitle && <div className="text-sm text-slate-600">{subtitle}</div>}
      </div>
      <div className="text-xs text-slate-500">{new Date(timestamp).toLocaleString()}</div>
    </div>
  )
}
