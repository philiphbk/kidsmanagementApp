import { useState, ChangeEvent } from "react";

import {
  ErrorMessage,
  Field,
  useField,
  useFormikContext,
  FormikErrors,
} from "formik";

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";

import {
  branchAndCenterData,
  departmentInChurchData,
  genderData,
  relationshipData,
  relationshipTypeData,
  roleInChurchData,
  ministryData,
  caregiverRelationshipTypeWithParent,
  caregiverRelationshipWithParentData,
} from "@/lib/data/dummy-data";

import {
  CaregiverForm,
  RegistrationForm,
} from "@/lib/definitions/form-interfaces";

import ImageFileUploader from "../../components/ImageFileUploader";

const CaregiverComponent = ({ index }: { index: number }) => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<RegistrationForm>();
  const [currentType, setCurrentType] = useState("parent");
  const [currentCaregiverType, setCurrentCaregiverType] = useState("");
  const [otherType, setOtherType] = useState({
    status: false,
    value: "",
  });

  // Conversion of your data to format suitable for Chakra UI Select component
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
  const ministryOptions = ministryData.map((ministry) => ({
    value: ministry.id,
    label: ministry.value,
  }));

  const showDepartmentDropdown =
    values.caregiver[index].roleInChurch &&
    values.caregiver[index].roleInChurch !== "director" &&
    values.caregiver[index].roleInChurch !== "pastor" &&
    values.caregiver[index].roleInChurch !== "visitor" &&
    values.caregiver[index].roleInChurch !== "member";

  const showMinistryDropdown =
    values.caregiver[index].roleInChurch === "director" ||
    values.caregiver[index].roleInChurch === "pastor";

  const [currentLocation, setCurrentLocation] = useState("lagos");

  const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value, id } = e.target;

    if (id.includes("relationshipWithChildType")) {
      setCurrentType(value);
      setOtherType({ ...otherType, status: false });
      setFieldValue(`caregiver[${index}].relationshipWithChild`, "");
      setFieldValue(name, value);
    }
    if (id.includes("caregiverGuardian")) {
      if (value === "other") {
        setOtherType({ ...otherType, status: true });
        setFieldValue(
          `caregiver[${index}].relationshipWithChildType`,
          "guardian"
        );
        setFieldValue(name, value);
      } else {
        setOtherType({ ...otherType, status: false });
        setFieldValue(`caregiver[${index}].relationshipWithChild`, value);
      }
    }
    if (id.includes("caregiverRelationshipTypeWithParent")) {
      setCurrentCaregiverType(value);
      setFieldValue(
        `caregiver[${index}].caregiverRelationshipWithParentData`,
        value
      );
      setFieldValue(name, value);
    }

    // if (id.includes("churchLocation")) {
    //   setCurrentLocation(value);
    //   setFieldValue(`caregiver[${index}].churchBranchInLocation`, "");
    // }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue(`caregiver[${index}].relationshipWithChild`, value);
  };

  const caregiverRelationshipFiltered =
    caregiverRelationshipWithParentData?.find(
      (CaregiverRelationship) =>
        CaregiverRelationship.type === currentCaregiverType
    );

  const relationshipDataFiltered = relationshipData?.find(
    (relationship) => relationship.type === currentType
  );

  const branchAndCenterFiltered = branchAndCenterData?.find(
    (branch) => branch.locationId === currentLocation
  );

  if (!values.caregiver || values.caregiver.length <= index) {
    return <span>No caregiver data available</span>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {/* Full name section */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .firstName && touched.caregiver?.[index]?.firstName
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].firstName`}>
          First Name
        </FormLabel>
        <Input
          id={`caregiver[${index}].firstName`}
          name={`caregiver[${index}].firstName`}
          onChange={(e) =>
            setFieldValue(`caregiver[${index}].firstName`, e.target.value)
          }
        />
        <FormErrorMessage>
          {/* {(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).firstName} */}
        </FormErrorMessage>
      </FormControl>

      {/* Last name section */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .lastName && touched.caregiver?.[index]?.lastName
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].lastName`}>
          Last Name
        </FormLabel>
        <Input
          id={`caregiver[${index}].lastName`}
          name={`caregiver[${index}].lastName`}
          onChange={(e) =>
            setFieldValue(`caregiver[${index}].lastName`, e.target.value)
          }
        />
        <FormErrorMessage>
          {/* {(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).lastName} */}
        </FormErrorMessage>
      </FormControl>

      {/* Email */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).email &&
      //   touched.caregiver?.[index]?.email
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].email`}>Email</FormLabel>
        <Input
          id={`caregiver[${index}].email`}
          name={`caregiver[${index}].email`}
          onChange={(e) =>
            setFieldValue(`caregiver[${index}].email`, e.target.value)
          }
        />
        <FormErrorMessage>
          {/* {(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).email} */}
        </FormErrorMessage>
      </FormControl>

      {/* Gender Select */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).gender &&
      //   touched.caregiver?.[index]?.gender
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].gender`}>Gender</FormLabel>
        <Select
          id={`caregiver[${index}].gender`}
          placeholder="Select gender"
          onChange={(e) =>
            setFieldValue(`caregiver[${index}].gender`, e.target.value)
          }
        >
          {genderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {/* {(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).gender} */}
        </FormErrorMessage>
      </FormControl>

      {/* Role in Church Select */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .roleInChurch && touched.caregiver?.[index]?.roleInChurch
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].roleInChurch`}>
          Role in Church
        </FormLabel>
        <Select
          id={`caregiver[${index}].roleInChurch`}
          name={`caregiver[${index}].roleInChurch`}
          placeholder="Select role in church"
          onChange={(e) => {
            const { value } = e.target;
            setFieldValue(`caregiver[${index}].roleInChurch`, e.target.value);
            if (value !== "visitor" && value !== "member") {
              setFieldValue(`caregiver[${index}].departmentInChurch`, "");
            }
          }}
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {/* <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .roleInChurch
          }
        </FormErrorMessage> */}
      </FormControl>

      {/* Department in Church Select */}
      {showDepartmentDropdown && (
        <FormControl
        // isInvalid={
        //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
        //     .departmentInChurch &&
        //   touched.caregiver?.[index]?.departmentInChurch
        // }
        >
          <FormLabel htmlFor={`caregiver[${index}].departmentInChurch`}>
            Department in Church
          </FormLabel>
          <Select
            id={`caregiver[${index}].departmentInChurch`}
            name={`caregiver[${index}].departmentInChurch`}
            placeholder="Select department in church"
            onChange={(e) =>
              setFieldValue(
                `caregiver[${index}].departmentInChurch`,
                e.target.value
              )
            }
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {/* <FormErrorMessage>
            {
              (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
                .departmentInChurch
            }
          </FormErrorMessage> */}
        </FormControl>
      )}

      {/* Ministry Select */}
      {showMinistryDropdown && (
        <FormControl
        // isInvalid={
        //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
        //     .ministry && touched.caregiver?.[index]?.ministry
        // }
        >
          <FormLabel htmlFor={`caregiver[${index}].ministry`}>
            Ministry
          </FormLabel>
          <Select
            id={`caregiver[${index}].ministry`}
            name={`caregiver[${index}].ministry`}
            placeholder="Select ministry"
            onChange={(e) =>
              setFieldValue(`caregiver[${index}].ministry`, e.target.value)
            }
          >
            {ministryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {/* <FormErrorMessage>
            {
              (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
                .ministry
            }
          </FormErrorMessage> */}
        </FormControl>
      )}

      {/* Phone Number */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .phoneNumberPrimary &&
      //   touched.caregiver?.[index]?.phoneNumberPrimary
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].phoneNumberPrimary`}>
          Phone Number
        </FormLabel>
        <Input
          id={`caregiver[${index}].phoneNumberPrimary`}
          name={`caregiver[${index}].phoneNumberPrimary`}
          type="number"
          onChange={(e) => {
            const { value } = e.target;
            if (value.length > 11) {
              setFieldValue(
                `caregiver[${index}].phoneNumberPrimary`,
                e.target.value.toString()
              );
            }
          }}
        />
        {/* <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .phoneNumberPrimary
          }
        </FormErrorMessage> */}
      </FormControl>

      {/* Alternative Phone Number */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .phoneNumberSecondary &&
      //   touched.caregiver?.[index]?.phoneNumberSecondary
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].phoneNumberSecondary`}>
          Alternative Phone Number
        </FormLabel>
        <Input
          id={`caregiver[${index}].phoneNumberSecondary`}
          name={`caregiver[${index}].phoneNumberSecondary`}
          type="number"
          onChange={(e) => {
            const { value } = e.target;
            if (value.length > 11) {
              setFieldValue(
                `caregiver[${index}].phoneNumberSecondary`,
                e.target.value.toString()
              );
            }
          }}
        />
        {/* <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .phoneNumberSecondary
          }
        </FormErrorMessage> */}
      </FormControl>

      {/* Relationship Type Select */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .relationshipWithChildType &&
      //   touched.caregiver?.[index]?.relationshipWithChildType
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].relationshipWithChildType`}>
          Relationship Type with Child
        </FormLabel>
        <Select
          id={`caregiver[${index}].relationshipWithChildType`}
          name={`caregiver[${index}].relationshipWithChildType`}
          placeholder="Select relationship type"
          onChange={handleRelationshipChange}
          // onChange={(e) =>
          //   setFieldValue(
          //     `caregiver[${index}].relationshipWithChildType`,
          //     e.target.value
          //   )
          // }
        >
          {relationshipTypeData.map((relationshipType) => (
            <option key={relationshipType.id} value={relationshipType.id}>
              {relationshipType.type}
            </option>
          ))}
        </Select>
        {/* <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .relationshipWithChildType
          }
        </FormErrorMessage> */}
      </FormControl>

      {/* Relationship Select */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .relationshipWithChild &&
      //   touched.caregiver?.[index]?.relationshipWithChild
      // }
      >
        <FormLabel htmlFor={`caregiver[${index}].relationshipWithChild`}>
          Relationship with Child
        </FormLabel>
        <Select
          id={`caregiver[${index}].relationshipWithChild`}
          placeholder="Select relationship"
          onChange={handleRelationshipChange}
          // onChange={(e) =>
          //   setFieldValue(
          //     `caregiver[${index}].relationshipWithChild`,
          //     e.target.value
          //   )
          // }
        >
          {relationshipDataFiltered?.relationship?.map(
            (item: { id: string; value: string }) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            )
          )}
        </Select>
        {/* <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .relationshipWithChild
          }
        </FormErrorMessage> */}
      </FormControl>

      {/* exact relationship */}
      {otherType.status && (
        <FormControl
        // isInvalid={
        //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
        //     .relationshipWithChild &&
        //   touched.caregiver?.[index]?.relationshipWithChild
        // }
        >
          <FormLabel htmlFor="otherGuardian">
            Please enter the exact relationship with child
          </FormLabel>
          <Input
            id="otherGuardian"
            type="text"
            onChange={handleInputChange}
            defaultValue={otherType.value}
          />
          {/* <FormErrorMessage>
            {
              (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
                .relationshipWithChild
            }
          </FormErrorMessage> */}
        </FormControl>
      )}

      {/* Relationship Select */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .caregiverRelationshipTypeWithParent &&
      //   touched.caregiver?.[index]?.caregiverRelationshipTypeWithParent
      // }
      >
        <FormLabel
          htmlFor={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
        >
          Relationship with Parent
        </FormLabel>
        <Select
          id={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
          placeholder="Select relationship"
          onChange={handleRelationshipChange}
          // onChange={(e) =>
          //   setFieldValue(
          //     `caregiver[${index}].caregiverRelationshipTypeWithParent`,
          //     e.target.value
          //   )
          // }
        >
          {caregiverRelationshipTypeWithParent?.map((relationship) => (
            <option key={relationship.id} value={relationship.id}>
              {relationship.type}
            </option>
          ))}
        </Select>
        {/* <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .caregiverRelationshipTypeWithParent
          }
        </FormErrorMessage> */}
      </FormControl>

      {/* Relationship Type Select */}
      <FormControl
      // isInvalid={
      //   !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
      //     .caregiverRelationshipWithParentData &&
      //   touched.caregiver?.[index]?.caregiverRelationshipWithParentData
      // }
      >
        <FormLabel
          htmlFor={`caregiver[${index}].caregiverRelationshipWithParentData`}
        >
          Relationship Type with Parent
        </FormLabel>
        <Select
          id={`caregiver[${index}].caregiverRelationshipWithParentData`}
          placeholder="Select relationship type"
          onChange={handleRelationshipChange}
          // onChange={(e) =>
          //   setFieldValue(
          //     `caregiver[${index}].caregiverRelationshipWithParentData`,
          //     e.target.value
          //   )
          // }
        >
          {caregiverRelationshipFiltered?.relationship?.map(
            (item: { id: string; value: string }) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            )
          )}
        </Select>
        {/* <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .caregiverRelationshipWithParentData
          }
        </FormErrorMessage> */}
      </FormControl>

      {/* Upload Photo */}
      <Box>
        <FormLabel htmlFor={`caregiver[${index}].photograph`}>
          Upload Photo
        </FormLabel>
        <ImageFileUploader
          id={`caregiver[${index}].photograph`}
          ariaLabel="Upload Photo"
        />
        <ErrorMessage name={`caregiver[${index}].photograph`} />
      </Box>
    </VStack>

    // <section className="personal_info">
    //   {/* full name */}
    //   <div className="flex gap-x-6 flex-col md:flex-row">
    //     <div className="input_group">
    //       <label htmlFor={`caregiver[${index}].firstName`}>First Name</label>
    //       <Field
    //         name={`caregiver[${index}].firstName`}
    //         id={`caregiver[${index}].firstName`}
    //         type="text"
    //         className="hod_input"
    //         aria-placeholder="Enter first name"
    //         aria-label="First Name"
    //       />
    //       <ErrorMessage name={`caregiver[${index}].firstName`} />
    //     </div>

    //     <div className="input_group">
    //       <label htmlFor={`caregiver[${index}].lastName`}>Last Name</label>
    //       <Field
    //         name={`caregiver[${index}].lastName`}
    //         id={`caregiver[${index}].lastName`}
    //         type="text"
    //         className="hod_input"
    //         aria-placeholder="Enter last name"
    //         aria-label="Last Name"
    //       />
    //       <ErrorMessage name={`caregiver[${index}].lastName`} />
    //     </div>
    //   </div>

    //   {/* email */}
    //   <div className="input_group">
    //     <label htmlFor={`caregiver[${index}].email`}>Email Address</label>
    //     <Field
    //       name={`caregiver[${index}].email`}
    //       id={`caregiver[${index}].email`}
    //       type="email"
    //       className="hod_input"
    //       aria-placeholder="Enter email"
    //       aria-label="Email Address"
    //     />
    //     <ErrorMessage name={`caregiver[${index}].email`} />
    //   </div>

    //   {/* gender */}
    //   <div className="input_group">
    //     <label htmlFor={`caregiver[${index}].gender`}>Gender</label>
    //     <Field
    //       name={`caregiver[${index}].gender`}
    //       id={`caregiver[${index}].gender`}
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
    //     <ErrorMessage name={`caregiver[${index}].gender`} />
    //   </div>

    //   {/* role */}
    //   <div className="input_group">
    //     <label htmlFor={`caregiver[${index}].roleInChurch`}>
    //       Role in church
    //     </label>
    //     <Field
    //       name={`caregiver[${index}].roleInChurch`}
    //       id={`caregiver[${index}].roleInChurch`}
    //       as="select"
    //       className="hod_input"
    //       aria-label="Role in church"
    //       onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
    //         const { value } = e.target;
    //         setFieldValue(`caregiver[${index}].roleInChurch`, value);
    //         if (value !== "visitor" && value !== "member") {
    //           setFieldValue(`caregiver[${index}].roleInChurch`, "");
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
    //     <ErrorMessage name={`caregiver[${index}].roleInChurch`} />
    //   </div>

    //   {/* department */}
    //   {showDepartmentDropdown && (
    //     <div className="input_group">
    //       <label htmlFor={`caregiver[${index}].departmentInChurch`}>
    //         Department in church
    //       </label>
    //       <Select
    //         name={`caregiver[${index}].departmentInChurch`}
    //         options={options}
    //         onChange={(option: OptionType | null) => {
    //           setFieldValue(
    //             `caregiver[${index}].departmentInChurch`,
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
    //       <ErrorMessage name={`caregiver[${index}].departmentInChurch`} />
    //     </div>
    //   )}

    //   {/* ministry */}
    //   {showMinistryDropdown && (
    //     <div className="input_group">
    //       <label htmlFor={`caregiver[${index}].ministry`}>Ministry</label>
    //       <Select
    //         name={`caregiver[${index}].ministry`}
    //         options={ministryOptions}
    //         onChange={(option: OptionType | null) => {
    //           setFieldValue(
    //             `caregiver[${index}].ministry`,
    //             option ? option.value : ""
    //           );
    //         }}
    //         classNames={{
    //           control: (state: { isFocused: any }) =>
    //             state.isFocused
    //               ? "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-bg-red-light"
    //               : "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-border-gray",
    //         }}
    //         aria-label="Ministry in Church"
    //         placeholder="Select ministry"
    //         isClearable
    //         isSearchable
    //       />
    //       <ErrorMessage name={`caregiver[${index}].ministry`} />
    //     </div>
    //   )}

    //   {/* phone number */}
    //   <div className="input_group">
    //     <label htmlFor={`caregiver[${index}].phoneNumberPrimary`}>
    //       Primary Phone Number
    //     </label>
    //     <Field
    //       name={`caregiver[${index}].phoneNumberPrimary`}
    //       id={`caregiver[${index}].phoneNumberPrimary`}
    //       type="text"
    //       className="hod_input"
    //       aria-placeholder="Enter primary phone number"
    //       aria-label="Primary Phone Number"
    //     />
    //     <ErrorMessage name={`caregiver[${index}].phoneNumberPrimary`} />
    //   </div>

    //   <div className="input_group">
    //     <label htmlFor={`caregiver[${index}].phoneNumberSecondary`}>
    //       Secondary Phone Number
    //     </label>
    //     <Field
    //       name={`caregiver[${index}].phoneNumberSecondary`}
    //       id={`caregiver[${index}].phoneNumberSecondary`}
    //       type="text"
    //       className="hod_input"
    //       aria-placeholder="Enter secondary phone number"
    //       aria-label="Secondary Phone Number"
    //     />
    //     <ErrorMessage name={`caregiver[${index}].phoneNumberSecondary`} />
    //   </div>

    //   {/* relationship with child */}
    //   <div className="flex gap-x-6 flex-col md:flex-row">
    //     <div className="input_group">
    //       <label htmlFor={`caregiver[${index}].relationshipWithChildType`}>
    //         Relationship with child
    //       </label>
    //       <Field
    //         name={`caregiver[${index}].relationshipWithChildType`}
    //         id={`caregiver[${index}].relationshipWithChildType`}
    //         as="select"
    //         className="hod_input"
    //         aria-label="Relationship with child"
    //         onChange={handleRelationshipChange}
    //       >
    //         <option value="" disabled>
    //           select relationship
    //         </option>

    //         {relationshipTypeData?.map((relationship) => (
    //           <option key={relationship.id} value={relationship.id}>
    //             {relationship.type}
    //           </option>
    //         ))}
    //       </Field>
    //       <ErrorMessage
    //         name={`caregiver[${index}].relationshipWithChildType`}
    //       />
    //     </div>

    //     <div className="input_group">
    //       <label htmlFor={`caregiver[${index}].relationshipWithChild`}>
    //         Specify Relationship
    //       </label>

    //       <Field
    //         name="caregiverGuardian"
    //         id="caregiverGuardian"
    //         as="select"
    //         className="hod_input"
    //         aria-label="Specify Relationship"
    //         onChange={handleRelationshipChange}
    //       >
    //         <option value="" disabled>
    //           choose relationship
    //         </option>

    //         {relationshipDataFiltered?.relationship?.map(
    //           (item: { id: string; value: string }) => (
    //             <option key={item.id} value={item.id}>
    //               {item.value}
    //             </option>
    //           )
    //         )}
    //       </Field>
    //       <ErrorMessage name={`caregiver[${index}].relationshipWithChild`} />
    //     </div>
    //   </div>

    //   {/* exact relationship */}
    //   {otherType.status && (
    //     <div className="input_group">
    //       <label htmlFor="otherGuardian">
    //         Please enter the exact relationship with child
    //       </label>

    //       <Field
    //         name="otherGuardian"
    //         id="otherGuardian"
    //         type="text"
    //         className="hod_input"
    //         aria-placeholder="Enter relationship with child"
    //         aria-label="Enter relationship with child"
    //         onChange={handleInputChange}
    //         defaultValue={otherType.value}
    //       />
    //       <ErrorMessage name="otherGuardian" />
    //     </div>
    //   )}

    //   {/* relationship with parent */}
    //   <div className="flex gap-x-6 flex-col md:flex-row">
    //     <div className="input_group">
    //       <label
    //         htmlFor={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
    //       >
    //         Relationship with Parent
    //       </label>
    //       <Field
    //         name={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
    //         id={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
    //         as="select"
    //         className="hod_input"
    //         aria-label="Relationship with parent"
    //         onChange={handleRelationshipChange}
    //       >
    //         <option value="" disabled>
    //           select relationship
    //         </option>

    //         {caregiverRelationshipTypeWithParent?.map((relationship) => (
    //           <option key={relationship.id} value={relationship.id}>
    //             {relationship.type}
    //           </option>
    //         ))}
    //       </Field>
    //       <ErrorMessage
    //         name={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
    //       />
    //     </div>

    //     <div className="input_group">
    //       <label
    //         htmlFor={`caregiver[${index}].caregiverRelationshipWithParentData`}
    //       >
    //         Specify Relationship
    //       </label>
    //       <Field
    //         name={`caregiver[${index}].caregiverRelationshipWithParentData`}
    //         id={`caregiver[${index}].caregiverRelationshipWithParentData`}
    //         as="select"
    //         className="hod_input"
    //         aria-label="Specify Relationship"
    //         onChange={handleRelationshipChange}
    //       >
    //         <option value="" disabled>
    //           choose relationship
    //         </option>

    //         {caregiverRelationshipFiltered?.relationship?.map(
    //           (item: { id: string; value: string }) => (
    //             <option key={item.id} value={item.id}>
    //               {item.value}
    //             </option>
    //           )
    //         )}
    //       </Field>
    //       <ErrorMessage
    //         name={`caregiver[${index}].caregiverRelationshipWithParentData`}
    //       />
    //     </div>
    //   </div>

    // {
    /* church location and branch
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor={`caregiver[${index}].churchLocation`}>
            Church Location
          </label>
          <Field
            name={`caregiver[${index}].churchLocation`}
            id={`caregiver[${index}].churchLocation`}
            as="select"
            className="hod_input"
            aria-label="Church Location"
            onChange={handleRelationshipChange}
          >
            <option value="" disabled>
              select church location
            </option>

            {locationTypeData?.map((location) => (
              <option key={location.id} value={location.id}>
                {location.value}
              </option>
            ))}
          </Field>
          <ErrorMessage name={`caregiver[${index}].churchLocation`} />
        </div>

        <div className="input_group">
          <label htmlFor={`caregiver[${index}].churchBranchInLocation`}>
            Branch / Center
          </label>

          <Field
            name={`caregiver[${index}].churchBranchInLocation`}
            id={`caregiver[${index}].churchBranchInLocation`}
            as="select"
            className="hod_input"
            aria-label="Branch / Center"
            onChange={handleRelationshipChange}
          >
            <option value="" disabled>
              select branch or center
            </option>

            {branchAndCenterFiltered?.branches?.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
          </Field>
          <ErrorMessage name={`caregiver[${index}].churchBranchInLocation`} />
        </div>
      </div> */
    // }

    //   <div className="input_group">
    //     <label htmlFor={`caregiver[${index}].photograph`}>Upload Photo</label>
    //     <ImageFileUploader
    //       id={`caregiver[${index}].photograph`}
    //       ariaLabel="Upload Photo"
    //     />
    //     <ErrorMessage name={`caregiver[${index}].photograph`} />
    //   </div>
    // </section>
  );
};

export default CaregiverComponent;
