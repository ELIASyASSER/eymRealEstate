import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss"
import {RouterProvider} from "react-router-dom"
import router from './routers/router.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { SocketContextProvider } from './context/socketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider> 
        <RouterProvider router={router}/>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
