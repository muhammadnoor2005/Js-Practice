import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from './Button';
import SassTest from './SassTest';

import store from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { SOAP_BUY,SOAP_SELL } from '../store/actions';
import UploadImage from './UploadImage';

// export default function Home(){
//     const [bool,setBool] = useState(false);

//     const [data,setData] =useState();
//     useEffect(()=>{
//         fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => setData(json));
//     },[]);

//     const updateDiv = ()=>{
//         bool?setBool(false):setBool(true);
//     };

//     // const count = (num) =>{
//     //     return new Promise((resolve,reject)=>{
//     //         const interval = setInterval(()=>{
//     //             console.log("Called");
//     //         },1000);
//     //         setTimeout(()=>{
//     //             clearInterval(interval);
//     //             reject();
//     //         },num * 1000);
//     //     })
//     // }
//     // count(3).catch(()=>{console.log("Error")});

    
//     // const count = (num,callback)=>{
//     //     const interval = setInterval(()=>{
//     //         console.log("Called");
//     //     },1000);
//     //    setTimeout(()=>{
//     //     clearInterval(interval);
//     //     callback();
//     //    },num*1000);
//     // };
//     // count(5,()=>{
//     //     console.log("Done");
//     // });
//     return(
//         <>
//             {
//                 bool?<div>
//                     The first Div
//                 </div>:
//                 <div>
//                     The second div
//                 </div>

//             }
//             {
//                 data? <div>
//                     {data.title}
//                 </div>:
//                 <div>
//                     Loading...
//                 </div>
//             }
//             <button onClick={updateDiv}>Change Div</button>
//             <SassTest/>
//         </>
        
//     )
// }
// export default function Home(){
    
//     const [person, setPerson] = useState({
//         name: 'Niki de Saint Phalle',
//         artwork: {
//             title: 'Blue Nana',
//             city: 'Hamburg',
//             image: 'https://i.imgur.com/Sd1AgUOm.jpg',
//         }
//     });
//     const handleNameChange = (e)=>{
//         setPerson({
//             ...person,
//             name:e.target.value,
//         });
//     };
//     const handeTitleChange = (e)=>{
//         setPerson({
//             ...person,
//             artwork:{
//                 ...person.artwork,
//                 title:e.target.value,
//             }
//         });
//     };
//     return(
//         <>
//             <div>
//                 Home Page
//             </div>
//             <Link to="/about">About</Link>
//             <div>
//                 <input type='text' onChange={handeTitleChange} value={person.artwork.title}/>
//                 <>{person.artwork.title}</>
//             </div>
//         </>
//     )
// }

// export default function Home(){
//     const [firstName, setFName] = useState('');
//     const [lastName, setLName] = useState('');
//     const [fullName,setFullName] = useState('');

//     const handleFName = (e)=>{
//         setFName(e.target.value);
//         setFullName(e.target.value + lastName)
//     }
//     const handleLName = (e)=>{
//         setLName(e.target.value)
//         setFullName(firstName + e.target.value)
//     }
//     return(
//         <div>
//             <input type='text' onChange={handleFName} />
//             <input type='text' onChange={handleLName} />
//             <p>{fullName}</p>
//             <Button clickVal={"name"}>button 1</Button>
//             <Button clickVal={"game"}>button 2</Button>
//         </div>
//     )
// }

export default function Home(){
    const store = useSelector(state => state.soap);
    const dispatch = useDispatch();

    const sellHandler = () => {
        dispatch({type:SOAP_SELL});
    }
    const buyHandler = () => {
        dispatch({type:SOAP_BUY,payload:10});
    }
    return(
        <div>
            <div>{store}</div>
            <div>
                <button onClick={sellHandler}>SELL</button>
                <button onClick={buyHandler}>BUY</button>
            </div>
            <div>
                <UploadImage/>
            </div>
        </div>
    )
}