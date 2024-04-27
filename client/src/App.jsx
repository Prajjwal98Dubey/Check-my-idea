import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import UserProfile from './pages/UserProfile'

// import Home from './pages/Home'
// import MyIdea from './pages/MyIdea'
// import LoginForm from './components/LoginForm'
// import RegisterForm from './components/RegisterForm'
// import MyProfile from './pages/MyProfile'
// import Idea from './pages/Idea'
// import ProductWeb from './pages/ProductWeb'

const Home = lazy(() => import('./pages/Home'))
const MyIdea = lazy(() => import('./pages/MyIdea'))
const LoginForm = lazy(() => import('./components/LoginForm'))
const RegisterForm = lazy(() => import('./components/RegisterForm'))
const MyProfile = lazy(() => import('./pages/MyProfile'))
const Idea = lazy(() => import('./pages/Idea'))
const ProductWeb = lazy(() => import('./pages/ProductWeb'))


function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: 
    <Suspense fallback={<h1>Loading...</h1>}>
      <Home />
    </Suspense>
  },
  {
    path: '/share-my-idea',
    element: <Suspense fallback={<h1>Loading...</h1>}>
      <MyIdea />
    </Suspense>
  },
  {
    path: '/login',
    element: <Suspense fallback={<h1>Loading...</h1>}>
    <LoginForm />
  </Suspense>
  },
  {
    path: '/register',
    element: <Suspense fallback={<h1>Loading...</h1>}>
    <RegisterForm />
  </Suspense>
  },
  {
    path: '/my-profile',
    element:
    <Suspense fallback={<h2>Loading...</h2>}>
      {localStorage.getItem("userCheckMyIdea") ? <MyProfile /> : <div className='text-xl text-center font-semibold font-Cursive'>Not Logged in</div>}
    </Suspense>
  },
  {
    path: '/idea',
    element: <Suspense fallback={<h1>Loading...</h1>}>
    <Idea />
  </Suspense>
  },
  {
    path: '/my-web',
    element: <Suspense fallback={<h1>Loading...</h1>}>
    <ProductWeb />
  </Suspense>
  },
  {
    path:'/user-profile',
    element:<UserProfile/>
  }
])
export default App
