import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Parent } from "@/lib/definitions/form-interfaces";
import axios from "axios";
import Image from "next/image";

interface ImageInputUploaderProps {
  id: string;
  ariaLabel?: string;
}

const ImageFileUploader: React.FC<ImageInputUploaderProps> = ({
  id,
  ariaLabel,
}) => {
  const formikContext = useFormikContext<Partial<Parent>>();
  const [imageData, setImageData] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/api/upload", formData);

        const data = response.data;
        console.log(data && (data.paths[0] as string));
        if (data) {
          let newdata = data.paths[0] as string;
          newdata = newdata.replaceAll("\\", "/");
          setImageData(newdata);
          formikContext.setFieldValue(id, newdata);
        }
      } catch (error: any) {
        console.error("Error uploading file:", error);
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error", error.message);
        }
      }
    } else {
      setImageData("");
      // Optionally, handle no file selected case
    }
  };

  // useEffect(() => {
  //   if (imageData) {
  //     formikContext.setFieldValue(id, imageData);
  //   }
  // }, [imageData, id, formikContext]);

  return (
    <div className="input_group">
      <input
        name={id}
        id={id}
        type="file"
        accept=".jpg, .gif, .jfif, .png, .jpeg, .svg, .webp"
        aria-label={ariaLabel}
        onChange={handleFileChange}
        aria-placeholder={ariaLabel}
        className="hod_input"
        style={{
          paddingTop: "0.875rem",
          paddingBottom: "0.875rem",
        }}
      />
      <span className="input_group__label">
        {imageData && (
          <Image
            src={`/../../..${imageData}`}
            //src="../../../public/upload/children-bg.jpg"
            alt="Uploaded"
            width={90}
            height={90}
            style={{ width: "90px", height: "90px" }}
          />
        )}
      </span>
    </div>
  );
};

export default ImageFileUploader;
