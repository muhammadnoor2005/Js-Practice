import Head from "next/head"

export default function Home({todo}){
  // if(!todo){
  //   return<div>Loading...</div>
  // }
  return(
    <div>
      <Head>
        <title>home </title>
        <meta name="description" content="this is dummy page"/>
      </Head>
      <h1>Todos detail page</h1>
      {/* <p>{todo.title}</p> */}
    </div>
  )
}

// export async function getStaticProps({params}){
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

// export async function getStaticPaths(){
//   return{
//     paths:[
//       {
//         params:{
//           todoId:"1",
//         }
//       }
//     ],
//     fallback:"blocking" // blocking
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