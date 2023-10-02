import Link from "next/link";
import dummyData from "../dummyData.json";

export default function(){
    const users = dummyData.map((val,index)=>{
        return <div key={index}><Link href={`/customers/${val.name}/${index}`}>{val.name}</Link></div>
    })
    return(
        <div>
            <h1>Our Customers</h1>
            <ul>
                {/* <li><Link href="customers/ABC">ABC</Link></li>
                <li><Link href="customers/XYZ">XYZ</Link></li> */}
            </ul>
            {users}
        </div>
    );
};