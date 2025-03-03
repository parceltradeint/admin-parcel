import axios from "axios";

export const ImageHosting = async (image) => {
    const formData = new FormData();
    formData.append("file", image); 
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET); // Use environment variable

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Image upload error:", error.response ? error.response.data : error.message);
        throw error; 
    }
};
