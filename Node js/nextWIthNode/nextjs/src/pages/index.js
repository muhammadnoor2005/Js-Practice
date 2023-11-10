import { useEffect, useState } from "react";
import axios from "./axios";
import Form from "@/components/Form";


export default function Home() {
  const [products,setProducts] = useState([]);
  const [editBool,setEditBool] = useState(false);
  const [editId,setEditId] = useState("");

  const getUrl = async () => {
    try{
      const res = await axios.get("/products");
      setProducts(res.data);
    }catch(err){
      console.log(err.message);
    }
  }
 
  const delProduct = async(id) => {
    try{
      const res = await axios.delete(`/products/del/${id}`);

    }catch(err){
      console.log(err.message);
    }
  }

  const editProduct = async(id) => {
    setEditId(id);
    setEditBool(true);
    // console.log(editBool)
  }

  useEffect(() => {
    getUrl();
    console.log("df")
  },[]);

  if(products.length === 0){
    return <div>
      <h1>Add Product</h1>
      <Form buttonName={"Add"} action={"http://localhost:3000/products/add/done"}/>
    </div>
  }

  const productsMap = products.map((p,index) => {
    return(
      <div key={p.id} style={{
        margin: "1%",
        backgroundColor:"crimson",
        color:"white",
        width:"10%",
        padding:"1%",
        borderRadius:"7px",
        textAlign:"center"
      }}>
        <p>{p.name}</p>
        <br/>
        <div style={{
          display:"flex",
          justifyContent:"space-between"
        }}>
          <button onClick={()=>{delProduct(p.id)}}>Delete</button>
          <button onClick={()=>{editProduct(p.id)}}>Edit</button>
        </div>
      </div>
    )
  })
  return (
    <>
      <h1>Add Product</h1>
      <Form buttonName={"Add"} action={"http://localhost:3000/products/add/done"}/>
      <div>
        <div style={{
           display:"flex",
          //  justifyContent:"space-evenly",
           flexWrap:"wrap"
        }}>{productsMap}</div>

        <div style={{display : editBool ? "flex":"none"}}>
          <Form buttonName={"Edit"} action={`http://localhost:3000/products/edit/done/${editId}?_method=PATCH`}/>
        </div>
      </div>
      
    </>
  )
}
