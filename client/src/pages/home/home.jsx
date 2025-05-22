import {Clients} from "../../components/clients/clients"
import Contact from "../../components/contact/contact"
import SearchBar from "../../components/searchBar/searchBar"
import Services from "../../components/services/services"
import "./home.scss"

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
                            <h1>16+</h1>
                            <h2>Years Of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>7k+</h1>
                            <h2>Properties sold</h2>
                        </div>
                        <div className="box">
                            <h1>200+</h1>
                            <h2>Award Gained</h2>
                        </div>
                    </div>

            </div>
        </div>
        <div className="imgContainer">
            <img src="/bg.png" alt="backgoround" />
        </div>
    </div>
        <Clients/>
        <Services/>
        <Contact/>
  </>
  )
}

export default HomePage