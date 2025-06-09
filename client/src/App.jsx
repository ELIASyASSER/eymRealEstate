import { Outlet } from "react-router-dom"
import Navbar from "./components/navbar/navbar"
import "./layout.scss"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <div className="layout">
      <div className="navbar">
        <ToastContainer/>
          <Navbar/>
      </div>
      <div className="content">
        <Outlet/>
      </div>
      <footer className="footer">
        © CopyRight 2024. All Rights reserved | made by <span>Elias</span>
      </footer>
    </div>
  
)
}

export default App