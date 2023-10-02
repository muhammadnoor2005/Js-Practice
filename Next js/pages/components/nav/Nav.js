import { Drawer, Menu } from "antd";
import { useState } from "react";
import {MenuOutlined} from "@ant-design/icons"

// export default function Nav(){
//   const [openMenu,setOpenMenu]  =useState(false);
//   return(
    
//     <div style={{height:"auto"}}>
//       <div style={{backgroundColor:"blue"}} className="menuIcon">
//         <MenuOutlined style={{fontSize:24,color:"white"}} onClick={()=>{
//           setOpenMenu(true)
//         }}/>
//       </div>
//       <span className="headerMenu">
//         <AppMenu isInline={false}/>
//       </span>
//       <Drawer open={openMenu} 
//       closable={true} 
//       bodyStyle={{backgroundColor:"blue"}} 
//       onClose={()=>{setOpenMenu(false)}}
//       placement="left">
//       <AppMenu isInline={true}/>
//       </Drawer>
      
//     </div>
//   )
// }
// function AppMenu({isInline}){
//   return(<Menu 
//       style={{backgroundColor:"blue",color:"white",borderRadius:isInline?"none":"4px"}}
//       mode={isInline ?"inline":"horizontal"}
//       items={[
//         {
//           label:"Home",
//           key:'home'
//         },
//         {
//           label:"Contact",
//           key:'cont'
//         },
//         {
//           label:"Login",
//           key:'login'
//         },
//         {
//           label:"Logout",
//           key:'logout',
//           danger:true
//         },
//       ]}></Menu>) 
// }

export default function Nav(){
  const [openMenu,setOpenMenu] = useState(false);
  return(
    <div>
      <div>
        <MenuOutlined style={{color:"white",backgroundColor:"blue"}} onClick={()=>{
          setOpenMenu(true);
        }} className="menuIcon"/>
      </div>
        <Drawer open={openMenu}
        placement="left"
        closable={true}
        onClose={()=>{
          setOpenMenu(false)
        }}
        style={{backgroundColor:"blue"}}>
          <AppMenu isInline={true}/>
        </Drawer>
      <span className="headerMenu"><AppMenu isInline={false}/>
      </span>
    </div>
  )
}
function AppMenu({isInline}){
  return(
    <Menu style={{color:"white", backgroundColor:"blue"}}
    mode={isInline?"inline":"horizontal"}
    items={
      [
        {
          label:"Home",
          key:"home"
        },
        {
          label:"Contact",
          key:"contact"
        },
        {
          label:"Login",
          key:"login"
        }
      ]
    }>
    </Menu>
  )
}