import "./listPage.scss"

import Filters from "../../components/filter/filter";
import Card from "../../components/card/card";

import Map from "../../components/map/map";
import {  useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

const ListPage = () => {
  // const data = listData;
  const [posts,setPosts] = useState([]);
  const[loading,setLoading] = useState(false);
  const [error,setError]  = useState(false);

  const data = useLoaderData()
  
  useEffect(()=>{

    const fetchPosts = async()=>{
      try {
        setLoading(true)
        setPosts(data)
      } catch (error) {
        console.log(error)
        setError("failed to get Posts try again later ...")

      }finally{
        setLoading(false)
      }
    }


    fetchPosts()
  },[data])
  if(loading){
    return <div>Loading Please Wait ...</div>
  }
  return (
    <main className="listPage">
      <section className="leftContent">
        <div className="wrapper">

        <Filters/>
      {
        
        posts.map((post)=>{
          return <Card key={post.id} item={post}/>
        })
      }
      {posts.length ==0&& <h1>
        No Items Found 
    </h1>
    }


      

      {
        error&&<div>{error}</div>
      }

        </div>
      </section>

      <section className="mapContainer">
        <Map item={posts} />
      </section>
    </main>
  )
}

export default ListPage