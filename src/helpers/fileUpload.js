export const fileUpload = async(file) => {
    const cloudUrl = `https://api.cloudinary.com/v1_1/ignaciomc20/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'react-journal');

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
    } catch (error) {
        console.log(error);
        throw error;
    }



}