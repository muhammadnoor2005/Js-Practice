import { useRouter } from "next/router"
import Link from "next/link";
import dummyData from "../../../dummyData.json"

export default function(){
    const router = useRouter();
    const {customerId,specificId} = router.query;
    console.log(router.query);
    if (!specificId){
        return<div>Loading...</div>
    }
    return(
        <div>
            <h1>{customerId}'s detail Page</h1>
            <div>{dummyData[specificId].name}</div>
            <div>{dummyData[specificId].identity}</div>
            <div><Link href={`${customerId}/${specificId}`}>Click to view {dummyData[specificId].name}'s projects</Link></div>
        </div>
    )
} 