/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

import './styles/App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  StudentAssessments,
  StudentAssessmentsConfirmation,
  StudentDashboard,
  StudentLogin,
  StudentProfile,
  StudentRegister,
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
      path: "/students",
      element: <StudentLogin.Login />
    },
    {
      path: "/students/register",
      element: <StudentRegister.Register />
    },
    {
      path: "/students/dashboard",
      element: <StudentDashboard.Dashboard />
    },
    {
      path: "/students/profile",
      element: <StudentProfile.Profile />
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
    },
    {
      path: "/students/assessment/confirmation/:assessmentHash/:id",
      element: <StudentAssessmentsConfirmation.AssessmentConfirmation />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
