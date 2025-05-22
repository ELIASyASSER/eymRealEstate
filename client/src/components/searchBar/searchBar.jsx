import { useState } from "react";
import "./searchBar.scss"
import { Link } from "react-router-dom";

const SearchBar = () => {

    const types =["buy","rent"];

    const [query,setQuery] = useState({
        type:"buy",
        location:"",
        minPrice:0,
        maxPrice:0
    })
    const switchType =(val)=>{
        setQuery((prev)=>({...prev,type:val}))
    }
    const handleChange = (e)=>{
        setQuery((prev)=>({...prev,[e.target.name]:e.target.value}))
    }


    return (
        <div className="searchBar">
            <div className="type">
                
                {
                    types.map((btn,idx)=>{
                        return  <button onClick={()=>switchType(btn)}  key={idx} className={`${query.type ==btn?"active":""}`}>{btn} </button>})
                }

            </div>
            <form>
                <input type="text" name="city" placeholder="City" />
                <input type="number" name="minPrice" placeholder="minPrice"  min={0} max={10000000} onChange={handleChange}/>

                <input type="number" name="maxPrice" placeholder="maxPrice" min={0} max={10000000} onChange={handleChange}/>

                <Link to={`/list?minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&city=${query.location}&type=${query.type}`} className="btnLink">
                {/* <button type="submit" onSubmit={(e)=>e.preventDefault()}> */}
                    <img src="/search.png" alt="search" />
                {/* </button> */}
                </Link>
            </form>
    </div>
  )
}

export default SearchBar