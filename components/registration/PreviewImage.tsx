import { useEffect, useState } from "react";
import Image from "next/image";

interface PreviewImageProps {
  file: File | null;
}



export default function PreviewImage<PreviewImageProps>({ file }) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
    } else {
      setPreviewImage(null);
    }
  }, [file]);


  return (
    <div>
      {previewImage ? (
        <Image src={previewImage} alt="preview" width="200" height="200" />
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
}