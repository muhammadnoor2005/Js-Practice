import { useState } from 'react';
import List from './components/list/List';
import AddItem from './components/AddItem/AddItem';
import './App.css';
import AuthContext from './context/AuthContext';
import AuthHandler from './components/AuthHandler/AuthHandler';

import { useEffect } from 'react';
import React from 'react';


// function App(){
//   const bool = true;
//   const [updatedArr,arrFunc] = useState(["item1", "item2"]);
//   // const onAddHandler = () =>{
//   // }
//   // const onAddHandler = (data)=>{
//   //   arrFunc([...updatedArr, data]);
//   // } 
//   const onAddHandler = (data)=>{
//     arrFunc((prevState)=>{
//       return [...prevState, data];
//     });
//   }
//   return (
//     <div className ={`my-class ${ bool && "App"}`}
//       style={{backgroundColor : bool ? "gray":"purple"}}>
//       <AddItem onAdd={onAddHandler}/>
//       <List arr={updatedArr}/>
      
//     </div>
//   )
// }


function App(){
  const [whenAuthenticated, onAuthentication] = useState(false);
  useEffect(()=>{
    console.log("called")
    const isStorageLoggedin = localStorage.getItem("isLoggedin") === "1";
    onAuthentication(isStorageLoggedin)
    
  },[])
  const onLogin = ()=>{
    onAuthentication(true)
    localStorage.setItem("isLoggedin","1")
  }
  const onLogout = ()=>{
    onAuthentication(false);
    localStorage.setItem("isLoggedin","0")
  }
  return(
    <div>
      <AuthContext.Provider value={{
        isLoggedin:whenAuthenticated,
        onLogin,
        onLogout 
      }}>
        <AuthHandler/>
      </AuthContext.Provider>
    </div>
  )

}

export default App;
