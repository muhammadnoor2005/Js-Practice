import {Routes as AppRoute,Route} from "react-router-dom"
import About from "../components/About"
import Home from "../components/Home"
import Test from "../components/Test"
import NestedAbout from "../components/NestedAbout"

// export default function Routes(){
//     return(
//     <AppRoute>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/about" element={<About/>}>
//             <Route path="nestedAbout" element={<NestedAbout/>}/>
//         </Route>
//         <Route path="/:id" element={<Test/>}/>
//     </AppRoute>
//     );
// };
export default function Routes(){
    return(
        <AppRoute>
            <Route path="/" element={<Home/>}/>
            <Route path="about" element={<About/>}>
                <Route path="nestedAbout" element={<NestedAbout/>}/>
            </Route>
            <Route path="/:name" element={<Test/>}/>
        </AppRoute>
    )
}

