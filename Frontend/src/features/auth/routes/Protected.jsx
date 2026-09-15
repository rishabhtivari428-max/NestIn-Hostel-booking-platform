import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router' // Agar React Router v6 hai

const Protected = ({ children, allowedRoles }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px] w-full">
                <div
                    className="relative w-12 h-12 rounded-full [perspective:1000px] [transform:rotateZ(45deg)] text-blue-600
                       before:content-[''] before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:[transform:rotateX(70deg)] before:animate-[spin_1s_linear_infinite]
                       after:content-[''] after:block after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:[transform:rotateY(70deg)] after:animate-[spin_1s_linear_infinite] after:[animation-delay:0.4s] after:text-red-500">
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />
    }
    return children
}

export default Protected