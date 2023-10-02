import { useEffect, useState } from "react";

export default function UploadImage(){
    const [image,setImage] = useState('');
    const [base64Url,setBase64Url] = useState('');
    const [decodeUrl,setDecodeUrl] = useState();

    const getbase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBase64Url(reader.result);
        };
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);     
    };

    if(image !== ''){
        getbase64(image);
    };   

    useEffect(() => {
        if(base64Url){
            const base64Data = base64Url.split(",")[1];
            const decodedImg = `data:image/jpg;base64,${base64Data}`;
            setDecodeUrl(decodedImg);
        }
    },[base64Url]);
    return(
        <div>
            <input type="file" name="file" onChange={handleImage} />
            {decodeUrl && <img src={decodeUrl} alt={"decoded"}/>}
        </div>
    );
};