import { NavLink } from 'react-router-dom'

const linkBase = 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition'
const inactive = 'text-slate-600 hover:bg-slate-100'
const active = 'bg-blue-50 text-primary font-medium'

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-60 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-56px)]">
      <nav className="p-4 space-y-1">
        <NavLink to="/" end className={({isActive})=>`${linkBase} ${isActive?active:inactive}`}>
          Dashboard
        </NavLink>
        <NavLink to="/connections" className={({isActive})=>`${linkBase} ${isActive?active:inactive}`}>
          Connections
        </NavLink>
        <NavLink to="/activity" className={({isActive})=>`${linkBase} ${isActive?active:inactive}`}>
          Activity
        </NavLink>
        <NavLink to="/profile" className={({isActive})=>`${linkBase} ${isActive?active:inactive}`}>
          Profile
        </NavLink>
      </nav>
    </aside>
  )
}
