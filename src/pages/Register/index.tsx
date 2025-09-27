import { useState } from 'react'
import Login from '../Welcome/Login'
import Register from '../Welcome/Register'

export default function Welcome() {
	const [login, setLogin] = useState(true)

	const toggleLogin = () => setLogin(!login)

	if (login) return <Login toggleLogin={toggleLogin} />
	return <Register toggleLogin={toggleLogin} />
}
