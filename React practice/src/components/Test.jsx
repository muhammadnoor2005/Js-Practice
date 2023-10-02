import {useParams} from "react-router-dom";

export default function Test(){
    const {name} = useParams();
    console.log(useParams());
    return(
        <div>
            {name}
        </div>
    );
}