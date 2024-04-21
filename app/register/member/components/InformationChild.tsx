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
      setFieldValue(`child[${index}].relationshipWithChildType`, value);
      console.log(value);
      // setFieldValue(name, value);
    } else {
      if (value.toLowerCase() === "other") {
        setOtherType({ ...otherType, status: true });
        setFieldValue(`child[${index}].relationshipWithChildType`, "guardian");
      } else {
        setOtherType({ ...otherType, status: false });
        setFieldValue(`child[${index}].relationshipWithChild`, value);
        console.log(value);
        // setFieldValue(name, value);
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
    <VStack spacing={4} align="stretch" mb={5}>
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
        // mt={4}
        isInvalid={
          !!(errors.child?.[index] as FormikErrors<ChildForm>)?.ageGroup &&
          touched.child?.[index]?.ageGroup
        }
      >
        <FormLabel htmlFor={`child[${index}].ageGroup`}>Age</FormLabel>
        <Input
          id={`child[${index}].ageGroup`}
          name={`child[${index}].ageGroup`}
          type="number"
          onChange={(e) => {
            setFieldValue(
              `child[${index}].ageGroup`,
              e.target.value.toString()
            );
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
          id={`child[${index}].relationshipWithChild`}
          name={`child[${index}].relationshipWithChild`}
          // name="childGuardian"
          // id="childGuardian"
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
  );
};

export default ChildComponent;
