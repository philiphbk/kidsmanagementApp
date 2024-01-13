import { useState } from 'react'

interface ImageData {
    base64String: string | null;
}


export default function ImageUploader() {

    const [imageData, setImageData] = useState<ImageData>({ base64String: null });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageData({ base64String: reader.result as string });
            };
        } else {
            setImageData({ base64String: null });
        }
    };

  return (
    <div>
        <input type="file" accept='image/*' onChange={handleImageChange} />
        {imageData.base64String && (
            <img src={imageData.base64String} alt="preview" width="200" height="200" />
        )}
    </div>
  )
}