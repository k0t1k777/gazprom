import { createBrowserRouter } from 'react-router-dom'
import App from 'src/components/App/App'
import Login from 'src/pages/Login/Login'
import Main from 'src/pages/Main/Main'
import Registration from 'src/pages/Registration/Registration'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'signup',
        element: <Registration />,
      },
      {
        path: 'signin',
        element: <Login />,
      },
    ],
  },
])
