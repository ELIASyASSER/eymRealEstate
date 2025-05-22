import { useState } from "react"
import "./slider.scss"

const Slider = ({imgs}) => {
    
    const [imgIdx,setImgIdx] = useState(null)
    return (
    <section className="slider"> 
        {imgIdx !== null
        &&<div className="fullSlider" >
            <div className="arrow" onClick={()=>{
                if(imgIdx==0){
                    setImgIdx(imgs.length-1)
                }else{

                    setImgIdx(imgIdx-1)
                }
            }}>

                <img src="/arrow.png" alt="arrow" className="left" />
            </div>
            <div className="img">
                <img src={imgs[imgIdx]} alt="image" />
            </div>
            <div className="arrow" onClick={()=>{
                if(imgIdx==imgs.length-1){
                    setImgIdx(0)
                }else{

                    setImgIdx(imgIdx+1)
                }
            }}>
                <img src="/arrow.png" alt="arrow" className="right"/>
            </div>
            <div className="close" onClick={()=>setImgIdx(null)}>
                X
            </div>
        </div>}
        <div className="bigImg">
            <img src={imgs[0]} alt="big image" onClick={()=>setImgIdx(0)}/>
        </div>
        <div className="otherImgs">
            {
                imgs.slice(1).map((item,idx)=>{
                    return <img src={item} alt="img" key={idx} onClick={()=>setImgIdx(idx+1)}/>
                })
            }
        </div>
    </section>
  )
}

export default Slider