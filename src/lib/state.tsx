import React from 'react'
import { AppState, ConnectedApp } from './types'
import { loadState, saveState } from './storage'

export type Actions = {
  connectApp: (id: string) => void
  disconnectApp: (id: string) => void
  updateUser: (patch: Partial<AppState['user']>) => void
  addActivity: (item: AppState['activity'][number]) => void
}

type Ctx = { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> } & Actions

const StateContext = React.createContext<Ctx | null>(null)

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>(() => loadState())

  React.useEffect(() => { saveState(state) }, [state])

  const connectApp = (id: string) => {
    setState(s => {
      const apps = s.apps.map(a => a.id === id ? ({ ...a, status: 'connected', lastSyncedAt: new Date().toISOString(), earnings: a.earnings + 0.5 }) as ConnectedApp : a)
      const app = apps.find(a=>a.id===id)!
      const activity = [{ id: 'act_'+Date.now(), type: 'connection' as const, title: `${app.name} connected`, subtitle: `You’ll start earning from this data.`, timestamp: new Date().toISOString() }, ...s.activity]
      const user = { ...s.user, totalEarnings: s.user.totalEarnings + 0.5 }
      return { ...s, apps, activity, user }
    })
  }

  const disconnectApp = (id: string) => {
    setState(s => {
      const apps = s.apps.map(a => a.id === id ? ({ ...a, status: 'disconnected' }) as ConnectedApp : a)
      const app = apps.find(a=>a.id===id)!
      const activity = [{ id: 'act_'+Date.now(), type: 'connection' as const, title: `${app.name} disconnected`, subtitle: `You can reconnect anytime.`, timestamp: new Date().toISOString() }, ...s.activity]
      return { ...s, apps, activity }
    })
  }

  const updateUser = (patch: Partial<AppState['user']>) => {
    setState(s => ({ ...s, user: { ...s.user, ...patch } }))
  }

  const addActivity = (item: AppState['activity'][number]) => {
    setState(s => ({ ...s, activity: [item, ...s.activity] }))
  }

  const value: Ctx = { state, setState, connectApp, disconnectApp, updateUser, addActivity }
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export function useAppState() {
  const ctx = React.useContext(StateContext)
  if (!ctx) throw new Error('useAppState must be used within StateProvider')
  return ctx
}
