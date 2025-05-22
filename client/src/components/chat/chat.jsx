import { useEffect, useRef, useState } from "react"
import "./chat.scss"
import {useGlobalContext} from "../../context/authContext"

import apiRequest from "../../lib/apiRequest"
import {format} from "timeago.js"
import {toast} from "react-toastify"
import { useGlobalSocketContext } from "../../context/socketContext"



const Chat = () => {
    
    return (
    <main className="chat">
        <div className="msgs">
            <h1>Chats</h1>
                    <div className="msg" key={5}
                    style={{backgroundColor:"#fece51"}}
                        
                    >
                    <img src={"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="logo" />
                    <div className="txt">
                        <span>{'user'}</span>
                        <p>how are you</p>
                    </div>

            </div>


        </div>
        <div className="chatBox" >
        <div className="top">
            <div className="user">
                <img src={"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="logo" />
                <span>username</span>
            </div>
            <span className="close" >
                X
            </span>
        </div>
        <div className="center">

                <div key={3} className={`chatMsg`}
                >
                <p>message text here</p>
                <span>created at date</span>
                    </div> 

            
        {/* <div></div> reference div  */}
        </div>
        <form className="bottom">
            <textarea name="send" className="send" ></textarea>
                <button>Send</button>
        </form>
    </div>
    </main>
)
}

export default Chat