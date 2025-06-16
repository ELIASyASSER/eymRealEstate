
import { useRef, useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import apiRequest from "../../lib/apiRequest";
import CloudinaryUploadWidget from "../../components/CloudinaryUploadWidget/cloudinaryUploadWidget";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function NewPostPage() {
    const desc = useRef(null);
    const [err,setErr]  =useState("")
  const [publicId, setPublicId] = useState('');
  const [images,setImages]  =useState([])
  const [done,setDone]  =useState(false)
    const navigate = useNavigate()
    // console.log(err)

  //upload configuration
   
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDENAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESETS;
  
    const uwConfig = {
        cloudName,
        uploadPreset,
        multiple: true,
        folder: 'estateFolder',
        eager:null
        // Uncomment and modify as needed:
        // cropping: true,
        // showAdvancedOptions: true,
        // source: ['local', 'url'],
        // tags: ['users', 'profile'],
        // context: { alt: 'user_uploaded' },
        // clientAllowedFormats: ['images'],
        // maxImageWidth: 2000,
        // theme: 'purple',
    };
    //react quill configuration
    const modules= {toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ]}
      const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];



    const handleSubmit = async(e) => {
        e.preventDefault()
        setErr("")
        const data = new FormData(e.target)
        const {
            title, price, address,
            city, bedroom, bathroom,
            latitude, longitude, type,
            property, utility, pet,
            fees, size, school, bus, restaurant

        } = Object.fromEntries(data)
            if(images.length <4){
                toast.error("please upload 4 images ")
                return;
            }

        try {

            const res = await apiRequest.post("/posts",{
                postData:{
                    title:title,
                    price:parseInt(price),
                    address:address,
                    city:city,
                    bedroom:parseInt(bedroom),
                    bathroom:parseInt(bathroom),
                    property:property,
                    type:type,
                    latitude:parseFloat(latitude),
                    longitude:parseFloat(longitude),
                    images:images
                    
                },
                postDetail:{
                    utility:utility,
                    pet:pet,
                    fees:fees,
                    size:parseInt(size),
                    bus:parseInt(bus),
                    school:parseInt(school),
                    restaurant:parseInt(restaurant),
                    desc:desc.current.getEditor().getText()
                }
            })


            toast.success("Your Post Has been uploaded successfully")
            setDone(true)
            // console.log(res.data,'result')
            setTimeout(() => {
                navigate("/getPost/"+res.data.id)
            }, 4000);
            
        } catch (error) {
            console.log(error.message)
            setErr(error)
            setDone(false)
        }
    }
    return (
        <div className="newPostPage">
            <div className="formContainer">
                <h1>Add New Post</h1>
                <div className="wrapper">
                    <form  onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" required />
                        </div>
                        <div className="item">
                            <label htmlFor="price" >Price</label>
                            <input id="price" required name="price" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input id="address" name="address" type="text" required/>
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme="snow" ref={desc}  className="quill" modules={modules} formats={formats} required/>
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" required />
                        </div>
                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input min={1} id="bedroom" name="bedroom" type="number"  required/>
                        </div>
                        <div className="item">
                            <label htmlFor="bathroom" required>Bathroom Number</label>
                            <input min={1} id="bathroom" name="bathroom" type="number" required/>
                        </div>
                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" name="latitude" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" name="longitude" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type">
                                <option value="rent" defaultChecked>
                                    Rent
                                </option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="type">Property</label>
                            <select name="property">
                                <option value="appartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="duplix">Duplix</option>
                                <option value="villa">villa</option>


                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select name="utility">
                                <option value="owner">Owner is responsible</option>
                                <option value="tenant">Tenant is responsible</option>
                                <option value="shared">Shared</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="pet">Pet Policy</label>
                            <select name="pet">
                                <option value="allowed">Allowed</option>
                                <option value="not-allowed">Not Allowed</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="income">Property Fees Policy</label>
                            <input
                                id="income"
                                name="fees"
                                type="text"
                                placeholder="Income Policy"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="size">Total Size (sqft)</label>
                            <input min={0} max={3000} id="size" name="size" type="number"  required/>
                        </div>
                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input min={0} id="school" name="school" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="bus">bus</label>
                            <input min={0} id="bus" name="bus" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="restaurant">Restaurant</label>
                            <input min={0}  id="restaurant" name="restaurant" type="number" />
                        </div>
                        <button className={`sendButton ${done?"done":""}`} disabled={done} type="submit"> Add</button>
                        {/* {err&&<span>{err}</span>} */}
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                <ToastContainer/>
                <div className="upload">
                    <CloudinaryUploadWidget
                    uwConfig={uwConfig} 
                    setState={setImages}
                    setPublicId={setPublicId}
                    />
                </div>
                <div className="imgs">
                    {images.map((img,idx)=>{
                        return <img src={img} alt="photo" key={idx} />
                    })}
                </div>

            </div>
        </div>
    );
}

export default NewPostPage;