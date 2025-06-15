import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/authContext";
import logoAv from "/public/avatar.png"; // Make sure this path works after Vite build
import { client } from "../clients/clients";
import { FaRegHeart } from "react-icons/fa";

const Navbar = () => {
  const { currentUser } = useGlobalContext();
  const imgUrl = currentUser?.avatar || logoAv;
  const [sideBar, setSideBar] = useState(false);

  const user = !!currentUser;

  const handleSidebarToggle = () => setSideBar((prev) => !prev);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>EymEstate</span>
        </Link>

        <ul className="list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/chats">Chats</Link></li>
          <li><Link to="/list">Properties</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <Link
              to="/"
              onClick={()=>{
                client.current.scrollIntoView({behavior:"smooth"})
              }}
            >
              Agents
            </Link>
          </li>
        </ul>
      </div>


      <div className="right">
        {user ? (
          <div className="user">
            <Link
              to="/profile" 
              
              className="heart_icon"
            >
              <FaRegHeart />
            </Link>

            <div className="menuIcon" onClick={handleSidebarToggle}>
              <img src="/menu.png" alt="menu" />
            </div>

            <img src={imgUrl} alt="user" />
            <span className="name">{currentUser?.username || "Username"}</span>

            <Link to="/profile" className="profile">
              <span className="profile">Profile</span>
            </Link>
          </div>
        ) : (
          <div className="sign">
            <Link to="/login">Sign In</Link>
            <Link to="/register" className="register">Sign Up</Link>
          </div>
        )}

        <div className={`menu ${sideBar ? "sidebar" : ""}`}>
          <ul className="list">
            <li><Link to="/" onClick={()=>setSideBar(false)}>Home</Link></li>
            <li><Link to="/list" onClick={()=>setSideBar(false)}>Properties</Link></li>
            <li><Link to="/" onClick={()=>setSideBar(false)}>About</Link></li>
            <li><Link to="/chats" onClick={()=>setSideBar(false)}>Chats</Link></li>
            <li><Link to="/contact" onClick={()=>setSideBar(false)}>Contact</Link></li>
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  client.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Agents
              </Link>
            </li>
            {!user && (
              <>
                <li><Link onClick={()=>setSideBar(false)} to="/login">Sign In</Link></li>
                <li><Link onClick={()=>setSideBar(false)} to="/register">Sign Up</Link></li>
              </>
            )}
            <li><Link onClick={()=>setSideBar(false)} to="/profile">Profile</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
