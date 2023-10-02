import { Link,Outlet } from 'react-router-dom';

export default function About(){
    return(
        <div>
            About page
            <Link to="nestedAbout">Nested About</Link>
            <Outlet/>
        </div>
    )
}