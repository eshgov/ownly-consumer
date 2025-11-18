import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { EarningsPoint } from '../lib/types'

export default function EarningsChart({ data }: { data: EarningsPoint[] }) {
  return (
    <div className="container-card p-6 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 4, right: 4, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} minTickGap={24} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={40} />
          <Tooltip formatter={(v)=>`$${Number(v).toFixed(2)}`} />
          <Area type="monotone" dataKey="amount" stroke="#2563eb" fillOpacity={1} fill="url(#earnings)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
