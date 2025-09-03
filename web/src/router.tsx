import { createBrowserRouter } from 'react-router-dom'
import { App } from './app'
import { Dashboard } from './pages/dashboard'
import { NotFound } from './pages/not-found'
import { Redirect } from './pages/redirect'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/:code',
        element: <Redirect />,
      },
    ],
  },
])
