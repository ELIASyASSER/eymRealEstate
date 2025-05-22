import { Link, useNavigate } from "react-router-dom";
import "./card.scss";

const Card = ({ item }) => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate(`/getPost/${item.id}`); // Ensure the route matches everywhere
        setTimeout(() => {
        scrollTo({
            behavior:"smooth",
                
                top:document.body.scrollHeight
            })
        }, 300);
    };

    return (
        <div className="card">
            <Link to={`/getPost/${item.id}`}>
                <div className="imgContainer">
                    <img src={item.images[0]} alt="card Image" />
                </div>
            </Link>
            <div className="textContainer">
                <h2 className="title">
                    <Link to={`/getPost/${item.id}`}>{item.title}</Link>
                    <span>{item.property}</span>
                </h2>
                <p className="address">
                    <img src="/pin.png" alt="pin" />
                    <span>{item.address}</span>
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
                    <div className="icons">
                        <div className="icon" onClick={handleSave}>
                            <img src="/save.png" alt="save" />
                        </div>
                        <div className="icon">
                            <img src="/chat.png" alt="chat" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
