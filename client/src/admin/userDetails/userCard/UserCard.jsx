import {format} from "timeago.js"
import "./userCard.scss"
import { FaTrash } from "react-icons/fa";
import { useAdminContext } from "../../../context/adminContext";
import DeleteModal from "../../deleteModal/deleteModal";
import { ToastContainer } from "react-toastify";

const UserCard = ({item}) => {
    // const navigate = useNavigate()
    const {dispatch,state} = useAdminContext()
    
    return (
        <>
        <ToastContainer/>
        <div className={`card ${state.openPostModal?"hid":""}`}>
                <div className="imgContainer">
                    <img loading="lazy" src={item?.images[0]} alt="card Image" />
                </div>
            <div className="textContainer">
                <h2 className="title">
                    <p to={`/`}>{item?.title}</p>
                        <span>{item?.property}</span>
                </h2>
                <p className="address">
                    <img src="/pin.png" alt="pin" />

                        <span>{item?.address}</span>|
                        <span className="date">{format(item?.createdAt)}</span>

                </p>
                                                                                                                
                <p className="price">$ {item?.price}</p>
                <div className="bottom">

                    <div className="features">
                        <div className="feat">
                            <img src="/bed.png" alt="bed" />
                            <span>{item?.bedroom} Bedroom</span>
                        </div>
                        <div className="feat">
                            <img src="/bath.png" alt="bath" />
                            <span>{item?.bathroom} Bathroom</span>
                        </div>
                    </div>

                </div>
            </div>
            <button className="del" onClick={()=>{dispatch({
                type:"OPEN_POST_MODAL",
                payload:{
                    type:'post',
                    postId:item?.id
                }
            })}}><FaTrash fill="red" size={20} /></button>
        </div>
        {state.openPostModal&&<DeleteModal/>}
        </>
    );


}

export default UserCard