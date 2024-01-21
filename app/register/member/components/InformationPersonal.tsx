import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";

import {
  departmentInChurchData,
  genderData,
  meansOfId,
  roleInChurchData,
} from "@/lib/data/dummy-data";
import ImageUploader from "../../components/ImageUploader";

import {
  ParentInformation,
  RegistrationFormValues,
} from "@/lib/definitions/form-interfaces";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { FormikPropsInterface } from "./RegisterMemberComponent";

interface PropsInterface {
  errors: FormikErrors<RegistrationFormValues>;
  touched: FormikTouched<RegistrationFormValues>;
}

interface ImageData {
  base64String: string | null;
}

interface PersonalInformationProps extends ParentInformation, PropsInterface {}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  firstName,
  lastName,
  email,
  gender,
  roleInChurch,
  departmentInChurch,
  phoneNumberPrimary,
  phoneNumberSecondary,
  idName,
  idPhoto,
  errors,
  touched,
}) => {
  const formikContext = useFormikContext<ParentInformation>();

  const [imageData, setImageData] = useState<ImageData>({ base64String: null });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const { name, value, id } = e.target;

    if (file) {
      console.log(e, file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageData({ base64String: reader.result as string });
        console.log(reader.result);

        // formikContext.setFieldValue("parentInformation.idPhoto", reader.result);
        formikContext.setFieldValue(id, value);
      };
    } else {
      setImageData({ base64String: null });
      //   formikContext.setFieldValue("parentInformation.idPhoto", null);
    }
  };

  useEffect(() => {
    console.log(idPhoto);
  }, [idPhoto, imageData]);

  return (
    <section className="personal_info">
      {/* full name */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor="parentInformation.firstName">First Name</label>
          <Field
            name="parentInformation.firstName"
            id="parentInformation.firstName"
            type="text"
            className="hod_input"
            aria-placeholder="Enter first name"
            aria-label="First Name"
          />
          <ErrorMessage name="parentInformation.firstName" />
          {/* {errors?.parentInformation?.firstName
                        && touched?.parentInformation?.firstName ? (
                        <div>{errors?.parentInformation?.firstName}</div>
                    ) : null} */}
        </div>

        <div className="input_group">
          <label htmlFor="parentInformation.lastName">Last Name</label>
          <Field
            name="parentInformation.lastName"
            id="parentInformation.lastName"
            type="text"
            className="hod_input"
            aria-placeholder="Enter last name"
            aria-label="Last Name"
          />
          <ErrorMessage name="parentInformation.lastName" />
        </div>
      </div>

      {/* email */}
      <div className="input_group">
        <label htmlFor="parentInformation.email">Email Address</label>
        <Field
          name="parentInformation.email"
          id="parentInformation.email"
          type="email"
          className="hod_input"
          aria-placeholder="Enter email"
          aria-label="Email Address"
        />
        <ErrorMessage name="parentInformation.email" />
      </div>

      {/* gender */}
      <div className="input_group">
        <label htmlFor="parentInformation.gender">Gender</label>
        <Field
          name="parentInformation.gender"
          id="parentInformation.gender"
          as="select"
          className="hod_input"
          aria-label="Gender"
        >
          <option value="" disabled>
            select gender
          </option>

          {genderData?.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.value}
            </option>
          ))}
        </Field>
        <ErrorMessage name="parentInformation.gender" />
      </div>

      {/* role */}
      <div className="input_group">
        <label htmlFor="parentInformation.roleInChurch">Role in church</label>
        <Field
          name="parentInformation.roleInChurch"
          id="parentInformation.roleInChurch"
          as="select"
          className="hod_input"
          aria-label="Role in church"
        >
          <option value="" disabled>
            select role in church
          </option>

          {roleInChurchData?.map((role) => (
            <option key={role.id} value={role.id}>
              {role.value}
            </option>
          ))}
        </Field>
        <ErrorMessage name="parentInformation.roleInChurch" />
      </div>

      {/* ministry */}
      <div className="input_group">
        <label htmlFor="parentInformation.departmentInChurch">
          Department in church
        </label>
        <Field
          name="parentInformation.departmentInChurch"
          id="parentInformation.departmentInChurch"
          as="select"
          className="hod_input"
          aria-label="Department in church"
        >
          <option value="" disabled>
            select department in church
          </option>

          {departmentInChurchData?.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.value}
            </option>
          ))}
        </Field>
        <ErrorMessage name="parentInformation.departmentInChurch" />
      </div>

      {/* primary phone */}
      <div className="input_group">
        <label htmlFor="parentInformation.phoneNumberPrimary">
          Primary Phone Number
        </label>
        <Field
          name="parentInformation.phoneNumberPrimary"
          id="parentInformation.phoneNumberPrimary"
          type="text"
          className="hod_input"
          aria-placeholder="Enter primary phone number"
          aria-label="Primary Phone Number"
        />
        <ErrorMessage name="parentInformation.phoneNumberPrimary" />
      </div>

      {/* secondary phone */}
      <div className="input_group">
        <label htmlFor="parentInformation.phoneNumberSecondary">
          Secondary Phone Number
        </label>
        <Field
          name="parentInformation.phoneNumberSecondary"
          id="parentInformation.phoneNumberSecondary"
          type="text"
          className="hod_input"
          aria-placeholder="Enter secondary phone number"
          aria-label="Secondary Phone Number"
        />
        <ErrorMessage name="parentInformation.phoneNumberSecondary" />
      </div>

      {/* means of id */}
      <div className="input_group">
        <label htmlFor="parentInformation.idName">
          Means of identification
        </label>
        <Field
          name="parentInformation.idName"
          id="parentInformation.idName"
          as="select"
          className="hod_input"
          aria-label="Means of identification"
        >
          <option value="" disabled>
            select means of identification
          </option>

          {meansOfId?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </Field>
        <ErrorMessage name="parentInformation.idName" />
      </div>

      {/* id number - not referenced in interface */}
      <div className="input_group">
        <label htmlFor="parentInformation.identificationNumber">
          Identification Number
        </label>
        <Field
          name="parentInformation.identificationNumber"
          id="parentInformation.identificationNumber"
          type="text"
          className="hod_input py-3.5"
          aria-placeholder="Enter identification number"
          aria-label="Identification Number"
        />
        <ErrorMessage name="parentInformation.identificationNumber" />
      </div>

      {/* photograph */}
      <div className="input_group">
        <label htmlFor="parentInformation.idPhoto">Upload Photo</label>
        {/* <ImageUploader id="parentInformation.idPhoto" ariaLabel="Upload Photo" /> */}
        <Field
          name="parentInformation.idPhoto"
          id="parentInformation.idPhoto"
          type="file"
          accept="image/*"
          className="hod_input py-3.5"
          aria-label="Upload Photo"
          onChange={handleFileChange}
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

        <ErrorMessage name="parentInformation.idPhoto" />
      </div>
    </section>
  );
};

export default PersonalInformation;
