import { Link } from "react-router-dom"
import "./error.scss"
const Error = () => {
  return (
    <div className="error">oops Error 404 this page doesn't exist 
            <Link to={"/"} className="link">Back Home Page</Link>
    </div>
  )
}

export default Error