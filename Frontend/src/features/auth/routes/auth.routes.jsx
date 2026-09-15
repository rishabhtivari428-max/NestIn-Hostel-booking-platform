import { createBrowserRouter } from 'react-router'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import ListHostels from '../pages/ListHostels'
import ListProperty from '../pages/ListProperty'
import StudentDashboard from '../pages/StudentDashboard'
import OwnerDashboard from '../pages/OwnerDashboard'
import Protected from './Protected'
import ViewInquiries from '../pages/ViewInquiries'

let router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: "/browsehostels",
        Component: ListHostels
    },
    {
        path: "/listproperty",
        element: (
            <Protected allowedRoles={['Owner']}>
                <ListProperty />
            </Protected>
        )
    },
    {
        path: "/getbookings",
        element: (
            <Protected allowedRoles={['Student', 'Owner']}>
                <StudentDashboard />
            </Protected>
        )
    },
    {
        path: "/Ownerdashboard",
        element: (
            <Protected allowedRoles={['Owner']}>
                <OwnerDashboard />
            </Protected>
        )
    },
    {
        path: "/Inquiries",
        element: (
            <Protected allowedRoles={['Owner']}>
                <ViewInquiries />
            </Protected>
        )
    }
])

export default router