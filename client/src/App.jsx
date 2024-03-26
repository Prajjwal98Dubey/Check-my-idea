import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import MyIdea from './pages/MyIdea'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import MyProfile from './pages/MyProfile'
import Idea from './pages/Idea'
import ProductWeb from './pages/ProductWeb'
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
    element: <Home />
  },
  {
    path: '/share-my-idea',
    element: <MyIdea />
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/register',
    element: <RegisterForm />
  },
  {
    path: '/my-profile',
    element: localStorage.getItem("userCheckMyIdea") ? <MyProfile /> : <div className='text-xl text-center font-semibold font-Cursive'>Not Logged in</div>
  },
  {
    path: '/idea',
    element: <Idea />
  },
  {
    path:'/my-web',
    element:<ProductWeb/>
  }
])
export default App
