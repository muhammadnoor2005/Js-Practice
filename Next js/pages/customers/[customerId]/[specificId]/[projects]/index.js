import { useRouter } from "next/router"
import Link from "next/link"
import dummyData from "../../../../dummyData.json"

export default function(){
    const router = useRouter();
    const {specificId,projects} = router.query;
    const projectNames = dummyData[projects?projects:0].projects.map((val,index)=>{
        return <div key={index}><Link href={`customers/${specificId}/${val.projectName}/${index}`}>{val.projectName}</Link></div>
    })
    return(
        <div>
            <h1>{specificId}'s projects list</h1>
            {projectNames}
        </div>
    )
} 