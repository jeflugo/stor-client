import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

const Home = lazy(() => import('./pages/Home'))
const Market = lazy(() => import('./pages/Market'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

// Loading component
const Loading = () => (
	<div className='loading-spinner'>
		<div className='spinner'></div>
		<p>Loading...</p>
	</div>
)

export default function App() {
	return (
		<>
			<Toaster position='top-center' reverseOrder={false} />
			<Header />
			<main>
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/market' element={<Market />} />
						{/* <Route path='/dashboard' element={<div>Dashboard</div>} /> */}
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/*' element={<div>404</div>} />
					</Routes>
				</Suspense>
			</main>
		</>
	)
}
