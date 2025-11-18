export default function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="pill">
      <span className="text-slate-600 mr-2">{label}:</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  )
}
