import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useField,
  useFormikContext,
} from "formik";

import {
  departmentInChurchData,
  genderData,
  meansOfId,
  roleInChurchData,
} from "@/lib/data/dummy-data";
import ImageUploader from "../../components/ImageUploader";

import Select, { SingleValue } from "react-select";

import { Department, OptionType, MySelectComponentProps } from "@/lib/definitions/form-interfaces";

import {
  Parent,
  RegistrationFormValues,
} from "@/lib/definitions/form-interfaces";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageFileUploader from "../../components/ImageFileUploader";
// import { FormikPropsInterface } from "./RegisterMemberComponent";

interface PropsInterface {
  errors: FormikErrors<RegistrationFormValues>;
  touched: FormikTouched<RegistrationFormValues>;
}

interface ImageData {
  base64String: string | null;
}




interface ParentProps extends Parent, PropsInterface { }


const ParentComponent: React.FC<ParentProps> = ({
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
  // const formikContext = useFormikContext<Partial<Parent>>();

  // const [imageData, setImageData] = useState<ImageData>({ base64String: "" });

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (file) {
  //     console.log(e, file);

  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       console.log(reader.result);
  //       setImageData({ base64String: reader.result as string });

  //       formikContext.setFieldValue("Parent.idPhoto", reader.result as string);
  //     };
  //   } else {
  //     setImageData({ base64String: "" });
  //   }
  // };

  // useEffect(() => {
  //   if (imageData?.base64String) {
  //     formikContext.setFieldValue("Parent.idPhoto", imageData.base64String as string);
  //     console.log(idPhoto);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [idPhoto, imageData]);
  const { setFieldValue } = useFormikContext();
  const [field] = useField('Parent.departmentInChurch');

  const options: OptionType[] = departmentInChurchData.map(dept => ({
    value: dept.id,
    label: dept.value,
  }));

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setFieldValue('Parent.departmentInChurch', selectedOption?.value);
  };

  return (
    <section className="personal_info">
      {/* full name */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor="Parent.firstName">First Name</label>
          <Field
            name="Parent.firstName"
            id="Parent.firstName"
            type="text"
            className="hod_input"
            aria-placeholder="Enter first name"
            aria-label="First Name"
          />
          <ErrorMessage name="Parent.firstName" />
          {/* {errors?.Parent?.firstName
                        && touched?.Parent?.firstName ? (
                        <div>{errors?.Parent?.firstName}</div>
                    ) : null} */}
        </div>

        <div className="input_group">
          <label htmlFor="Parent.lastName">Last Name</label>
          <Field
            name="Parent.lastName"
            id="Parent.lastName"
            type="text"
            className="hod_input"
            aria-placeholder="Enter last name"
            aria-label="Last Name"
          />
          <ErrorMessage name="Parent.lastName" />
        </div>
      </div>

      {/* email */}
      <div className="input_group">
        <label htmlFor="Parent.email">Email Address</label>
        <Field
          name="Parent.email"
          id="Parent.email"
          type="email"
          className="hod_input"
          aria-placeholder="Enter email"
          aria-label="Email Address"
        />
        <ErrorMessage name="Parent.email" />
      </div>

      {/* gender */}
      <div className="input_group">
        <label htmlFor="Parent.gender">Gender</label>
        <Field
          name="Parent.gender"
          id="Parent.gender"
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
        <ErrorMessage name="Parent.gender" />
      </div>

      {/* role */}
      <div className="input_group">
        <label htmlFor="Parent.roleInChurch">Role in church</label>
        <Field
          name="Parent.roleInChurch"
          id="Parent.roleInChurch"
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
        <ErrorMessage name="Parent.roleInChurch" />
      </div>

      {/* ministry */}
      <div className="input_group">
        <label htmlFor="Parent.departmentInChurch">
          Department in church
        </label>
        <Select
        {...field}
        options={options}
        onChange={handleChange}
        className="hod_input"
        aria-label="Department in church"
        placeholder="Select department in church"
        isClearable
        isSearchable
      />
        {/* <Field
          name="Parent.departmentInChurch"
          id="Parent.departmentInChurch"
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
        </Field> */}
        <ErrorMessage name="Parent.departmentInChurch" />
      </div>

      {/* primary phone */}
      <div className="input_group">
        <label htmlFor="Parent.phoneNumberPrimary">
          Primary Phone Number
        </label>
        <Field
          name="Parent.phoneNumberPrimary"
          id="Parent.phoneNumberPrimary"
          type="text"
          className="hod_input"
          aria-placeholder="Enter primary phone number"
          aria-label="Primary Phone Number"
        />
        <ErrorMessage name="Parent.phoneNumberPrimary" />
      </div>

      {/* secondary phone */}
      <div className="input_group">
        <label htmlFor="Parent.phoneNumberSecondary">
          Secondary Phone Number
        </label>
        <Field
          name="Parent.phoneNumberSecondary"
          id="Parent.phoneNumberSecondary"
          type="text"
          className="hod_input"
          aria-placeholder="Enter secondary phone number"
          aria-label="Secondary Phone Number"
        />
        <ErrorMessage name="Parent.phoneNumberSecondary" />
      </div>

      {/* means of id */}
      <div className="input_group">
        <label htmlFor="Parent.idName">
          Means of identification
        </label>
        <Field
          name="Parent.idName"
          id="Parent.idName"
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
        <ErrorMessage name="Parent.idName" />
      </div>

      {/* id number - not referenced in interface */}
      <div className="input_group">
        <label htmlFor="Parent.idNumber">
          Identification Number
        </label>
        <Field
          name="Parent.idNumber"
          id="Parent.idNumber"
          type="text"
          className="hod_input"
          aria-placeholder="Enter identification number"
          aria-label="Identification Number"
        />
        <ErrorMessage name="Parent.idNumber" />
      </div>

      {/* photograph */}
      <div className="input_group">
        <label htmlFor="Parent.idPhoto">Upload Photo</label>
        <ImageFileUploader id="Parent.idPhoto" ariaLabel="Upload Photo" />

        <ErrorMessage name="Parent.idPhoto" />
      </div>
    </section>
  );
};

export default ParentComponent;
