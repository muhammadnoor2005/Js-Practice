import { useRouter } from "next/router"
import dummyData from "../../../../../dummyData"

export default function(){
    const router = useRouter();
    const {projects, projectId} = router.query;
    // const projectValidate = dummyData.flatMap(person => person.projects).find(project => project.projectName === projectId);

    console.log(projectId)
    console.log(router.query)
    // console.log(dummyData[0].projects[0].projectName)
    return(
        <div>
            <h1>{projects}'s projects detail page</h1>
            <h2>{projectId}'s details</h2>
            {/* <h3>{projectValidate}</h3> */}
        </div>
    )
} 