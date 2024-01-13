"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import PreviewImage from "./PreviewImage";
import axios from "axios";

export default function ImageUpload() {
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required("Image is required!")
        .test("fileSize", "Image size should be less than 1MB", (value) => {
          return value && value.size <= 1000000;
        })
        .test("fileType", "Only images are allowed", (value) => {
          return value && value.type.includes("image");
        }),
    }),
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
                formik.setFieldValue("image", e.target.files[0]);
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
