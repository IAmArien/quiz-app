/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import './styles/App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  StudentAssessments,
  Assessments as InstructorAssessments,
  Dashboard as InstructorDashboard,
  Login as InstructorLogin,
  Profile as InstructorProfile,
  QuestionsCreate as InstructorQuestions,
  Register as InstructorRegister,
  Subjects as InstructorSubjects,
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
    },
    {
      path: "/instructor/dashboard",
      element: <InstructorDashboard />
    },
    {
      path: "/instructor/profile",
      element: <InstructorProfile />
    },
    {
      path: "/instructor/subjects",
      element: <InstructorSubjects />
    },
    {
      path: "/instructor/assessments",
      element: <InstructorAssessments />
    },
    {
      path: "/instructor/assessments/questions/:assessmentHash/:id",
      element: <InstructorQuestions />
    },
    {
      path: "/students/assessment/:assessmentHash/:id",
      element: <StudentAssessments.Assessment />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
