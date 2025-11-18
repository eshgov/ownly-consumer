type Props = { name?: string; src?: string; size?: number }
export default function Avatar({ name = 'U', src, size = 32 }: Props) {
  const initials = name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase()
  return (
    <div
      className="flex items-center justify-center rounded-full bg-slate-200 text-slate-700 font-medium"
      style={{ width: size, height: size }}
    >
      {src ? <img src={src} alt={name} className="w-full h-full rounded-full object-cover"/> : initials}
    </div>
  )
}
