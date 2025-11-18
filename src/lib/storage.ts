import { AppState } from './types'
import { mockState } from './mockData'

const KEY = 'ownly_consumer_state_v1'

function normalizeState(s: AppState): AppState {
  const histSum = Math.round(s.earningsHistory.reduce((sum, p) => sum + p.amount, 0) * 100) / 100
  const user = { ...s.user, totalEarnings: Math.max(s.user.totalEarnings, histSum) }
  return { ...s, user }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return normalizeState(JSON.parse(raw) as AppState)
  } catch {}
  return normalizeState(mockState)
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {}
}
