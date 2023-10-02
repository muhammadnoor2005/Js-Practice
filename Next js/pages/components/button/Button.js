
function Button({onAdd}){
    let itemName = "";
    const onSubmitHandler = (event)=>{
        event.preventDefault()
        onAdd(itemName)
    } 
    const onChangeHandler = (event)=>{
        event.preventDefault();
        itemName = event.target.value;
    }
    return(
        <form onSubmit={onSubmitHandler}>
            <input type="text" onChange={onChangeHandler}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default Button