import "./listPage.scss"

import Filters from "../../components/filter/filter";
import Card from "../../components/card/card";

import Map from "../../components/map/map";
import {  useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";

const ListPage = () => {
  // const data = listData;
  const [posts,setPosts] = useState([]);
  const[loading,setLoading] = useState(false);
  const [error,setError]  = useState(null);
  const [hasMore,setHasMore] = useState(true)
  const [searchParams,setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page"))||1
  useEffect(()=>{
    const fetchPosts = async()=>{
      try {
        setLoading(true)
        const res = await apiRequest(`/posts?page=${currentPage}`)
        const data = await res.data
        if(currentPage==1){
          setPosts(data.posts)

        }else{
          setPosts((prev)=>[...prev,...data.posts])
        }
        setHasMore(data.hasMore)
      } catch (error) {
        console.log(error)
        setError("failed to get Posts try again later ...")

      }finally{
        setLoading(false)
      }
    }


    fetchPosts()
  },[currentPage])

  if(loading){
    return <div>Loading Please Wait ...</div>
  }
  return (
    <main className="listPage">
      <section className="leftContent">
        <div className="wrapper">

        <Filters/>

      {
        
        posts.map((post,idx)=>{
          return <Card key={idx} item={post}/>
        })
      }
      
      {!loading &&hasMore&&<button className="loadMore" onClick={()=>setSearchParams({page:currentPage+1})}>Load More</button>}

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