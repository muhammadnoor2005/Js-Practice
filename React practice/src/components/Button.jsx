export default function Button(props){
    console.log(props)
    return(
        <button style={{
            backgroundColor:"aqua",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer",
            color:"GrayText",
            margin:"1%",
            padding:"5px"
        }} onClick={()=>{console.log(props.clickVal)}}>{props.children}</button>
    )
}