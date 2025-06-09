import { useState } from 'react'
import { useGlobalContext } from '../../context/authContext'
import './page.scss'
import apiRequest from "../../lib/apiRequest"
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'



import CloudinaryUploadWidget from '../../components/CloudinaryUploadWidget/cloudinaryUploadWidget';




const UpdatePage = () => {

  // Configuration
  const cloudName = 'djnnp85lv';
  const uploadPreset = 'realestate';//cloudinary/setting/upload-presets

  // State
  const [publicId, setPublicId] = useState('');
  

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    multiple: false,
    maxImageFileSize: 2000_000,//2mb
    folder: 'estateFolder',
    eager:null
    // Uncomment and modify as needed:
    // cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    // clientAllowedFormats: ['images'],
    // maxImageWidth: 2000,
    // theme: 'purple',
  };


  const navigate = useNavigate()
  const [err,setErr] = useState("")
  const {currentUser,updateUser} = useGlobalContext()
  const [avatar,setAvatar] = useState([]) 
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setErr("")
    const data =new FormData(e.target)
    const {username,email,password} = Object.fromEntries(data)
    //or const username =data.get("username")
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`,{

        username,email,
        password,avatar:avatar[0]

      })

      updateUser(res.data)
      toast.success("information updated ")
      setTimeout(() => {
        navigate("/")
      }, 4000);
      

    } catch (error) {
      console.log(error)
      setErr(error.response.data?.message||"Failed to update user details")

    }

  }
    return (
      <section className="profile">
      <ToastContainer/>
      <div className="formContainer">

        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <input name="username" type="text" placeholder="Username" required minLength={4} maxLength={20} defaultValue={currentUser.username} />
          <input name="email" type="email" placeholder="Email" defaultValue={currentUser.email}/>
          <input name="password" type="password" placeholder="Password"  minLength={4} maxLength={20}/>
          <button disabled={false}>Update</button>
        {err&&<span>{err}</span>}


        </form>
      </div>
      <div className="imgContainer">
        <img src={avatar[0]||currentUser.avatar|| "/avatar.png"} alt="avatar" />
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId}
        setState={setAvatar} />

      </div>
    </section>
  )
}

export default UpdatePage