import React from 'react';
import Items from '../items/Items'
function List({arr}){
    const innerItems = arr.map((item, index)=>{
       return <Items key={`no- ${index}`} title={item}/>
    })
    return(
        <div>
            {innerItems}
        </div>
    ) 
} 
export default List;