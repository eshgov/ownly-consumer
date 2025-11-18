import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import Connections from './pages/Connections'
import Profile from './pages/Profile'
import Activity from './pages/Activity'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'connections', element: <Connections /> },
      { path: 'profile', element: <Profile /> },
      { path: 'activity', element: <Activity /> },
    ],
  },
])
