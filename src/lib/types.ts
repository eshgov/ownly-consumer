export type Currency = 'USD'

export type User = {
  id: string
  name: string
  email: string
  avatarUrl?: string
  totalEarnings: number
  currency: Currency
  region?: string
  nationality?: string
  age?: number
  sex?: 'male' | 'female' | 'non-binary' | 'prefer_not_to_say' | string
}

export type ConnectedApp = {
  id: string
  name: string
  slug: string
  icon?: string
  category: 'travel' | 'education' | 'media' | 'commerce' | 'mobility' | 'fitness'
  status: 'connected' | 'disconnected'
  earnings: number
  lastSyncedAt?: string
}

export type Payout = {
  id: string
  appId: string
  amount: number
  timestamp: string
}

export type EarningsPoint = { date: string; amount: number }

export type AppState = {
  user: User
  apps: ConnectedApp[]
  earningsHistory: EarningsPoint[]
  payouts: Payout[]
  activity: { id: string; type: 'earning' | 'connection'; title: string; subtitle?: string; timestamp: string }[]
}
