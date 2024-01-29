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

import Select, { SingleValue } from "react-select";

import {
  Department,
  OptionType,
  MySelectComponentProps,
} from "@/lib/definitions/form-interfaces";

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

interface ParentProps extends Parent, PropsInterface {}

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
  console.log("errors", errors);
  console.log("touched", touched);

  // const formikContext = useFormikContext<Partial<Parent>>();

  // const [imageData, setImageData] = useState<ImageData>({ base64String: "" });

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (file) {

  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setImageData({ base64String: reader.result as string });

  //       formikContext.setFieldValue("parent.idPhoto", reader.result as string);
  //     };
  //   } else {
  //     setImageData({ base64String: "" });
  //   }
  // };

  // useEffect(() => {
  //   if (imageData?.base64String) {
  //     formikContext.setFieldValue("parent.idPhoto", imageData.base64String as string);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [idPhoto, imageData]);
  const { setFieldValue } = useFormikContext();
  // const [field] = useField("parent.departmentInChurch");

  const options: OptionType[] = departmentInChurchData.map((dept) => ({
    value: dept.id,
    label: dept.value,
  }));

  // const handleChange = (selectedOption: SingleValue<OptionType>) => {
  //   setFieldValue("parent.departmentInChurch", selectedOption?.value);
  // };

  return (
    <section className="personal_info">
      {/* full name */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor="parent.firstName">First Name</label>
          <Field
            name="parent.firstName"
            id="parent.firstName"
            type="text"
            className="hod_input"
            aria-placeholder="Enter first name"
            aria-label="First Name"
          />
          <ErrorMessage name="parent.firstName" />
          {/* {errors?.Parent?.firstName
                        && touched?.Parent?.firstName ? (
                        <div>{errors?.Parent?.firstName}</div>
                    ) : null} */}
        </div>

        <div className="input_group">
          <label htmlFor="parent.lastName">Last Name</label>
          <Field
            name="parent.lastName"
            id="parent.lastName"
            type="text"
            className="hod_input"
            aria-placeholder="Enter last name"
            aria-label="Last Name"
          />
          {/* <ErrorMessage name="parent.lastName" /> */}
        </div>
      </div>

      {/* email */}
      <div className="input_group">
        <label htmlFor="parent.email">Email Address</label>
        <Field
          name="parent.email"
          id="parent.email"
          type="email"
          className="hod_input"
          aria-placeholder="Enter email"
          aria-label="Email Address"
        />
        <ErrorMessage name="parent.email" />
      </div>

      {/* gender */}
      <div className="input_group">
        <label htmlFor="parent.gender">Gender</label>
        <Field
          name="parent.gender"
          id="parent.gender"
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
        <ErrorMessage name="parent.gender" />
      </div>

      {/* role */}
      <div className="input_group">
        <label htmlFor="parent.roleInChurch">Role in church</label>
        <Field
          name="parent.roleInChurch"
          id="parent.roleInChurch"
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
        <ErrorMessage name="parent.roleInChurch" />
      </div>

      {/* ministry */}
      <div className="input_group">
        {errors.parent?.departmentInChurch && (
          <span className="text-red">{errors.parent?.departmentInChurch}</span>
        )}
        <label htmlFor="parent.departmentInChurch">Department in church</label>
        <Select
          // {...field}
          options={options}
          // defaultValue={options[0].value}
          onChange={(e) => {
            setFieldValue("parent.departmentInChurch", e?.value);
          }}
          name="parent.departmentInChurch"
          classNames={{
            control: (state) =>
              state.isFocused
                ? "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-bg-red-light"
                : "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-border-gray",
          }}
          aria-label="Department in church"
          placeholder="Select department in church"
          isClearable
          isSearchable
        />
        <ErrorMessage name="parent.departmentInChurch" />
      </div>

      {/* primary phone */}
      <div className="input_group">
        <label htmlFor="parent.phoneNumberPrimary">Primary Phone Number</label>
        <Field
          name="parent.phoneNumberPrimary"
          id="parent.phoneNumberPrimary"
          type="text"
          className="hod_input"
          aria-placeholder="Enter primary phone number"
          aria-label="Primary Phone Number"
        />
        <ErrorMessage name="parent.phoneNumberPrimary" />
      </div>

      {/* secondary phone */}
      <div className="input_group">
        <label htmlFor="parent.phoneNumberSecondary">
          Secondary Phone Number
        </label>
        <Field
          name="parent.phoneNumberSecondary"
          id="parent.phoneNumberSecondary"
          type="text"
          className="hod_input"
          aria-placeholder="Enter secondary phone number"
          aria-label="Secondary Phone Number"
        />
        <ErrorMessage name="parent.phoneNumberSecondary" />
      </div>

      {/* means of id */}
      <div className="input_group">
        <label htmlFor="parent.idName">Means of identification</label>
        <Field
          name="parent.idName"
          id="parent.idName"
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
        <ErrorMessage name="parent.idName" />
      </div>

      {/* id number - not referenced in interface */}
      <div className="input_group">
        <label htmlFor="parent.idNumber">Identification Number</label>
        <Field
          name="parent.idNumber"
          id="parent.idNumber"
          type="text"
          className="hod_input"
          aria-placeholder="Enter identification number"
          aria-label="Identification Number"
        />
        <ErrorMessage name="parent.idNumber" />
      </div>

      {/* photograph */}
      <div className="input_group">
        <label htmlFor="parent.idPhoto">Upload Photo</label>
        <ImageFileUploader id="parent.idPhoto" ariaLabel="Upload Photo" />

        <ErrorMessage name="parent.idPhoto" />
      </div>
    </section>
  );
};

export default ParentComponent;
