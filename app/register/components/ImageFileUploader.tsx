import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormikContext } from "formik";
import { ParentInformation } from "@/lib/definitions/form-interfaces";

interface ImageData {
    base64String: string;
}

interface ImageInputUploader {
    id: string;
    ariaLabel?: string;
}

export default function ImageFileUploader({ id, ariaLabel }: ImageInputUploader) {
    const formikContext = useFormikContext<Partial<ParentInformation>>();

    const [imageData, setImageData] = useState<ImageData>({ base64String: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const MAX_FILE_SIZE = 1000000; // 1MB
    const validFileExtensions = [
        "image/jpg",
        "image/gif",
        "image/jfif",
        "image/png",
        "image/jpeg",
        "image/svg",
        "image/webp",
    ];

    const checkIfFileIsAccepted = (file?: any) => {
        let valid = true;

        if (validFileExtensions.includes(file.type)) {
            if (file.size > MAX_FILE_SIZE) {
                valid = false;
                setErrorMessage("Image must be less than 1MB")
            } else {
                valid = true;
                setErrorMessage("")
            }
        } else {
            valid = false;
            setErrorMessage(`${file.type} format not supported, please upload another image`)
        }

        return valid;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            console.log(e, file);
            let isValid = checkIfFileIsAccepted(file);

            if (isValid) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    console.log(reader.result);
                    setImageData({ base64String: reader.result as string });

                    formikContext.setFieldValue(id, reader.result as string);
                };
            }
        } else {
            setImageData({ base64String: "" });
            setErrorMessage("Please upload an image")
        }
    };

    useEffect(() => {
        if (imageData?.base64String) {
            formikContext.setFieldValue(id, imageData.base64String as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageData]);

    return (
        <div>
            <input
                name={id}
                id={id}
                type="file"
                accept="image/*"
                className="hod_input"
                style={{
                    paddingTop: "0.875rem",
                    paddingBottom: "0.875rem",
                }}
                aria-label={ariaLabel}
                aria-placeholder={ariaLabel}
                onChange={handleFileChange}
                defaultValue={imageData?.base64String as string}
            />
            {errorMessage || errorMessage !== "" ? (
                <p className="mt-3">{errorMessage}</p>
            ) : (
                <span className="mt-3 flex">
                    {imageData?.base64String && (
                        <Image
                            src={imageData.base64String}
                            alt="preview"
                            width="90"
                            height="90"
                        />
                    )}
                </span>
            )}
        </div>
    );
}
