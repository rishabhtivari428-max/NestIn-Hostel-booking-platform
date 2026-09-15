import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'

export function useAuth() {
	return useContext(AuthContext)
}
