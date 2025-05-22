import { useRef } from "react";
import "./clients.scss";
let client;
const Clients = () => {
    client =useRef(null) 
    return (
    <main className="clients" ref={client}> 
        <h3>Among Our Clients</h3>
        <div >
            <img src="/client1.webp" alt="client" />
            <img src="/client2.webp" alt="client" />
            <img src="/client3.webp" alt="client" />
            <img src="/client4.webp" alt="client" />
            <img src="/client5.webp" alt="client" />
            <img src="/client6.webp" alt="client" />
        </div>
    </main>
  )
}

export {Clients,client}