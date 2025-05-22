import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/authContext";
import logoAv from "/public/avatar.png"
import { client } from "../clients/clients";
import {  FaRegHeart } from "react-icons/fa";
import { savedList } from "../../pages/profilePage/profilePage";
const Navbar = () => {
  const {currentUser} = useGlobalContext()
  const imgUrl = currentUser?.avatar||logoAv
  const [sideBar,setSideBar] = useState(false);
  const user = currentUser!==null?true:false;
  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
            <img src="/logo.png" alt="logo" />
            <span>EymEstate</span>
        </Link>
            <ul className="list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/list">Properties</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/" onClick={()=>client.current.scrollIntoView({behavior:"smooth"})}>Agents</Link></li>
            </ul>
      </div>
      
        <div className="right">

      {
                user?<div className="user">
                  <Link to={"/profile"} onClick={()=>savedList.current.scrollIntoView({behavior:"smooth"})} className="heart_icon">
                    <FaRegHeart />
                  </Link>

                <img src={imgUrl} alt="user" />
                  <span className="name">{currentUser?.username||"username"}</span>
                <Link to="/profile" className="profile">
                  <div className="notif">
                    3
                  </div>
                  <span>Profile</span>

                </Link>
              </div>:<div>
                    <Link to="/login" >Sign In</Link>
                    <Link to="/register"className="register">Sign Up</Link>
              </div>
      }

        <div className="menuIcon" onClick={()=>setSideBar((prev)=>prev==true?false:true)} >
          <img src="/menu.png" alt="menu" />
        </div>

        <div className={`menu ${sideBar==true?"sidebar":""}`}>

        <ul className="list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link onClick={()=>client.current.scrollIntoView({behavior:"smooth"})}>Agents</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>

        </div>


      </div>
    
    </nav>
  )
}

export default Navbar