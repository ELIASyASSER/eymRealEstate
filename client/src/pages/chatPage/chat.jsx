import { useRef, useEffect, useState } from "react";
import "./chat.scss";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest";
import {   useParams } from "react-router-dom";
import { useGlobalSocketContext } from "../../context/socketContext";
import { useGlobalContext } from "../../context/authContext";
import {format} from "timeago.js"
const ChatPage = () => {
  const {chatId} = useParams()
  const [receiver,setReceiver] = useState({})
  const [chatDetails,setChatDetails] = useState(null)
  const [sender,setSender] = useState({})
  const {socket,setOnlineUsers,onlineUsers} = useGlobalSocketContext();
  const {currentUser}=useGlobalContext() 
  const {id:currentId} = currentUser
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const isUserOnline = onlineUsers?.includes(receiver.receiverId) 
  const handleSend = async() => {

    if (!newMessage.trim()) return;
    const res = await apiRequest.post(`/message/${chatId}`,{newMessage})
    setChatDetails((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));

    const info = {
      data : res.data,
      receiverId:receiver.receiverId
    }
    socket.emit("sendMessage",info)
      
    setNewMessage("");
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatDetails?.messages]);

  useEffect(()=>{
    if(!currentId)return;
    const chatData = async()=>{
      
      try {
        const res = await apiRequest(`/chat/${chatId}`)
        
        setChatDetails(res.data)
        const participants = res.data.ParticipantUsers
        const items = participants.map((item)=>{
        return {role:item.role,user:item.user,userId:item.userId}
        })  
        let receiverItem = items.find((item)=>{
          return item.userId !== currentId
        })
        let senderItem = items.find((item)=>{
          return item.userId ==currentId
        })
       
        if (receiverItem) {
          setReceiver({
            role: receiverItem.role,
            userAvatar: receiverItem.user?.avatar,
            username: receiverItem.user.username,
            receiverId:receiverItem.userId
          });
          
        }
        if(senderItem){
          setSender({
            role: senderItem.role,
            userAvatar: senderItem.user?.avatar,
            username: senderItem.user.username,
            senderId:senderItem.userId
          })


      }
      } catch (error) {
        console.log(error)
        toast.error("failed to get chat details")
      }
    }
    chatData();
  },[chatId,currentId])


  useEffect(()=>{
    
    if(socket){
      socket.on("getMessage",(data)=>{
        setChatDetails((prev)=>({...prev,messages:[...prev.messages,data]}))
      })
      socket.emit("addUser",currentId)
      socket.on("updateOnlineUsers",(users)=>{
        setOnlineUsers(users)
      })
    }
    return ()=>{
      socket?.off("getMessage")
    }//clean up function
  },[socket,chatId,chatDetails?.messages])
  
  const avatarFunc = (msg)=>{
    if(msg.senderId == currentId){
      return sender?.userAvatar||"/avatar.png"
    }else{
      return receiver.userAvatar||"/avatar.png"
    }

  }

  return (
    <div className="chatPage">
      <div className="chatHeader">
        <img src={`${receiver?.userAvatar||"/avatar.png"}`} alt="User" />
        <div>
          <h3 className={`${isUserOnline?"online":"offline"}`}>{receiver?.username||"user"}</h3>
          <span className={`${isUserOnline?"online":"offline"}`}>{isUserOnline?"Online":"Offline"}</span>
        </div>
      </div>

      <div className="chatBody">
        {chatDetails?.messages.length==0 && <div>No Messages yet </div>}
        {chatDetails?.messages?.map((msg,idx) => (
          
          <div
          key={idx}
          className={`message ${msg.senderId !== sender.senderId ? "sent" : "received"}`}
          >
          <img className="avatar" src={avatarFunc(msg)} alt="avatar" />
            <div>
              <p>{msg.text}</p>
              <span className="time">{format(msg.createdAt)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatInput">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          // disabled={!receiver.receiverId}
        />
        <button onClick={handleSend} >Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
