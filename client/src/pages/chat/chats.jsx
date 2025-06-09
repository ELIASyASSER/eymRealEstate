import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./chat.scss";
import apiRequest from "../../lib/apiRequest";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      const res = await apiRequest.get("/chat/allChats");
      setChats(res.data);
    } catch (err) {
      console.error("Error fetching chats:", err.response?.data || err.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [chats]);


  if (loading) return <div className="chats-loading">Loading chats...</div>;

  return (
    <div className="chats-container">
      <h2>Your Chats</h2>
      {chats.length === 0 ? (
        <p className="no-chats">No chats found.</p>
      ) : (
        <ul className="chat-list">
          {chats.map((item,idx) => {
            const chat = item.chat;
            const otherUser = chat.ParticipantUsers.find(
              (p) => p.user.id !== item.userId
            )?.user;
            const lastMessage = chat.messages?.[0];

            return (
              <li key={idx} className="chat-item">
                <Link to={`/chats/${chat.id}`} className="chat-link">
                  <img
                    src={otherUser?.avatar || "/avatar.png"}
                    alt="Avatar"
                    className="chat-avatar"
                  />
                  <div className="chat-info">
                    <p className="chat-username">{otherUser?.username || "User"}</p>
                    <p className="chat-last-message">
                      {lastMessage?.text || "No messages yet"}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Chats;
