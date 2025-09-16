import { ToastContainer } from 'react-toastify'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './features/auth/components/LoginPage'
import ForgetPasswordPage from './features/auth/components/ForgetPasswordPage'
import VerifyOtp from './features/auth/components/VerifyOtp'
import ResetPassword from './features/auth/components/ResetPassword'
import DefaultLayout from './ui/DefaultLayout'
import AdminDashboard from './features/admin'
import Customer from './features/admin/customer'
import AddCustomer from './features/admin/customer/AddCustomer'
import Tasks from './features/admin/tasks'
import AssignTask from './features/admin/tasks/AssignTask'
import TaskDetail from './features/admin/tasks/TaskDetail'
import MarketPlace from './features/admin/marketplace'
import Certificates from './features/admin/certificates'
import Orders from './features/admin/orders'
import Forms from './features/admin/forms'
import UserManagement from './features/admin/usermanagement'
import AddService from './features/admin/marketplace/AddService'
import AddCertificate from './features/admin/certificates/AddCertificate'
import AddUser from './features/admin/usermanagement/AddUser'
import Reports from './features/admin/reports'
import Profile from './features/settings/Profile'
import UpdatePassword from './features/settings/UpdatePassword'
import AddNewForm from './features/admin/forms/AddNewFrom'
import InspectorDashboard from './features/inspector'
import InspectorTasks from './features/inspector/tasks'
import InspectorTaskDetail from './features/inspector/tasks/taskdetail'
import TaskDetailAdd from './features/inspector/tasks/taskdetailadd'
import OwnerDashboard from './features/owner'
import EditCertificate from './features/admin/certificates/EditCertificate'
import NotFound from './components/NotFound'
import PrePostTask from './features/inspector/tasks/preposttask'
import OwnerCertificates from './features/owner/certificates'
import OwnerReports from './features/owner/reports'
import ErrorElement from './components/ErrorElement'
import ProtectedRoute from './components/ProtectedRoute'





const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },

  {
    path: '/forgetpassword',
    element: <ForgetPasswordPage />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOtp />,
  },
  {
    path: '/resetpassword',
    element: <ResetPassword />,
  },
  // {
  //   path: '/paymentplan',
  //   element: <PaymentPlan />,
  // },
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/admin-dashboard', element: (<AdminDashboard />) },
      { path: '/customers', element: (<Customer />) },
      { path: '/customers/AddCustomer', element: (<AddCustomer />) },
      { path: '/tasks', element: (<Tasks />) },
      { path: '/tasks/AssignTask', element: (<AssignTask />) },
      {
        path: '/tasks/taskDetail/:id', element: (<TaskDetail />),
        // errorElement: <ErrorElement />
      },
      { path: '/market-place', element: (<MarketPlace />) },
      { path: '/market-place/addservice', element: (<AddService />) },
      { path: '/certificates', element: (<Certificates />) },
      { path: '/certificates/addcertificate', element: (<AddCertificate />) },
      { path: '/certificates/editcertificate/:id', element: (<EditCertificate />) },
      { path: '/orders', element: (<Orders />) },
      { path: '/forms', element: (<Forms />) },
      { path: '/forms/addnewform', element: (<AddNewForm />) },
      { path: '/user-management', element: (<UserManagement />) },
      { path: '/user-management/adduser', element: (<AddUser />) },
      { path: '/user-management/edituser/:id', element: (<AddUser />) },
      { path: '/reports', element: (<Reports />) },
      { path: '/profile', element: (<Profile />) },
      { path: '/updatepassword', element: (<UpdatePassword />) },
    ]
  },
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/inspector-dashboard', element: (<InspectorDashboard />) },
      { path: '/inspector-tasks', element: (<InspectorTasks />) },
      { path: '/inspector-tasks/taskDetail/:id', element: (<InspectorTaskDetail />) },
      { path: '/inspector-tasks/add/:id', element: (<TaskDetailAdd />) },
      { path: '/inspector-tasks/post/:id', element: (<PrePostTask />) },
      { path: '/inspector-reports', element: (<Reports />) },
    ]
  },
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/owner-dashboard', element: (<OwnerDashboard />) },
      { path: '/owner-certificates', element: (<OwnerCertificates />) },
      { path: '/owner-reports', element: (<OwnerReports />) },


    ]
  },
  {
    path: '*',
    element: <NotFound />
  }

])

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />

    </>
  )
}

export default App
