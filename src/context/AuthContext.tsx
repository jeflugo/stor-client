import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type {
	AuthState,
	AuthContextType,
	LoginData,
	RegisterData,
	TUser,
} from '../types/auth'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

// Initial state
const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isLoading: true,
}

// Action types
type AuthAction =
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'LOGIN_SUCCESS'; payload: TUser }
	| { type: 'REGISTER_SUCCESS'; payload: TUser }
	| { type: 'LOGOUT' }
	| { type: 'AUTH_ERROR' }

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
	switch (action.type) {
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload }
		case 'LOGIN_SUCCESS':
		case 'REGISTER_SUCCESS':
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				isLoading: false,
			}
		case 'LOGOUT':
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			}
		case 'AUTH_ERROR':
			return {
				...state,
				isLoading: false,
			}
		default:
			return state
	}
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(authReducer, initialState)

	// Check if user is logged in on app start
	useEffect(() => {
		checkAuthStatus()
	}, [])

	const checkAuthStatus = async () => {
		try {
			const token = localStorage.getItem('token')
			if (token) {
				const user = await authService.getCurrentUser(token)
				dispatch({ type: 'LOGIN_SUCCESS', payload: user })
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			localStorage.removeItem('token')
			dispatch({ type: 'AUTH_ERROR' })
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}

	const login = async (credentials: LoginData) => {
		try {
			dispatch({ type: 'SET_LOADING', payload: true })
			const { user, token } = await authService.login(credentials)

			localStorage.setItem('token', token)
			dispatch({ type: 'LOGIN_SUCCESS', payload: user })
			toast.success('Login successful!')
		} catch (error) {
			dispatch({ type: 'AUTH_ERROR' })
			toast.error(error instanceof Error ? error.message : 'Login failed')
			throw error
		}
	}

	const register = async (userData: RegisterData) => {
		try {
			dispatch({ type: 'SET_LOADING', payload: true })
			const { user, token } = await authService.register(userData)

			localStorage.setItem('token', token)
			dispatch({ type: 'REGISTER_SUCCESS', payload: user })
			toast.success('Registration successful!')
		} catch (error) {
			dispatch({ type: 'AUTH_ERROR' })
			toast.error(
				error instanceof Error ? error.message : 'Registration failed'
			)
			throw error
		}
	}

	const logout = () => {
		localStorage.removeItem('token')
		dispatch({ type: 'LOGOUT' })
		toast.success('Logged out successfully')
	}

	const clearErrors = () => {
		// You can extend this to handle error clearing if needed
	}

	const value: AuthContextType = {
		...state,
		login,
		register,
		logout,
		clearErrors,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
