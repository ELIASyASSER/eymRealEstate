import {createBrowserRouter, Link} from "react-router-dom"
import App from "../App"
import ListPage from "../pages/listPage/listPage"
import HomePage from "../pages/home/home"
import SinglePage from "../components/singlePage/singlePage"
import {ProfilePage} from "../pages/profilePage/profilePage"
import Register from "../pages/register/register"
import Login from "../pages/login/login"
import ProtectedRoute from "./protectedRoutes"
import UpdatePage from "../pages/profileUpdatePage/page"
import NewPostPage from "../pages/newPostPage/newPostPage"
import { listPageLoader, profilePostsInfo, singlePageLoader } from "../lib/loaders"
import Contact from "../components/contact/contact"
import ChatPage from "../pages/chatPage/chat"
import Chats from "../pages/chat/chats"
import { AdminContextProvider } from "../context/adminContext"
import AdminRoute from "./adminRoute"
import AdminLayout from "../admin/adminLayout/adminLayout"
const router = createBrowserRouter([
    {

        path:"/",
        element:<App/>,
        children:[

            {
                path:"",
                element:<HomePage/>
            },
            {
                path:"/list",
                element:<ListPage/>,
                loader:listPageLoader
            },
            {
                path:"/getPost/:id",
                element:<SinglePage/>,
                loader:singlePageLoader
            },
            
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/contact",
                element:<Contact/>
            }
        ]
    },
    {

        path:"/",
        element:<ProtectedRoute/>,
        children:[
            {
                path:"/profile",
                element:<ProfilePage/>,
                loader:profilePostsInfo
            },
            {
                path:"/profile/update",
                element:<UpdatePage/>
            },
            {
                path:"/add",
                element:<NewPostPage/>
            },
            {
                path:"/chats",
                element:<Chats/>
            },
            {
                path:"/chats/:chatId",
                element:<ChatPage/>
            }
        ]
    },
    {
        path:"/admin",
        element:<AdminContextProvider>
            <AdminRoute/>
          </AdminContextProvider>,
          children:[
              {
                  path:"",
                  element:<AdminLayout/>,
                  
              }
          ]
    },
    
    {
        path:"*",
        element:<Error/>
    },
    
])

export default router