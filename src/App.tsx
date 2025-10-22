import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { useUser } from './context/UserContext'
import Loading from './components/Loading'
import Post from './pages/Post'

const Welcome = lazy(() => import('./pages/Welcome'))

const Home = lazy(() => import('./pages/Home'))
const Notifications = lazy(() => import('./pages/Notifications'))
const Inbox = lazy(() => import('./pages/Inbox'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Market = lazy(() => import('./pages/Market'))
const Search = lazy(() => import('./pages/Search'))
const CreatePost = lazy(() => import('./pages/CreatePost'))
const Settings = lazy(() => import('./pages/Settings'))

export default function App() {
	const { user, loading } = useUser()

	if (loading) return <Loading />
	return (
		<>
			<Toaster position='bottom-left' reverseOrder={false} />
			{user ? <Routing /> : <Welcome />}
		</>
	)
}

const Routing = () => {
	return (
		<main>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/notifications' element={<Notifications />} />
					<Route path='/inbox' element={<Inbox />} />
					<Route path='/:username' element={<UserProfile />} />
					<Route path='/market' element={<Market />} />
					<Route path='/search' element={<Search />} />
					<Route path='/create-post' element={<CreatePost />} />
					<Route path='/settings' element={<Settings />} />
					<Route path='/posts/:postId' element={<Post />} />
					<Route path='/not-found' element={<div>404</div>} />
				</Routes>
			</Suspense>
		</main>
	)
}
