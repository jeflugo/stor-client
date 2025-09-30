import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'
import Loading from './components/Loading'

const Welcome = lazy(() => import('./pages/Welcome'))

const Home = lazy(() => import('./pages/Home'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Market = lazy(() => import('./pages/Market'))
const Settings = lazy(() => import('./pages/Settings'))

export default function App() {
	const { user } = useAuth()

	if (!user) return <Welcome />

	return (
		<>
			<Toaster position='bottom-left' reverseOrder={false} />
			<main>
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path='/' element={<Home />} />
						{/* <Route path='/:username' element={<UserProfile />} /> */}
						<Route path='/profile' element={<UserProfile />} />
						<Route path='/market' element={<Market />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/not-found' element={<div>404</div>} />
					</Routes>
				</Suspense>
			</main>
		</>
	)
}
