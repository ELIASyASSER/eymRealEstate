import {useEffect} from "react"
import {  Link, useNavigate } from "react-router-dom";
import "./card.scss";
import {format} from "timeago.js"
import { useGlobalContext } from "../../context/authContext";
import {toast}  from "react-toastify"
import apiRequest from "../../lib/apiRequest";
import { isAuthor } from "../../lib/isAuthor";
const Card = ({ item }) => {
    const {currentUser} = useGlobalContext()
    const navigate = useNavigate()
    
    
    useEffect(() => {
      
    if(!currentUser){
        navigate("/login")
    }
      
    }, [currentUser,navigate])

    
    const handleChat = async()=>{

        const {userId:receiverId} = item
        const {id:senderId} = currentUser
        if(receiverId ==senderId){
            toast.error("you can't chat with your self ")
            return;
        }
        try {
            const res = await apiRequest.post("/chat/createChat",{
                receiverId:receiverId
            })
            const chatId = res.data.chat.id
            toast.success(res.data.message)
            navigate(`/chats/${chatId}`)
        } catch (error) {
            if(error?.response?.data?.message.includes("Unique constraint")){
                toast.error("You can't chat with yourSelf")
                return;
            }else{
                toast.error(error?.response?.data?.message||"failed to chat !")
            }

        }

    }
    
    return (
        <div className="card">
            <Link to={`/getPost/${item.id}`}>
                <div className="imgContainer">
                    <img loading="lazy" src={item.images[0]} alt="card Image" />
                </div>
            </Link>
            <div className="textContainer">
                <h2 className="title">
                    <Link to={`/getPost/${item.id}`}>{item.title}</Link>

                        <span>{item.property}</span>
                </h2>
                <p className="address">
                    <img src="/pin.png" alt="pin" />

                        <span>{item.address}</span>|
                        <span className="date">{format(item.createdAt)}</span>

                </p>
                                                                                                                
                <p className="price">$ {item.price}</p>
                <div className="bottom">

                    <div className="features">
                        <div className="feat">
                            <img src="/bed.png" alt="bed" />
                            <span>{item.bedroom} Bedroom</span>
                        </div>
                        <div className="feat">
                            <img src="/bath.png" alt="bath" />
                            <span>{item.bathroom} Bathroom</span>
                        </div>
                    </div>
                        {!isAuthor(item?.userId)&&
                    <div className="icons">
                        <div className="icon" onClick={handleChat}>
                            <img src="/chat.png" alt="chat" />
                        </div>
                            <div>
                                <span>{item.user?.username||"user"}</span>
                                <img src={item.user?.avatar||"/avatar.png"} alt="avatar" />
                            </div>
                        
                    </div>
                        }
                </div>
            </div>
        </div>
    );
};

export default Card;
