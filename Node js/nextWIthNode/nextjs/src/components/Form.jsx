export default function Form(props){
    const reloadStop = (e) => {
        e.preventDefault();
    }
    // console.log(props)
    return(
        <div>
            <form action={props.action} method="POST" >
                <input type="text" name="name" />
                <button>{props.buttonName}</button>
            </form>
        </div>
    )
}