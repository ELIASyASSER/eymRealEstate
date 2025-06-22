import {   FaTrash } from "react-icons/fa"
import {SiGmail} from "react-icons/si"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./slider.scss";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/adminContext";


let settings = {
    infinite: false,
    dots:false,
    arrows:true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
       // Responsive breakpoints
    responsive: [
      {
        breakpoint: 1024, // < 1024px (lg screen)
        settings: {
          slidesToShow: 3,
          slidesToScroll:3
        },
      },
      {
        breakpoint: 768, // < 768px (md screen)
        settings: {
          slidesToShow: 2,
          slidesToScroll:2
        },
      },
      {
        breakpoint: 640, // < 640px (sm screen)
        settings: {
          slidesToShow: 1,
          slidesToScroll:1
        },
      },
    ],
    
  };

const SliderItems =({users})=>{

const {state,dispatch} = useAdminContext()
return <Slider {...settings}>
    
        {users?.map((user) => (
          <div className={`user-card ${state.openUserModal?"hide":""}`} key={user.username}>
            <img
              className="user-card__avatar"
              src={user.avatar || "/avatar.png"}
              alt={user.username}
            />
            <div className="user-card__info">
              <h4>{user.username}</h4>
              <p className="joins">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              
              {user.posts?.length ==0?<p className="no_posts">User does'nt have any posts</p>:<Link to={`users/${user.id}`}>{user?.username} creates  {user.posts?.length } posts</Link>}
              <div className="btns">
                <button className="del" onClick={()=>{
                  dispatch({
                    type:"OPEN_USER_MODAL",
                    payload:{
                      type:"user",
                      userId:user?.id
                    }
                  })
                  }}><FaTrash fill="red" size={20} /></button>
                <Link className="del" to={`mailto:${user.email}`}><SiGmail fill="black" size={20}/></Link>
              </div>
            </div>
          </div>
        )
        
        )}
    </Slider>
    }
    
      
export default SliderItems 