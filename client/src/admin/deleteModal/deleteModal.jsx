import { toast } from "react-toastify";
import { useAdminContext } from "../../context/adminContext";
import apiRequest from "../../lib/apiRequest";
import "./modal.scss";
import { useNavigate } from "react-router-dom";

const DeleteModal = () => {
    const {state,dispatch} = useAdminContext()
    const navigate = useNavigate()
    const handleDelete = async()=>{
      
      try {
          let res;
            if(state.deleteType == 'user'){
              res = await apiRequest.delete(`/dashboard/deleteUser/${state.userId}`)
              toast.success(res.data.message,{delay:"1200"})

              
              return;

            } 
            if(state.deleteType =='post'){
              res = await apiRequest.delete(`/dashboard/deletePost/${state.postId}`)
              toast.success(res.data.message,{delay:"1200"})
              
              setTimeout(() => {  
                navigate("/admin")
              }, 1200);
              
              return;
            }

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }finally{
          dispatch({type:"CLOSE_MODAL"})
        }
    }
    return <div className="confirm-box">
    <div className="icon">
    {/* <!-- Trash Icon (SVG) --> */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
  <h2>Are you sure?</h2>
  <p>Do you really want to continue?<br/>This action cannot be undone.</p>
  <div class="button-group">
    <button className="cancel-btn" type="button" onClick={()=>{
      dispatch({type:"CLOSE_MODAL"})
  
  }}>Cancel</button>
    <button className="confirm-btn" type="button"onClick={handleDelete}>Confirm</button>
  </div>
</div>
}

export default DeleteModal