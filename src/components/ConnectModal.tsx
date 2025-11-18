import { motion, AnimatePresence } from 'framer-motion'
import { ConnectedApp } from '../lib/types'

export default function ConnectModal({ open, app, onClose, onAuthorize }: { open: boolean; app?: ConnectedApp; onClose: () => void; onAuthorize: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="relative z-50 container-card p-6 max-w-md w-full">
            <div className="text-lg font-semibold mb-2">Connect {app?.name}</div>
            <p className="text-sm text-slate-600 mb-4">Ownly will request read-only access to your {app?.name} data.</p>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-6">
              <li>Purchase history</li>
              <li>Usage trends</li>
              <li>Aggregated analytics</li>
            </ul>
            <div className="flex justify-end gap-2">
              <button className="btn-ghost" onClick={onClose}>Cancel</button>
              <button className="btn-primary" onClick={onAuthorize}>Authorize</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
