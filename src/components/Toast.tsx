import React from 'react'

type Toast = { id: string; message: string }

type Ctx = {
  toasts: Toast[]
  show: (message: string) => void
  remove: (id: string) => void
}

const ToastContext = React.createContext<Ctx | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const remove = (id: string) => setToasts(t => t.filter(x => x.id !== id))
  const show = (message: string) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, message }])
    setTimeout(() => remove(id), 3000)
  }
  return (
    <ToastContext.Provider value={{ toasts, show, remove }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className="container-card px-4 py-3 shadow-md">
            <div className="text-sm text-slate-800">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
