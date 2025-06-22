import { ToastContainer } from "react-toastify"
import {Clients} from "../../components/clients/clients"
import Contact from "../../components/contact/contact"
import SearchBar from "../../components/searchBar/searchBar"
import Services from "../../components/services/services"
import "./home.scss"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"


const Animated = ({targetNumber,duration=1000})=>{
 
  const [count, setCount] = useState(0);
  const currentRef = useRef(0);
  const target = Number(targetNumber);

  useEffect(() => {
    const steps = 20;
    const intervalTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      currentRef.current += increment;
      if (currentRef.current >= target) {
        clearInterval(timer);
        setCount(target);
      } else {
        setCount(Math.floor(currentRef.current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  const display =
    count >= 1000 ? `${Math.floor(count / 1000)}k` : count;

  return <h1 className="counter">{display}+</h1>;
};


function HomePage() {
  return (<>
        <div className="homePage">
        <div className="textContainer">

            <div className="wrapper">
                <h1 className="txt">Find Your <span >Real Estate</span> & Get Your Dream Place</h1>
                <p className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam expedita veniam quam eius qui inventore. Adipisci harum, similique fuga expedita magni cumque libero dolore repudiandae id, error, dolorum aperiam reiciendis? Illo, voluptates!
                </p>
                    <SearchBar/>
                    <div className="boxes">
                        <div className="box">
                            <Animated targetNumber="16" duration={1000} />
                            <h2>Years Of Experience</h2>
                        </div>
                        <div className="box">
                            <Animated targetNumber="7000" duration={2000}/>
                            <h2>Properties sold</h2>
                        </div>
                        <div className="box">
                            <Animated targetNumber="200" duration={2000}/>
                            <h2>Award Gained</h2>
                        </div>
                    </div>

            </div>
        </div>
        <div className="imgContainer">
            <img src="/bg.png" alt="backgoround" />
        </div>
        </div>
        
        <Clients />
        <Services/>
        <Contact/>
  </>
  )
}

export default HomePage