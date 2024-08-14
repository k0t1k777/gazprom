import { createBrowserRouter } from 'react-router-dom';
import App from 'src/components/App/App';
import Directory from 'src/pages/Directory/Directory';
import Employees from 'src/pages/Employees/Employees';
import Main from 'src/pages/Main/Main';
import NotFound from 'src/pages/NotFound/NotFound';
import Profile from 'src/pages/Profile/Profile';
import Projects from 'src/pages/Projects/Projects';
import Teams from 'src/pages/Teams/Teams';

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
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'directory',
        element: <Directory />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'teams',
        element: <Teams />,
      },
      {
        path: 'teams/:id',
        element: <Teams />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
