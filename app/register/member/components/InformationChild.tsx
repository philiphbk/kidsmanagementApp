import { ChangeEvent, useState } from "react";

import { ErrorMessage, Field, useFormikContext, FormikErrors } from "formik";

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  FormErrorMessage,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import {
  ageGroupData,
  genderData,
  relationshipData,
  relationshipTypeData,
} from "@/lib/data/dummy-data";
import { ChildForm, RegistrationForm } from "@/lib/definitions/form-interfaces";

import ImageFileUploader from "../../components/ImageFileUploader";

const ChildComponent = ({ index }: { index: number }) => {
  const { setFieldValue, values, errors, touched } =
    useFormikContext<RegistrationForm>();
  const [currentType, setCurrentType] = useState("parent");
  const [otherType, setOtherType] = useState({
    status: false,
    value: "",
  });

  const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value, id } = e.target;

    if (id.includes("relationshipWithChildType")) {
      setCurrentType(value);
      setOtherType({ ...otherType, status: false });
      setFieldValue(`child[${index}].relationshipWithChild`, "");
      setFieldValue(name, value);
    } else if (id.includes("childGuardian")) {
      if (value === "other") {
        setOtherType({ ...otherType, status: true });
        setFieldValue(`child[${index}].relationshipWithChildType`, "guardian");
      } else {
        setOtherType({ ...otherType, status: false });
        setFieldValue(`child[${index}].relationshipWithChild`, value);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue(`child[${index}].relationshipWithChild`, value);
  };

  const relationshipDataFiltered = relationshipData?.find(
    (relationship) => relationship.type === currentType
  );

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    console.log(m);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
    console.log(age);
  };

  // Handle change event for the date of birth field
  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateOfBirth = e.target.value;
    setFieldValue(`child[${index}].dateOfBirth`, dateOfBirth);

    // Calculate age and set in form state
    // const age = calculateAge(dateOfBirth);
    // console.log(age);
  };

  return (
    <VStack spacing={4} align="stretch">
      {/* Full Name */}
      <FormControl
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)?.firstName &&
          touched.child?.[index]?.firstName
        }
      >
        <FormLabel htmlFor={`child[${index}].firstName`}>First Name</FormLabel>
        <Input
          id={`child[${index}].firstName`}
          name={`child[${index}].firstName`}
          onChange={(e) =>
            setFieldValue(`child[${index}].firstName`, e.target.value)
          }
        />
        <FormErrorMessage>
          {(errors.child?.[index] as FormikErrors<ChildForm>)?.firstName}
        </FormErrorMessage>
      </FormControl>

      {/* Last Name */}
      <FormControl
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)?.lastName &&
          touched.child?.[index]?.lastName
        }
      >
        <FormLabel htmlFor={`child[${index}].lastName`}>Last Name</FormLabel>
        <Input
          id={`child[${index}].lastName`}
          name={`child[${index}].lastName`}
          onChange={(e) =>
            setFieldValue(`child[${index}].lastName`, e.target.value)
          }
        />
        <FormErrorMessage>
          {(errors.child?.[index] as FormikErrors<ChildForm>)?.lastName}
        </FormErrorMessage>
      </FormControl>

      {/* Age Group Select */}
      {/* <FormControl
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)?.ageGroup &&
          touched.child?.[index]?.ageGroup
        }
      >
        <FormLabel htmlFor={`child[${index}].ageGroup`}>Age Group</FormLabel>
        <Select
          id={`child[${index}].ageGroup`}
          placeholder="Select age group"
          onChange={(e) =>
            setFieldValue(`child[${index}].ageGroup`, e.target.value)
          }
        >
          {ageGroupData.map((ageGroup) => (
            <option key={ageGroup.id} value={ageGroup.id}>
              {ageGroup.value}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {(errors.child?.[index] as FormikErrors<ChildForm>)?.ageGroup}
        </FormErrorMessage>
      </FormControl> */}

      {/* Date of Birth */}
      <FormControl
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)?.dateOfBirth &&
          touched.child?.[index]?.dateOfBirth
        }
      >
        <FormLabel htmlFor={`child[${index}].dateOfBirth`}>
          Date of Birth
        </FormLabel>
        <Input
          id={`child[${index}].dateOfBirth`}
          name={`child[${index}].dateOfBirth`}
          type="date"
          onChange={handleDateOfBirthChange}
          value={values.child?.[index]?.dateOfBirth || ""}
        />
        <FormErrorMessage>
          {(errors.child?.[index] as FormikErrors<ChildForm>)?.dateOfBirth}
        </FormErrorMessage>
      </FormControl>

      {/* Display Age (Read-Only Field for Age) */}
      <FormControl
        mt={4}
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)?.ageGroup &&
          touched.child?.[index]?.ageGroup
        }
      >
        <FormLabel htmlFor={`child[${index}].ageGroup`}>Age</FormLabel>
        <Input
          id={`child[${index}].ageGroup`}
          name={`child[${index}].ageGroup`}
          type="text"
          onChange={(e) => {
            setFieldValue(`child[${index}].ageGroup`, e.target.value);
          }}
        />
        <FormErrorMessage>
          {(errors.child?.[index] as FormikErrors<ChildForm>)?.ageGroup}
        </FormErrorMessage>
      </FormControl>

      {/* Gender Select */}
      <FormControl
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)?.gender &&
          touched.child?.[index]?.gender
        }
      >
        <FormLabel htmlFor={`child[${index}].gender`}>Gender</FormLabel>
        <Select
          id={`child[${index}].gender`}
          placeholder="Select gender"
          onChange={(e) =>
            setFieldValue(`child[${index}].gender`, e.target.value)
          }
        >
          {genderData.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.value}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {(errors.child?.[index] as FormikErrors<ChildForm>)?.gender}
        </FormErrorMessage>
      </FormControl>

      {/* Relationship With Child Type */}
      <FormControl
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)
            ?.relationshipWithChildType &&
          touched.child?.[index]?.relationshipWithChildType
        }
      >
        <FormLabel htmlFor={`child[${index}].relationshipWithChildType`}>
          Relationship with child
        </FormLabel>
        <Select
          id={`child[${index}].relationshipWithChildType`}
          name={`child[${index}].relationshipWithChildType`}
          onChange={handleRelationshipChange}
        >
          {relationshipTypeData?.map((relationship) => (
            <option key={relationship.id} value={relationship.id}>
              {relationship.type}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {
            (errors.child?.[index] as FormikErrors<ChildForm>)
              ?.relationshipWithChildType
          }
        </FormErrorMessage>
      </FormControl>

      {/* Relationship With Child */}
      <FormControl
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)
            ?.relationshipWithChild &&
          touched.child?.[index]?.relationshipWithChild
        }
      >
        <FormLabel htmlFor={`child[${index}].relationshipWithChild`}>
          Relationship with child
        </FormLabel>
        <Select
          // id={`child[${index}].relationshipWithChild`}
          // name={`child[${index}].relationshipWithChild`}
          name="childGuardian"
          id="childGuardian"
          onChange={handleRelationshipChange}
        >
          <option value="" disabled>
            select relationship
          </option>

          {relationshipDataFiltered?.relationship?.map((relationship) => (
            <option key={relationship.id} value={relationship.id}>
              {relationship.value}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {
            (errors.child?.[index] as FormikErrors<ChildForm>)
              ?.relationshipWithChild
          }
        </FormErrorMessage>
      </FormControl>

      {/* If 'otherType' is true, show additional input field for specifying the relationship */}
      {otherType.status && (
        <FormControl>
          <FormLabel htmlFor="otherGuardian">Specify Relationship</FormLabel>
          <Input id="otherGuardian" onChange={handleInputChange} />
          <ErrorMessage name="otherGuardian" component={FormErrorMessage} />
        </FormControl>
      )}

      {/* ImageFileUploader for Photograph */}
      <Box>
        <FormLabel>Upload a clear photograph</FormLabel>
        <ImageFileUploader
          id={`child[${index}].photograph`}
          ariaLabel="Upload a clear photograph"
        />
        <ErrorMessage
          name={`child[${index}].photograph`}
          component={FormErrorMessage}
        />
      </Box>

      {/* Special Needs */}
      <FormControl
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)?.specialNeeds &&
          touched.child?.[index]?.specialNeeds
        }
      >
        <FormLabel htmlFor={`child[${index}].specialNeeds`}>
          Special Needs
        </FormLabel>
        <Textarea
          id={`child[${index}].specialNeeds`}
          name={`child[${index}].specialNeeds`}
          onChange={(e) =>
            setFieldValue(`child[${index}].specialNeeds`, e.target.value)
          }
        />
        <FormErrorMessage>
          {(errors.child?.[index] as FormikErrors<ChildForm>)?.specialNeeds}
        </FormErrorMessage>
      </FormControl>
    </VStack>
    // <div className="personal_info">
    //   {/* full name */}
    //   <div className="flex gap-x-6 flex-col md:flex-row">
    //     <div className="input_group">
    //       <label htmlFor={`child[${index}].firstName`}>First Name</label>
    //       <Field
    //         name={`child[${index}].firstName`}
    //         id={`child[${index}].firstName`}
    //         type="text"
    //         onChange={(e: any) => {
    //           setFieldValue(`child[${index}].firstName`, e.target.value);
    //         }}
    //         className="hod_input"
    //         aria-placeholder="Enter first name"
    //         aria-label="First Name"
    //       />
    //       <ErrorMessage name={`child[${index}].firstName`} />
    //     </div>

    //     <div className="input_group">
    //       <label htmlFor={`child[${index}].lastName`}>Last Name</label>
    //       <Field
    //         name={`child[${index}].lastName`}
    //         id={`child[${index}].lastName`}
    //         type="text"
    //         className="hod_input"
    //         aria-placeholder="Enter last name"
    //         aria-label="Last Name"
    //       />
    //       <ErrorMessage name={`child[${index}].lastName`} />
    //     </div>
    //   </div>

    //   {/* date of birth and gender */}
    //   <div className="flex gap-x-6 flex-col md:flex-row">
    //     <div className="input_group">
    //       <label htmlFor={`child[${index}].dateOfBirth`}>Date of birth</label>
    //       <Field
    //         name={`child[${index}].dateOfBirth`}
    //         id={`child[${index}].dateOfBirth`}
    //         type="date"
    //         className="hod_input"
    //         aria-placeholder="Enter date of birth name"
    //         aria-label="Date of birth"
    //       />
    //       <ErrorMessage name={`child[${index}].dateOfBirth`} />
    //     </div>

    //     <div className="input_group">
    //       <label htmlFor={`child[${index}].gender`}>Gender</label>
    //       <Field
    //         name={`child[${index}].gender`}
    //         id={`child[${index}].gender`}
    //         as="select"
    //         className="hod_input"
    //         aria-label="Gender"
    //       >
    //         <option value="" disabled>
    //           select gender
    //         </option>

    //         {genderData?.map((gender) => (
    //           <option key={gender.id} value={gender.id}>
    //             {gender.value}
    //           </option>
    //         ))}
    //       </Field>
    //       <ErrorMessage name={`child[${index}].gender`} />
    //     </div>
    //   </div>

    //   {/* photograph */}
    //   <div className="input_group">
    //     <label htmlFor={`child[${index}].photograph`}>
    //       Upload a clear photograph
    //     </label>
    //     <ImageFileUploader
    //       id={`child[${index}].photograph`}
    //       ariaLabel="Upload a clear photograph"
    //     />
    //     <ErrorMessage name={`child[${index}].photograph`} />
    //   </div>

    //   {/* age group */}
    //   <div className="input_group">
    //     <label htmlFor={`child[${index}].ageGroup`}>Age Group</label>
    //     <Field
    //       name={`child[${index}].ageGroup`}
    //       id={`child[${index}].ageGroup`}
    //       as="select"
    //       className="hod_input"
    //       aria-label="Age Group"
    //     >
    //       <option value="" disabled>
    //         select age group
    //       </option>

    //       {ageGroupData?.map((group) => (
    //         <option key={group.id} value={group.id}>
    //           {group.value}
    //         </option>
    //       ))}
    //     </Field>
    //     <ErrorMessage name={`child[${index}].ageGroup`} />
    //   </div>

    //   {/* relationship with child */}
    //   <div className="flex gap-x-6 flex-col md:flex-row">
    //     <div className="input_group">
    //       <label htmlFor={`child[${index}].relationshipWithChildType`}>
    //         Relationship with child
    //       </label>
    //       <Field
    //         name={`child[${index}].relationshipWithChildType`}
    //         id={`child[${index}].relationshipWithChildType`}
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
    //       <ErrorMessage name={`child[${index}].relationshipWithChildType`} />
    //     </div>

    //     <div className="input_group">
    //       <label htmlFor={`child[${index}].relationshipWithChild`}>
    //         Specify Relationship
    //       </label>

    //       <Field
    //         name="childGuardian"
    //         id="childGuardian"
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
    //       <ErrorMessage name="childGuardian" />
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

    //   {/* special need */}
    //   <div className="input_group">
    //     <label htmlFor={`child[${index}].specialNeeds`}>
    //       Special Needs{" "}
    //       <span className="font-normal text-hod-text-gray2 text-base leading-6 italic">
    //         (Any special type of care for the child)
    //       </span>
    //     </label>
    //     <Field
    //       name={`child[${index}].specialNeeds`}
    //       id={`child[${index}].specialNeeds`}
    //       type="text"
    //       className="hod_input"
    //       aria-placeholder="Enter any special needs for the child"
    //       aria-label="Special Needs"
    //     />
    //     <ErrorMessage name={`child[${index}].specialNeeds`} />
    //   </div>
    // </div>
  );
};

export default ChildComponent;
