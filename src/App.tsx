/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import './styles/App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Login as InstructorLogin,
  Register as InstructorRegister,
  Root
} from './screens';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />
    },
    {
      path: "/instructor",
      element: <InstructorLogin />
    },
    {
      path: "/instructor/register",
      element: <InstructorRegister />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
