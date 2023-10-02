import { getAll } from "@/services/products";
import Link from "next/link";
import { resolve } from "styled-jsx/css";


export default function Products(props){
    const {products} = props;
    const list = products.map((val)=>{
        return(<li key={val.id}><Link  href={`products/${val.id}`}>{val.title}</Link></li>)
    })
    return(
        <ul><b>{list}</b></ul>
    )
}
export async function getStaticProps(){
    const data = getAll();
    return{
        props:{
            products:data
        }
    }
}
// async function harry(){
//     let k = new Promise((req,res)=>{
//         setTimeout(()=>{
//             req("27 deg");
//         },2000)
//     })
//     let i = new Promise((req,res)=>{
//         setTimeout(()=>{
//             req("32 deg");
//         },6000);
//     })
//     console.log("Fetching k please wait...")
//     await k
//     console.log("Fetched k");
//     console.log("Fetching i please wait...");
//     await i;
//     console.log("Fetched i");
//     return [i,k];
// }

// console.log("Welcome");
// let a = harry();
// a.then((value)=>{
//     console.log(value);
// });

// function count(times,cb){
//     const interval = setInterval(function(){
//         console.log("Called");
//     },1000);
//     setTimeout(function(){
//         clearTimeout(interval);
//         cb();
//     },times*1000)
// }
// count(3,function(){
//     count(3,function(){
//         console.log("done")
//     })
// });

// function count(times){
//     return new Promise((resolve,reject)=>{
//     const interval = setInterval(()=>{
//             console.log("called");
//         },1000);
//         setTimeout(()=>{
//             clearInterval(interval);
//             reject("chala ja")
//         },times*1000);
//     });
// };
// count(3).then((data)=>{console.log(data)}).catch(()=>{console.log("error")});


function count(times){
    return new Promise((resolve,reject)=>{
        const interval = setInterval(()=>{
            console.log("Called");
        },1000);
        setTimeout(()=>{
            clearInterval(interval);
            reject();
        },1000 * times)
    })
}
count(3).then(()=>{
    console.log("Done")
}).catch(()=>{
    console.log("ABort")
});