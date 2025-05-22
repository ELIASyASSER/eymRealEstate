import "./list.scss"
// import {listData} from "../../lib/dummyData" //this is dummy data 
import Card from "../card/card"
const List = ({posts}) => {
  return (
    <section className="list">
        {
            posts?.map((item,idx)=>{
                return <Card key={idx} item={item}/>
            })
        }

    </section>
  )
}

export default List