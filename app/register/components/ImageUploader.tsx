import Image from "next/image";
import { useState } from "react";

interface ImageData {
  imageFile: any;
}

interface ImageInputUploader {
  id?: string;
  ariaLabel?: string;
}

export default function ImageUploader({ id, ariaLabel }: ImageInputUploader) {
  const [imageData, setImageData] = useState<ImageData>({ imageFile: null });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageData({ imageFile: file });
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // setImageData({ imageFile: reader.result as string });
      };
    } else {
      setImageData({ imageFile: null });
    }
  };

  return (
    <div>
      <input
        name={id}
        id={id}
        type="file"
        accept="image/*"
        className="hod_input"
        style={{
          paddingTop: "14px",
          paddingBottom: "14px",
        }}
        aria-label={ariaLabel}
        aria-placeholder={ariaLabel}
        onChange={handleImageChange}
      />

      <span>
        {imageData.imageFile && (
          <Image
            src={imageData.imageFile}
            alt="preview"
            width="90"
            height="90"
          />
        )}
      </span>
    </div>
  );
}
