import { Link } from 'react-router-dom'
import { useAppState } from '../lib/state'
import Avatar from './Avatar'

export default function Navbar() {
  const { state } = useAppState()
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold text-slate-900">Ownly</Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex text-sm text-slate-600">{state.user.name}</div>
          <Link to="/profile"><Avatar name={state.user.name} src={state.user.avatarUrl} /></Link>
        </div>
      </div>
    </header>
  )
}
