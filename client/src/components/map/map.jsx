import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss"; // Your custom styles
import Pin from "../pin/pi";

const Map = ({item}) => {
  return (    

    <MapContainer
    center={item.length ==1?[item[0].latitude||50, item[0].longitude||-1]:[52.5,-1.01]}
    zoom={3}
    className="map"
    
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     {
        item.map((el,idx)=>{
            if(!el.latitude || !el.longitude){
              return <div key={idx}>not found on map</div>;
            }else{
              return <Pin ele={el} key={idx}/>
            }
        })
     }
    </MapContainer>
  );
};

export default Map;
