/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export const useAuthForm = (isLogin: boolean) => {
	const { login, register } = useAuth()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [errors, setErrors] = useState({
		name: '',
		username: '',
		email: '',
		repeatEmail: '',
		password: '',
		repeatPassword: '',
	})

	const validateForm = (formData: any) => {
		const newErrors = {
			name: '',
			username: '',
			email: '',
			repeatEmail: '',
			password: '',
			repeatPassword: '',
		}

		let isValid = true

		if (!isLogin) {
			// Registration validations
			if (!formData.name) {
				newErrors.name = 'name is required'
				isValid = false
			} else if (formData.name.length < 3) {
				newErrors.name = 'name must be at least 3 characters'
				isValid = false
			}

			if (!formData.username) {
				newErrors.username = 'Username is required'
				isValid = false
			} else if (formData.username.length < 3) {
				newErrors.username = 'Username must be at least 3 characters'
				isValid = false
			}
		}

		// Email validation (for both login and register)
		if (!formData.email) {
			newErrors.email = 'Email is required'
			isValid = false
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid'
			isValid = false
		}

		if (!isLogin) {
			// Confirm email validation
			if (!formData.repeatEmail) {
				newErrors.repeatEmail = 'Please confirm your email'
				isValid = false
			} else if (formData.email !== formData.repeatEmail) {
				newErrors.repeatEmail = 'Emails do not match'
				isValid = false
			}
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = 'Password is required'
			isValid = false
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters'
			isValid = false
		}

		if (!isLogin) {
			// Confirm password validation
			if (!formData.repeatPassword) {
				newErrors.repeatPassword = 'Please confirm your password'
				isValid = false
			} else if (formData.password !== formData.repeatPassword) {
				newErrors.repeatPassword = 'Passwords do not match'
				isValid = false
			}
		}

		setErrors(newErrors)
		return isValid
	}

	const handleSubmit = async (formData: any) => {
		if (!validateForm(formData)) {
			toast.error('Please fix the errors above')
			return false
		}

		setIsSubmitting(true)
		try {
			if (isLogin) {
				await login({ email: formData.email, password: formData.password })
			} else {
				await register({
					name: formData.name,
					username: formData.username,
					email: formData.email,
					password: formData.password,
				})
			}
			return true
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			// Error is already handled in the context
			return false
		} finally {
			setIsSubmitting(false)
		}
	}

	const clearError = (fieldName: string) => {
		setErrors(prev => ({
			...prev,
			[fieldName]: '',
		}))
	}

	return {
		errors,
		isSubmitting,
		handleSubmit,
		clearError,
	}
}
