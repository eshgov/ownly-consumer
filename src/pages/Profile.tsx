import { useState } from 'react'
import { useAppState } from '../lib/state'
import { useToast } from '../components/Toast'

export default function Profile() {
  const { state, updateUser, addActivity } = useAppState()
  const { show } = useToast()
  const [name, setName] = useState(state.user.name)
  const [region, setRegion] = useState(state.user.region ?? 'US')
  const [nationality, setNationality] = useState(state.user.nationality ?? '')
  const [age, setAge] = useState<number | ''>(state.user.age ?? '')
  const [sex, setSex] = useState(state.user.sex ?? 'prefer_not_to_say')
  const [payoutMethod, setPayoutMethod] = useState<'Bank'|'PayPal'|'Crypto'>('Bank')
  const [account, setAccount] = useState('')
  const balance = state.user.totalEarnings

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="container-card p-6 space-y-4">
          <div>
            <div className="text-sm text-slate-600">User ID</div>
            <div className="font-mono text-sm">{state.user.id}</div>
          </div>
          <div>
            <label className="text-sm text-slate-700">Name</label>
            <input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-slate-700">Email</label>
            <input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 bg-slate-50" value={state.user.email} readOnly />
          </div>
          <div>
            <label className="text-sm text-slate-700">Region</label>
            <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={region} onChange={e=>setRegion(e.target.value)}>
              <option value="US">United States</option>
              <option value="EU">European Union</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-700">Nationality</label>
              <input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={nationality} onChange={e=>setNationality(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-slate-700">Age</label>
              <input type="number" min={0} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={age} onChange={e=>setAge(e.target.value === '' ? '' : Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-700">Sex</label>
            <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={sex} onChange={e=>setSex(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button className="btn-primary" onClick={()=>{ updateUser({ name, region, nationality, age: typeof age === 'number' ? age : undefined, sex }); show('Profile saved') }}>Save changes</button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="container-card p-6 space-y-4">
            <div className="font-medium">Payout Settings</div>
            <div>
              <label className="text-sm text-slate-700">Preferred payout method</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={payoutMethod} onChange={e=>setPayoutMethod(e.target.value as any)}>
                <option>Bank</option>
                <option>PayPal</option>
                <option>Crypto</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-700">{payoutMethod === 'Bank' ? 'Account number' : 'Account email'}</label>
              <input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={account} onChange={e=>setAccount(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <button className="btn-primary" onClick={()=>show('Payout settings saved')}>Save changes</button>
            </div>
          </div>
          <div className="container-card p-6 space-y-3">
            <div className="font-medium">Cash Out</div>
            <div className="text-sm text-slate-600">Current balance</div>
            <div className="text-2xl font-semibold">${balance.toFixed(2)}</div>
            <div className="flex justify-end">
              <button
                className="btn-primary disabled:opacity-50"
                disabled={balance <= 0}
                onClick={()=>{
                  if (balance <= 0) return
                  updateUser({ totalEarnings: 0 })
                  addActivity({ id: 'a_cash_'+Date.now(), type: 'earning', title: 'Cash out', subtitle: `Withdrew $${balance.toFixed(2)} to ${payoutMethod}`, timestamp: new Date().toISOString() })
                  show('Cash out submitted — funds will arrive in 1–2 business days')
                }}
              >
                Cash Out Full Balance
              </button>
            </div>
          </div>
          <div className="container-card p-6">
            <div className="font-medium mb-2">Data controls</div>
            <p className="text-sm text-slate-600 mb-3">You can disconnect any app at any time from the Connections page.</p>
            <a href="/connections" className="btn-ghost">Go to Connections</a>
          </div>
        </div>
      </div>
    </div>
  )
}
