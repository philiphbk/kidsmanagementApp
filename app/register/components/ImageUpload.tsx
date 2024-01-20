"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import PreviewImage from "./PreviewImage";
import axios from "axios";

interface FileObject {
  size: number;
  type: string;
  // Add any other properties if needed
}

export const ImageUploadSchema = Yup.object().shape({
  image: Yup.mixed<FileObject>()
    .required("An image is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= 2000000
    )
    .test(
      "fileType",
      "Unsupported File Format",
      (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    ),
});

export default function ImageUpload() {
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: ImageUploadSchema,
    onSubmit: async () => {
      console.log(formik.values);
      const { image } = formik.values;
      const formData = new FormData();

      try {
        formData.append("image", image);
      formData.append("upload_preset", "nextjs-image-upload");
      
      }
        catch(err){
            console.log(err); 
        }
      
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="image">Image</label>
        <br/>
        <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                formik.setFieldValue("image", file);
            }}
            placeholder="Choose an image"
        />
         
        {formik.errors.image && formik.touched.image && (
          <p className=" text-red-700">{formik.errors.image}</p>
        )}
        <button type="submit">Upload</button>
      </form>
      {formik.values.image && <PreviewImage file={formik.values.image} />}
    </>
  );
}
