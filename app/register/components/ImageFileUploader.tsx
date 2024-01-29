import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormikContext } from "formik";
import { Parent } from "@/lib/definitions/form-interfaces";

interface ImageData {
  imageFile: any;
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

  const [imageData, setImageData] = useState<ImageData>({ imageFile: "", imageBase64: ""});

  //React.ChangeEvent<HTMLInputElement>

  const handleFileChange = (e: any) => {
    const file = e.currentTarget.files[0];
    
    formikContext.setFieldValue(id, file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageData({ imageFile: file, imageBase64: "" });
        setImageData({ base64String: reader.result as string });
        // formikContext.setFieldValue(id, reader.result as string);
        // console.log("file", file);
      };
      setImageData({ base64String: reader.result as string });
      formikContext.setFieldValue(id, file);
    } else {
      setImageData({ base64String: "" });
      // setErrorMessage("Please upload an image");
    }
  };

  useEffect(() => {
    if (imageData?.imageFile) {
      console.log("imageData.imageFile", imageData.imageFile);

      formikContext.setFieldValue(id, imageData.imageFile);
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
        defaultValue={imageData?.imageFile}
      />
      {/* <span className="mt-3 flex">
        {imageData?.imageFile && (
          <Image
            src={imageData.imageFile}
            alt="preview"
            width="90"
            height="90"
          />
        )}
      </span> */}
    </div>
  );
}
