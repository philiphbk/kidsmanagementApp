import Image from "next/image";
import { useState } from "react";

interface ImageData {
  base64String: string | null;
}

interface ImageInputUploader {
  id?: string;
  ariaLabel?: string;
}

export default function ImageUploader({ id, ariaLabel }: ImageInputUploader) {
  const [imageData, setImageData] = useState<ImageData>({ base64String: null });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log(e, file);
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
        {imageData.base64String && (
          <Image
            src={imageData.base64String}
            alt="preview"
            width="90"
            height="90"
          />
        )}
      </span>
    </div>
  );
}
