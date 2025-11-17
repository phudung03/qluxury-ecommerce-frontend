export const uploadToCloudinary = async (pics: any) => {
    const cloud_name = "dsheacrfc";
    const upload_preset = "dung-ercommerce";

    if (pics){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: "POST",
            body: data
        })
        const uploaded = await res.json();
        return uploaded.secure_url;
    }
    else{
        console.log("error: pics not found");
    }
    
}
