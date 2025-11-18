type Props = { checked: boolean; onChange: (v: boolean) => void }
export default function Toggle({ checked, onChange }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-10 h-6 rounded-full transition relative ${checked ? 'bg-primary' : 'bg-slate-300'}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition ${checked ? 'translate-x-4' : ''}`}/>
    </button>
  )
}
