import React, { createContext, useContext, useEffect, useState } from 'react'
import type { TUserContext, TUser } from '../types/users'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils'

// Create context
const UserContext = createContext<TUserContext | undefined>(undefined)

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const navigate = useNavigate()
	const [user, setUser] = useState<TUser | null>(null)
	const [loading, setLoading] = useState(true)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	// Check if user is logged in on app start
	useEffect(() => {
		checkAuthStatus()
	}, [])

	useEffect(() => {
		setIsAuthenticated(user !== null)
	}, [user])

	const checkAuthStatus = async () => {
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const { data } = await api.get('/users/me')
				setUser(data)
			} catch (error) {
				console.log(error)
			}
		}
		setLoading(false)
	}

	const login = async (userDate: TUser, token: string) => {
		localStorage.setItem('token', token)
		setUser(userDate)
	}

	const register = async (userData: TUser, token: string) => {
		localStorage.setItem('token', token)
		setUser(userData)
	}

	const logout = () => {
		localStorage.removeItem('token')
		setUser(null)
		navigate('/')
	}

	const value: TUserContext = {
		user,
		loading,
		isAuthenticated,
		login,
		register,
		logout,
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Custom hook to use auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
	const context = useContext(UserContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
