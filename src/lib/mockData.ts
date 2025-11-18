import { AppState, ConnectedApp, EarningsPoint, Payout, User } from './types'

const userBase: Omit<User, 'totalEarnings'> & { totalEarnings?: number } = {
  id: 'u_1',
  name: 'Ava Consumer',
  email: 'ava@example.com',
  avatarUrl: '',
  currency: 'USD',
  region: 'US',
  nationality: 'United States',
  age: 28,
  sex: 'prefer_not_to_say',
}

const makeApp = (id: string, name: string, slug: string, category: ConnectedApp['category'], status: ConnectedApp['status'], earnings: number, lastSyncedAt?: string): ConnectedApp => ({
  id, name, slug, category, status, earnings, lastSyncedAt
})

const apps: ConnectedApp[] = [
  makeApp('app_duo', 'Duolingo', 'duolingo', 'education', 'connected', 12.4, new Date().toISOString()),
  makeApp('app_air', 'Airbnb', 'airbnb', 'travel', 'connected', 28.9, new Date().toISOString()),
  makeApp('app_uber', 'Uber', 'uber', 'mobility', 'connected', 9.75, new Date().toISOString()),
  makeApp('app_spo', 'Spotify', 'spotify', 'media', 'connected', 21.1, new Date().toISOString()),
  makeApp('app_amz', 'Amazon', 'amazon', 'commerce', 'disconnected', 18.65),
  makeApp('app_str', 'Strava', 'strava', 'fitness', 'disconnected', 7.2),
  makeApp('app_ets', 'Etsy', 'etsy', 'commerce', 'disconnected', 5.1),
  makeApp('app_nfx', 'Netflix', 'netflix', 'media', 'disconnected', 4.2),
]

const days = 30
const today = new Date()
const earningsHistory: EarningsPoint[] = Array.from({ length: days }, (_, i) => {
  const d = new Date(today)
  d.setDate(today.getDate() - (days - 1 - i))
  const amount = 2 + Math.sin(i / 5) + i * 0.2
  return { date: d.toISOString().slice(0, 10), amount: Math.round(amount * 100) / 100 }
})

const payouts: Payout[] = [
  { id: 'p1', appId: 'app_spo', amount: 2.4, timestamp: new Date(Date.now() - 2*3600*1000).toISOString() },
  { id: 'p2', appId: 'app_duo', amount: 1.1, timestamp: new Date(Date.now() - 26*3600*1000).toISOString() },
  { id: 'p3', appId: 'app_air', amount: 3.2, timestamp: new Date(Date.now() - 3*24*3600*1000).toISOString() },
]

// Derive total earnings as the sum of the last 30 days so all-time >= this month
const totalFromHistory = Math.round(earningsHistory.reduce((sum, p) => sum + p.amount, 0) * 100) / 100
const user: User = { ...userBase, totalEarnings: totalFromHistory }

export const mockState: AppState = {
  user,
  apps,
  earningsHistory,
  payouts,
  activity: payouts.map(p => ({
    id: 'a_'+p.id,
    type: 'earning',
    title: 'Data payout',
    subtitle: `+$${p.amount.toFixed(2)} from ${apps.find(a=>a.id===p.appId)?.name ?? 'App'}`,
    timestamp: p.timestamp
  }))
}
