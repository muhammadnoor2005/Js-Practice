import Items from '../items/Items'

function List({arr}){
    const innerItems = arr.map((index,key)=>{
        return <Items key={`index no- ${key}`} title={index}/>
    })
    return(
        <div>
            {innerItems}
        </div>
    )
}
export default List;