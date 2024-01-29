import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormikContext } from "formik";
import { Parent } from "@/lib/definitions/form-interfaces";

interface ImageData {
  imageBase64: string;
}

interface ImageInputUploader {
  id: string;
  ariaLabel?: string;
}

export default function ImageFileUploader({
  id,
  ariaLabel,
}: ImageInputUploader) {
  const formikContext = useFormikContext<Partial<Parent>>();

  const [imageData, setImageData] = useState<ImageData>({
    imageBase64: "",
  });

  //React.ChangeEvent<HTMLInputElement>

  const handleFileChange = (e: any) => {
    const file = e.currentTarget.files[0];

    if (file.size <= 1024 * 1024 == false) {
      alert("File Size is too large");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageData({ imageBase64: reader.result as string });
        formikContext.setFieldValue(id, reader.result as string);
      };
      formikContext.setFieldValue(id, file);
    } else {
      setImageData({ imageBase64: "" });
      // setErrorMessage("Please upload an image");
    }
  };

  useEffect(() => {
    if (imageData?.imageBase64) {
      console.log("imageData.imageFile", imageData.imageBase64);

      formikContext.setFieldValue(id, imageData.imageBase64);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  return (
    <div>
      <input
        name={id}
        id={id}
        type="file"
        accept=".jpg, .gif, .jfif, .png, .jpeg, .svg, .webp"
        className="hod_input"
        style={{
          paddingTop: "0.875rem",
          paddingBottom: "0.875rem",
        }}
        aria-label={ariaLabel}
        aria-placeholder={ariaLabel}
        onChange={handleFileChange}
        defaultValue={imageData?.imageBase64}
      />
      <span className="mt-3 flex">
        {imageData?.imageBase64 && (
          <Image
            src={imageData.imageBase64}
            alt="preview"
            width="90"
            height="90"
          />
        )}
      </span>
    </div>
  );
}
