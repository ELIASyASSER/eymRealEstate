import { useSearchParams } from "react-router-dom";
import "./filter.scss";
import { useState } from "react";
const Filters = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    
    const [query,setQuery] = useState({
        type:searchParams.get("type")||"",
        city:searchParams.get("city")|| "",
        minPrice:searchParams.get("minPrice")||0,
        maxPrice:searchParams.get("maxPrice")||1000000000,
        property:searchParams.get("props")||""
    })

        const handleChange = (e)=>{
            setQuery({
                ...query,
                [e.target.name] : e.target.value
            })
        }
        const handleFilter =()=>{
            setSearchParams(query)
        }

    return (
        <form className="filters">
            <h3>Search Results For {searchParams.get("location")}</h3>
            <div className="location">
                <label htmlFor="city">Location</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City Location"
                    className="cityLocation"
                    onChange={handleChange}
                    defaultValue={query.city}
             />
            </div>
            <div className="options">
                <div className="item">
                    <label htmlFor="option">Type</label>
                    <select name="type" id="option" onChange={handleChange} defaultValue={query.type}>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div className="item">
                        <label htmlFor="props">Properties</label>
                        <select name="property" id="props" onChange={handleChange} defaultValue={query.property}>
                            <option value="appartment">Appartment</option>
                            <option value="duplix">Duplix</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                        </select>
                </div>
                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input type="number" id="minPrice" placeholder="Min Price" name="minPrice" onChange={handleChange} defaultValue={query.minPrice} />
                </div>
                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input type="number" id="maxPrice" placeholder="Max Price" name="maxPrice" onChange={handleChange} defaultValue={query.maxPrice}/>

                </div>
                
                    <button className="btn" onClick={handleFilter}>
                        <img src="/search.png" alt="" />
                    </button>
            </div>

        </form>
    );
};

export default Filters;
