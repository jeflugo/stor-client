import { useEffect, useRef } from 'react'
import { useAuth } from '../../context/UserContext'

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		google: any
	}
}

export const GoogleLoginButton = () => {
	const { loginWithGoogle } = useAuth()
	const buttonRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const initializeGoogleSignIn = () => {
			if (window.google) {
				window.google.accounts.id.initialize({
					client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
					callback: loginWithGoogle,
					auto_select: false,
				})

				if (buttonRef.current) {
					window.google.accounts.id.renderButton(buttonRef.current, {
						theme: 'outline',
						size: 'large',
						type: 'standard',
						text: 'signin_with',
						shape: 'rectangular',
						logo_alignment: 'left',
					})
				}
			}
		}

		// Load Google script
		const script = document.createElement('script')
		script.src = 'https://accounts.google.com/gsi/client'
		script.async = true
		script.defer = true
		script.onload = initializeGoogleSignIn
		document.head.appendChild(script)

		return () => {
			document.head.removeChild(script)
		}
	}, [loginWithGoogle])

	return <div ref={buttonRef}></div>
}
