import styles from '@/styles/Home.module.css'
import List from './components/list/List'
import { useEffect, useState } from 'react'
// import Button from './components/button/Button'
import Link from 'next/link'
import Head from 'next/head'
import { getAll } from '@/services/products'

import Nav from './components/nav/Nav' 
import App from './components/nav/input'
export default function Home(props) {
  // const {title, todos} = props;
  // if (!todos){
  //   return <div>Loading...</div>
  // }
  // const todosList = todos.map((todo)=>{
  //   return(<li key={todo.id}>
  //       <p>{todo.title}</p>
  //     </li>)
  // })

  // const [updatedArr, stateFunc] = useState(["item1","item2"]);
  // const onAddHandler = (val)=>{
  //   stateFunc((prevVal)=>{
  //     return [...prevVal, val]
  //   })
  // }
  const {title, products} = props;
  if (!products){
    return <div>Loading...</div>
  }

  const productName = products.map((product)=>{
    return(<li key={product.id}>
        <p>{product.title}</p>
      </li>)
  })
  
  const [data,setData] = useState(1)
  const update = ()=>{
    setData((oldValue)=>{
      const d = oldValue + 1;
      return d;
    })
  }
  const [data1,setData1] = useState(1);
  const update1 = ()=>{
    setData1((oldValue)=>{
    const d = oldValue + 1;
    return d;
    })
  }
  useEffect(()=>{
    console.log("used");

    const timer = setTimeout(() => {
      console.log("hello");
    }, 500);

    return()=>{
      clearTimeout(timer);
    }
  },[data1]);
  // try {
  //   let json = '{"name":"jaja","age":30}';
  //   let user = JSON.parse(json);
  //   if(!user.name){
  //     throw new Error ("error hai")
  //   }
  //   console.log(user.name)
  // } catch (error) {
  //   // console.log(error.name,error.message,error.stack);
  //   console.log(error)
  // }finally{
  //   console.log("hello finally");
  // };

  return (
    <div>
       <Head>
        <title>home </title>
        <meta name="description" content="this is dummy page"/>
      </Head>
      <Nav/>
      <App/>
      {data}
      <button onClick={update}>Click</button>
      {data1}
      <button onClick={update1}>Click 2</button>
      {/* <List arr={updatedArr}/> */}
      {/* <Button onAdd={onAddHandler}/>  */}
        {/* <h1>Home page</h1>
        <h1>Our customers</h1>
        <Link href='/customers'> Go to customers</Link>
      {/* {title}
      {todosList} */}
      <>{productName}</>
      
    </div>
    )
}

// export async function getStaticProps(){
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
//   const data = await response.json();
//   return{
//     props:{
//       title: "Hello",
//       todos: data,
//     }
//   };
// }
// export async function getServerSideProps(context){
//   console.log(context);
//   const {todoId} = params;
//   const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
//   const data = await response.json();
//   return{
//     props:{
//       title:"Hello",
//       todo:data
//     },
//     // notFound:true
//     // revalidate:10 seconds
//   }
// }

export async function getStaticProps(){
  const data = getAll()
  console.log(data)
  return{
    props:{
      title: "Hello",
      products: data,
    }
  };
}