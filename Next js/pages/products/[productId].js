import { getAll } from "@/services/products";
import { useRouter } from "next/router";

export default function ProductId(props){
    const {products} = props;
    const router = useRouter();
    const {productId} = router.query;
    const id = productId - 1;
    return(
        <div> 
            <h1>{products[id].title}</h1>
            <li>{products[id].description}</li>
            <li>{products[id].price}</li>
        </div>
    );
}
export async function getServerSideProps(){
    const data = getAll();
    return{
        props:{
            products:data,
        }
    }
}