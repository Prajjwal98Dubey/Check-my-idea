import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import MyIdea from './pages/MyIdea'
function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:'/share-my-idea',
    element:<MyIdea/>
  }
])
export default App
