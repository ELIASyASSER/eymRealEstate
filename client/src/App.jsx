import { Outlet } from "react-router-dom"
import Navbar from "./components/navbar/navbar"
import "./layout.scss"

function App() {

  return (
    <div className="layout">
      <div className="navbar">
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