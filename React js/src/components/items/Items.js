import React from 'react';
import {useState} from "react"
function Items(props){ 
    const [title,stateFunc] = useState(props.title);
    const updateIt = ()=>{
        stateFunc("Updated");
    }
    return(
        <div>
            {title}
            <button onClick={updateIt}>update</button>
        </div>
    )
} 
export default Items;