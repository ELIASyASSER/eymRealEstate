import "./userPosts.scss"
import UserCard from "../userCard/UserCard"
import { Link } from "react-router-dom"
import { MdExitToApp } from "react-icons/md"
const UserPosts = ({posts}) => {
  return (
      <>
          <header>
            <Link to="/admin">
          <img src="/project-3.jpg" alt="dummyLogoColored" />
          </Link>
          <div className="userPosts">
            <img src={"/logo.png"} alt="userlogo" />
            <p>User Posts</p>
          </div>
          </header>
          <section className="adminList">
              
              <Link className="exit" to={"/admin"}>
               <MdExitToApp size={60}/>
              </Link>
              
              {

                  posts?.map((item,idx)=>{
                      return <UserCard key={idx} item={item} />
                  })
              }

          </section>
     </>
  )
}

export default UserPosts