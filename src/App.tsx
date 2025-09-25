import { Route, Routes } from 'react-router-dom'
// import Header from './components/Header'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'
import Loading from './components/Loading'

// const Home = lazy(() => import('./pages/Home'))
const Market = lazy(() => import('./pages/Market'))
const Welcome = lazy(() => import('./pages/Welcome'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

export default function App() {
	const { user } = useAuth()
	return (
		<>
			<Toaster position='bottom-left' reverseOrder={false} />
			{/* <Header /> */}
			<main>
				<Suspense fallback={<Loading />}>
					<Routes>
						{!user && <Route path='/' element={<Welcome />} />}
						{/* <Route path='/' element={<Home />} /> */}

						<Route path='/market' element={<Market />} />
						{user && <Route path='/dashboard' element={<Dashboard />} />}
						{user && <Route path='/settings' element={<Settings />} />}
						<Route path='/register' element={<Register />} />
						<Route path='/*' element={<div>404</div>} />
					</Routes>
				</Suspense>
			</main>
		</>
	)
}
