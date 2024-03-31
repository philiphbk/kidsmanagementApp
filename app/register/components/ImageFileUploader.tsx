// import { useState } from "react";
// import { useFormikContext } from "formik";
// import { Parent } from "@/lib/definitions/form-interfaces";
// import axios from "axios";
// import Image from "next/image";

// interface ImageInputUploaderProps {
//   id: string;
//   ariaLabel?: string;
// }

// const ImageFileUploader: React.FC<ImageInputUploaderProps> = ({
//   id,
//   ariaLabel,
// }) => {
//   const formikContext = useFormikContext<Partial<Parent>>();
//   const [imageData, setImageData] = useState<string>("");

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await axios.post("/api/upload", formData);

//         const data = response.data;
//         if (data) {
//           let newdata = data.paths[0] as string;
//           newdata = newdata.replaceAll("\\", "/");
//           setImageData(newdata);
//           formikContext.setFieldValue(id, newdata);
//         }
//       } catch (error: any) {
//         console.error("Error uploading file:", error);
//         if (error.response) {
//           console.error(error.response.data);
//           console.error(error.response.status);
//           console.error(error.response.headers);
//         } else if (error.request) {
//           console.error(error.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.error("Error", error.message);
//         }
//       }
//     } else {
//       setImageData("");
//       // Optionally, handle no file selected case
//     }
//   };

//   return (
//     <div className="input_group">
//       <input
//         name={id}
//         id={id}
//         type="file"
//         accept=".jpg, .gif, .jfif, .png, .jpeg, .svg, .webp"
//         aria-label={ariaLabel}
//         onChange={handleFileChange}
//         aria-placeholder={ariaLabel}
//         className="hod_input px-3 py-3"
//       />
//       <span className="input_group__label">
//         {imageData && (
//           <Image
//             src={`/../../..${imageData}`}
//             alt="Uploaded"
//             width={90}
//             height={90}
//             style={{ width: "90px", height: "90px" }}
//           />
//         )}
//       </span>
//     </div>
//   );
// };

// export default ImageFileUploader;
import React, { useState, useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useFormikContext } from "formik";
import { Box, Image, useToast, Text, Center, VStack } from "@chakra-ui/react";
import axios from "axios";

interface ImageFileUploaderProps {
  id: string;
  ariaLabel?: string;
}

const ImageFileUploader: React.FC<ImageFileUploaderProps> = ({
  id,
  ariaLabel,
}) => {
  const { setFieldValue, values } = useFormikContext<any>(); // Use the appropriate form context type
  const [imagePreview, setImagePreview] = useState<string>(values[id] || "");
  const toast = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Generate preview
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setImagePreview(result);
        };
        reader.readAsDataURL(file);

        // Prepare for upload
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post("/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          // Assuming API response includes the path
          const imagePath = response.data.path;
          setFieldValue(id, imagePath);
        } catch (error: any) {
          console.error("Error uploading file:", error);
          toast({
            title: "Failed to upload image",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setImagePreview("");
          setFieldValue(id, "");
        }
      }
    },
    [id, setFieldValue, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*" as unknown as Accept,
  });

  return (
    <VStack spacing={4}>
      <Center
        {...getRootProps()}
        p={4}
        w="full"
        bg={isDragActive ? "gray.100" : "gray.50"}
        border="2px dashed"
        borderColor={isDragActive ? "blue.300" : "gray.200"}
        borderRadius="md"
        cursor="pointer"
      >
        <input {...getInputProps()} aria-label={ariaLabel} />
        <Text>
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here, or click to select files"}
        </Text>
      </Center>
      {imagePreview && (
        <Box boxSize="90px" overflow="hidden" borderRadius="md">
          <Image src={imagePreview} alt="Preview" objectFit="cover" />
        </Box>
      )}
    </VStack>
  );
};

export default ImageFileUploader;
