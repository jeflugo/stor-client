// import {
// 	createContext,
// 	useContext,
// 	// useEffect,
// 	useState,
// 	type ReactNode,
// } from 'react'
// import type { TStateContext, TUser } from '../types/auth'

// const StateContext = createContext<TStateContext | undefined>(undefined)

// export const StateProvider = ({ children }: { children: ReactNode }) => {
// 	const [user, setUser] = useState<TUser | null>(null)
// 	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

// 	// const login = (userData: TUser) => {
// 	// 	setUser(userData)
// 	// 	setIsLoggedIn(true)
// 	// }

// 	const logout = () => {
// 		setUser(null)
// 		setIsLoggedIn(false)
// 	}

// 	const login = async (credentials: { email: string; password: string }) => {
// 		try {
// 			const response = await fetch(
// 				`${import.meta.env.VITE_SERVER_URL}/users/login`,
// 				{
// 					method: 'POST',
// 					headers: { 'Content-Type': 'application/json' },
// 					body: JSON.stringify(credentials),
// 				}
// 			)
// 			if (!response.ok) {
// 				throw new Error('Invalid credentials')
// 			}
// 			const userData: TUser = await response.json()
// 			setUser(userData)
// 			setIsLoggedIn(true)
// 			return userData
// 		} catch (error) {
// 			setUser(null)
// 			setIsLoggedIn(false)
// 			throw error
// 		}
// 	}

// 	// useEffect(() => {
// 	// 	const fetchData = async () => {
// 	// 		const userData = (await fetchInitialData('users')) as TUser | null
// 	// 		setUser(userData)
// 	// 	}
// 	// 	fetchData()
// 	// }, [])

// 	const value: TStateContext = { login, logout, user, isLoggedIn }

// 	return <StateContext.Provider value={value}>{children}</StateContext.Provider>
// }

// // export const useStateContext = () => {
// // 	const context = useContext(StateContext)
// // 	if (!context) {
// // 		throw new Error('useStateContext must be used within a StateProvider')
// // 	}
// // 	return context
// // }

// // eslint-disable-next-line react-refresh/only-export-components
// export const useStateContext = () => useContext(StateContext)

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
