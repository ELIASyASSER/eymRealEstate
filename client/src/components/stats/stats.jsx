import { useEffect } from "react"
import "./stats.scss"
import { useReducer } from "react"
import { toast } from "react-toastify"
import apiRequest from "../../lib/apiRequest"
import { useCallback } from "react"
const Stats = ()=>{
    const initial = {
        Visitors:0,
        Posts:0,
        Sellers:0
    }
    const reducer=(state,action)=>{
        if(action.type =="FETCH_DATA"){
            return {
                ...state,
                ...action.payload
            }
        }
        
    }
 const [state,dispatch] = useReducer(reducer,initial)

const fetchData =useCallback(async()=>{
        try {
            const res = await apiRequest("/dashboard/getStats")
            const Data = {
                    Visitors:res.data.VisitorsCount,
                    Posts:res.data.PostsCount,
                    Sellers:res.data.sellersCount
            }
            dispatch({type:"FETCH_DATA",payload:Data})
            // console.log(res)
        } catch (error) {
            console.log(error)
            toast.error("something went wrong while getting Stats")
        }
},[])

useEffect(()=>{
    
    fetchData()
},[fetchData])
 
 return <div className="stats-container">
  <div className="stat-card">
    <h2>+{state.Visitors}</h2>
    <p>Visited Our Site</p>
  </div>
  <div className="stat-card">
    <h2>+{state.Sellers}</h2>
    <p>Sellers</p>
  </div>
  <div className="stat-card">
    <h2>+{state.Posts}</h2>
    <p>Properties</p>
  </div>
  <div className="stat-card">
    <h2>+15</h2>
    <p>Companies</p>
  </div>
</div>

}

export default Stats