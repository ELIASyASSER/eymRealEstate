import { Marker, Popup } from "react-leaflet"
import "./pin.scss"
import { Link } from "react-router-dom"
const Pin = ({ele}) => {
return (
        <Marker position={[ele.latitude,ele.longitude]}>
            <Popup>

                <div className="popupContainer">
                    <img src={ele.img} alt="" />
                    <div className="txtContainer">
                        <Link to={`/gePost/${ele.id}`} className="tit">{ele.title} </Link>
                        <span>{ele.bedroom} BedRoom</span>
                        <b>${ele.price}</b>
                    </div>
                </div>
            </Popup>

        </Marker>
    )
}

export default Pin