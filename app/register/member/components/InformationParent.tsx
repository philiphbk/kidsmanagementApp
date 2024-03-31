import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

import {
  departmentInChurchData,
  genderData,
  roleInChurchData,
  ministryData,
} from "@/lib/data/dummy-data";

// import Select, { ActionMeta, SingleValue } from "react-select";

import { OptionType } from "@/lib/definitions/form-interfaces";

import {
  ParentForm,
  RegistrationForm,
} from "@/lib/definitions/form-interfaces";
import ImageFileUploader from "../../components/ImageFileUploader";
import { ChangeEvent } from "react";

interface PropsInterface {
  errors: FormikErrors<RegistrationForm>;
  touched: FormikTouched<RegistrationForm>;
}

interface ParentProps extends ParentForm, PropsInterface {}

const ParentComponent: React.FC<ParentProps> = ({ errors, touched }) => {
  const { values, setFieldValue } = useFormikContext<RegistrationForm>();

  const optionsVal: OptionType[] = departmentInChurchData.map((dept) => ({
    value: dept.id,
    label: dept.value,
  }));

  const genderOptions = genderData.map((gender) => ({
    value: gender.id,
    label: gender.value,
  }));
  const roleOptions = roleInChurchData.map((role) => ({
    value: role.id,
    label: role.value,
  }));
  const departmentOptions = departmentInChurchData.map((dept) => ({
    value: dept.id,
    label: dept.value,
  }));

  const ministryOptions: OptionType[] = ministryData.map((ministry) => ({
    value: ministry.id,
    label: ministry.value,
  }));

  const showDepartmentDropdown =
    values.parent.roleInChurch &&
    values.parent.roleInChurch !== "director" &&
    values.parent.roleInChurch !== "pastor" &&
    values.parent.roleInChurch !== "visitor" &&
    values.parent.roleInChurch !== "member";

  const showMinistryDropdown =
    values.parent.roleInChurch === "pastor" ||
    values.parent.roleInChurch === "director";

  function handleSelectChange(fieldName: string, value: string): void {
    setFieldValue(fieldName, value);
  }

  return (
    <Box>
      {/* Example for First Name */}
      <FormControl
        isInvalid={!!errors.parent?.firstName && touched.parent?.firstName}
      >
        <FormLabel htmlFor="parent.firstName">First Name</FormLabel>
        <Field as={Input} id="parent.firstName" name="parent.firstName" />
        <FormErrorMessage>{errors.parent?.firstName}</FormErrorMessage>
      </FormControl>

      {/* Example for Last Name */}
      <FormControl
        isInvalid={!!errors.parent?.lastName && touched.parent?.lastName}
      >
        <FormLabel htmlFor="parent.lastName">Last Name</FormLabel>
        <Field as={Input} id="parent.lastName" name="parent.lastName" />
        <FormErrorMessage>{errors.parent?.lastName}</FormErrorMessage>
      </FormControl>

      {/* Example for Email */}
      <FormControl isInvalid={!!errors.parent?.email && touched.parent?.email}>
        <FormLabel htmlFor="parent.email">Email</FormLabel>
        <Field as={Input} id="parent.email" name="parent.email" />
        <FormErrorMessage>{errors.parent?.email}</FormErrorMessage>
      </FormControl>

      {/* Gender Select Example */}
      <FormControl
        isInvalid={!!errors.parent?.gender && touched.parent?.gender}
      >
        <FormLabel htmlFor="parent.gender">Gender</FormLabel>
        <Field as={Select} placeholder="Select gender" name="parent.gender">
          {genderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
        <FormErrorMessage>{errors.parent?.gender}</FormErrorMessage>
      </FormControl>

      {/* Example for Phone Number */}
      <FormControl
        isInvalid={
          !!errors.parent?.phoneNumberPrimary &&
          touched.parent?.phoneNumberPrimary
        }
      >
        <FormLabel htmlFor="parent.phoneNumber">Phone Number</FormLabel>
        <Field as={Input} id="parent.phoneNumber" name="parent.phoneNumber" />
        <FormErrorMessage>{errors.parent?.phoneNumberPrimary}</FormErrorMessage>
      </FormControl>

      {/* Role in Church Select Example */}
      <FormControl
        isInvalid={
          !!errors.parent?.roleInChurch && touched.parent?.roleInChurch
        }
      >
        <FormLabel htmlFor="parent.roleInChurch">Role in Church</FormLabel>
        <Select
          id="parent.roleInChurch"
          name="parent.roleInChurch"
          onChange={(e) => {
            const { value } = e.target;
            setFieldValue("parent.roleInChurch", e.target.value);
            if (value !== "visitor" && value !== "member") {
              setFieldValue("parent.departmentInChurch", "");
            }
          }}
          placeholder="Select role in church"
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors.parent?.roleInChurch}</FormErrorMessage>
      </FormControl>

      {/* Department Select Field */}
      {showDepartmentDropdown && (
        <FormControl
          isInvalid={
            !!errors.parent?.departmentInChurch &&
            touched.parent?.departmentInChurch
          }
        >
          <FormLabel htmlFor="parent.departmentInChurch">
            Department in Church
          </FormLabel>
          <Select
            id="parent.departmentInChurch"
            name="parent.departmentInChurch"
            placeholder="Select department"
            onChange={(e) =>
              handleSelectChange("parent.departmentInChurch", e.target.value)
            }
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.parent?.departmentInChurch}
          </FormErrorMessage>
        </FormControl>
      )}

      {/* Ministry Select Field */}
      {showMinistryDropdown && (
        <FormControl
          isInvalid={!!errors.parent?.ministry && touched.parent?.ministry}
        >
          <FormLabel htmlFor="parent.ministry">Ministry</FormLabel>
          <Select
            id="parent.ministry"
            name="parent.ministry"
            placeholder="Select ministry"
            onChange={(e) =>
              handleSelectChange("parent.ministry", e.target.value)
            }
          >
            {ministryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.parent?.ministry}</FormErrorMessage>
        </FormControl>
      )}

      {/* Means of Identification */}
      <FormControl
        isInvalid={!!errors.parent?.idType && touched.parent?.idType}
      >
        <FormLabel htmlFor="parent.idType">Means of Identification</FormLabel>
        <Select
          id="parent.idType"
          placeholder="Select your ID"
          onChange={(e) => setFieldValue("parent.idType", e.target.value)}
        >
          <option value="NIN">NIN</option>
          <option value="Driver's License">Driver&apos;s License</option>
          <option value="Voter's Card">Voter&apos;s Card</option>
        </Select>
        <FormErrorMessage>{errors.parent?.idType}</FormErrorMessage>
      </FormControl>

      {(values.parent.idType === "NIN" ||
        values.parent.idType === "Driver's License") && (
        <FormControl
          isInvalid={!!errors.parent?.idNumber && touched.parent?.idNumber}
        >
          <FormLabel htmlFor="parent.idNumber">Identification Number</FormLabel>
          <Input
            id="parent.idNumber"
            type="text"
            onChange={(e) => setFieldValue("parent.idNumber", e.target.value)}
          />
          <FormErrorMessage>{errors.parent?.idNumber}</FormErrorMessage>
        </FormControl>
      )}

      {values.parent.idType === "Voter's Card" && (
        <Box mt={4}>
          <FormLabel>Upload Voter&apos;s Card</FormLabel>
          <ImageFileUploader
            id="parent.idPhoto"
            ariaLabel="Upload Voter's Card"
          />
          <FormErrorMessage>{errors.parent?.idType}</FormErrorMessage>
        </Box>
      )}

      {/* Photograph */}
      {/* <Box mt={4}>
        <FormLabel>Upload Photo</FormLabel>
        <ImageFileUploader id="parent.photograph" ariaLabel="Upload Photo" />
        <FormErrorMessage>{String(errors.parent?.photograph)}</FormErrorMessage>
      </Box> */}
      {/* Example for ImageFileUploader */}
      <FormControl
        isInvalid={!!errors.parent?.photograph && !!touched.parent?.photograph}
      >
        <FormLabel htmlFor="parent.photograph">Upload Photo</FormLabel>
        <ImageFileUploader
          id="parent.photograph"
          ariaLabel="Upload parent image"
        />
        <FormErrorMessage>{String(errors.parent?.photograph)}</FormErrorMessage>
      </FormControl>

      {/* Address TextArea Example */}
      <FormControl
        isInvalid={!!errors.parent?.address && touched.parent?.address}
      >
        <FormLabel htmlFor="parent.address">Address</FormLabel>
        <Field as={Textarea} id="parent.address" name="parent.address" />
        <FormErrorMessage>{errors.parent?.address}</FormErrorMessage>
      </FormControl>
    </Box>
    // <section className="personal_info">
    //   {/* full name */}
    //   <div className="flex gap-x-6 flex-col md:flex-row">
    //     <div className="input_group">
    //       <label htmlFor="parent.firstName">First Name</label>
    //       <Field
    //         name="parent.firstName"
    //         id="parent.firstName"
    //         type="text"
    //         className="hod_input"
    //         aria-placeholder="Enter first name"
    //         aria-label="First Name"
    //       />
    //       <ErrorMessage name="parent.firstName" />
    //     </div>

    //     <div className="input_group">
    //       <label htmlFor="parent.lastName">Last Name</label>
    //       <Field
    //         name="parent.lastName"
    //         id="parent.lastName"
    //         type="text"
    //         className="hod_input"
    //         aria-placeholder="Enter last name"
    //         aria-label="Last Name"
    //       />
    //       <ErrorMessage name="parent.lastName" />
    //     </div>
    //   </div>

    //   {/* email */}
    //   <div className="input_group">
    //     <label htmlFor="parent.email">Email Address</label>
    //     <Field
    //       name="parent.email"
    //       id="parent.email"
    //       type="email"
    //       className="hod_input"
    //       aria-placeholder="Enter email"
    //       aria-label="Email Address"
    //     />
    //     <ErrorMessage name="parent.email" />
    //   </div>

    //   {/* gender */}
    //   <div className="input_group">
    //     <label htmlFor="parent.gender">Gender</label>
    //     <Field
    //       name="parent.gender"
    //       id="parent.gender"
    //       as="select"
    //       className="hod_input"
    //       aria-label="Gender"
    //     >
    //       <option value="" disabled>
    //         select gender
    //       </option>

    //       {genderData?.map((gender) => (
    //         <option key={gender.id} value={gender.id}>
    //           {gender.value}
    //         </option>
    //       ))}
    //     </Field>
    //     <ErrorMessage name="parent.gender" />
    //   </div>

    //   {/* role */}
    //   <div className="input_group">
    //     {errors?.parent?.roleInChurch && touched?.parent?.roleInChurch && (
    //       <span className="text-red">{errors?.parent?.roleInChurch}</span>
    //     )}
    //     <label htmlFor="parent.roleInChurch">Role in church</label>
    //     <Field
    //       name="parent.roleInChurch"
    //       id="parent.roleInChurch"
    //       as="select"
    //       className="hod_input"
    //       aria-label="Role in church"
    //       onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
    //         const { value } = e.target;
    //         setFieldValue("parent.roleInChurch", value);
    //         if (value !== "visitor" && value !== "member") {
    //           setFieldValue("parent.departmentInChurch", "");
    //         }
    //       }}
    //     >
    //       <option value="" disabled>
    //         select role in church
    //       </option>

    //       {roleInChurchData?.map((role) => (
    //         <option key={role.id} value={role.id}>
    //           {role.value}
    //         </option>
    //       ))}
    //     </Field>
    //     <ErrorMessage name="parent.roleInChurch" />
    //   </div>

    //   {/* department */}
    //   {showDepartmentDropdown && (
    //     <div className="input_group">
    //       {errors?.parent?.departmentInChurch &&
    //         touched?.parent?.departmentInChurch && (
    //           <span className="text-red">
    //             {errors?.parent?.departmentInChurch}
    //           </span>
    //         )}
    //       <label htmlFor="parent.departmentInChurch">
    //         Department in church
    //       </label>
    //       <Select
    //         name="parent.departmentInChurch"
    //         options={optionsVal}
    //         onChange={(option: OptionType | null) => {
    //           setFieldValue(
    //             "parent.departmentInChurch",
    //             option ? option.value : ""
    //           );
    //         }}
    //         classNames={{
    //           control: (state: { isFocused: any }) =>
    //             state.isFocused
    //               ? "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-bg-red-light"
    //               : "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-border-gray",
    //         }}
    //         aria-label="Department in church"
    //         placeholder="Select department in church"
    //         isClearable
    //         isSearchable
    //       />
    //       <ErrorMessage name="parent.departmentInChurch" />
    //     </div>
    //   )}

    //   {/* ministry */}
    //   {showMinistryDropdown && (
    //     <div className="input_group">
    //       {errors?.parent?.ministry && touched?.parent?.ministry && (
    //         <span className="text-red">{errors?.parent?.ministry}</span>
    //       )}
    //       <label htmlFor="parent.ministry">Ministry in church</label>
    //       <Select
    //         name="parent.ministry"
    //         options={ministryOptions}
    //         onChange={(option: OptionType | null) => {
    //           setFieldValue("parent.ministry", option ? option.value : "");
    //         }}
    //         classNames={{
    //           control: (state: { isFocused: any }) =>
    //             state.isFocused
    //               ? "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-bg-red-light"
    //               : "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-border-gray",
    //         }}
    //         aria-label="Ministry in Church"
    //         placeholder="Select Ministry in church"
    //         isClearable
    //         isSearchable
    //       />
    //       <ErrorMessage name="parent.ministry" />
    //     </div>
    //   )}

    //   {/* primary phone */}
    //   <div className="input_group">
    //     <label htmlFor="parent.phoneNumberPrimary">Primary Phone Number</label>
    //     <Field
    //       name="parent.phoneNumberPrimary"
    //       id="parent.phoneNumberPrimary"
    //       type="text"
    //       className="hod_input"
    //       aria-placeholder="Enter primary phone number"
    //       aria-label="Primary Phone Number"
    //     />
    //     <ErrorMessage name="parent.phoneNumberPrimary" />
    //   </div>

    //   {/* secondary phone */}
    //   <div className="input_group">
    //     <label htmlFor="parent.phoneNumberSecondary">
    //       Secondary Phone Number
    //     </label>
    //     <Field
    //       name="parent.phoneNumberSecondary"
    //       id="parent.phoneNumberSecondary"
    //       type="text"
    //       className="hod_input"
    //       aria-placeholder="Enter secondary phone number"
    //       aria-label="Secondary Phone Number"
    //     />
    //     <ErrorMessage name="parent.phoneNumberSecondary" />
    //   </div>

    //   {/* means of identification */}
    //   <div className="input_group">
    //     <label htmlFor="parent.idType">Means of Identification</label>
    //     <Field
    //       name="parent.idType"
    //       as="select"
    //       className="hod_input"
    //       onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
    //         setFieldValue("parent.idType", e.target.value);
    //       }}
    //     >
    //       <option value="" disabled>
    //         Select your ID
    //       </option>
    //       <option value="NIN">NIN</option>
    //       <option value="Driver's License">Driver&apos;s License</option>
    //       <option value="Voter's Card">Voter&apos;s Card</option>
    //     </Field>
    //     <ErrorMessage name="parent.idType" />
    //   </div>

    //   {(values.parent.idType === "NIN" ||
    //     values.parent.idType === "Driver's License") && (
    //     <div className="input_group">
    //       <label htmlFor="parent.idNumber">Identification Number</label>
    //       <Field
    //         name="parent.idNumber"
    //         type="text"
    //         className="hod_input"
    //         aria-placeholder="Enter identification number"
    //         aria-label="Identification Number"
    //       />
    //       <ErrorMessage name="parent.idNumber" />
    //     </div>
    //   )}

    //   {values.parent.idType === "Voter's Card" && (
    //     <div className="input_group">
    //       <label htmlFor="parent.idPhoto">Upload Voter&apos;s Card</label>
    //       <ImageFileUploader
    //         id="parent.idPhoto"
    //         ariaLabel="Upload Voter's Card"
    //       />
    //       <ErrorMessage name="parent.idPhoto" />
    //     </div>
    //   )}

    //   {/* photograph */}
    //   <div className="input_group">
    //     <label htmlFor="parent.photograph">Upload Photo</label>
    //     <ImageFileUploader id="parent.photograph" ariaLabel="Upload Photo" />

    //     <ErrorMessage name="parent.photograph" />
    //   </div>

    //   <div className="input_group">
    //     <label htmlFor="parent.address">Address</label>
    //     <Field
    //       name="parent.address"
    //       id="parent.address"
    //       as="textarea"
    //       className="hod_input"
    //       aria-placeholder="Enter address"
    //       aria-label="Address"
    //     />
    //     <ErrorMessage name="parent.address" />
    //   </div>
    // </section>
  );
};

export default ParentComponent;
