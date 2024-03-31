import { useState, ChangeEvent } from "react";
import { useFormikContext, ErrorMessage, FormikErrors } from "formik";
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
  OptionType,
  CaregiverForm,
  RegistrationForm,
} from "@/lib/definitions/form-interfaces";
import ImageFileUploader from "../../components/ImageFileUploader"; // Ensure this is adapted for Chakra UI

const CaregiverComponent = ({ index }: { index: number }) => {
  const { setFieldValue, values, errors, touched } =
    useFormikContext<RegistrationForm>();

  const [currentType, setCurrentType] = useState("parent");
  const [currentCaregiverType, setCurrentCaregiverType] = useState("");
  const [otherType, setOtherType] = useState({
    status: false,
    value: "",
  });

  const departmentOptions: OptionType[] = departmentInChurchData.map(
    (dept) => ({
      value: dept.id,
      label: dept.value,
    })
  );

  const ministryOptions: OptionType[] = ministryData.map((ministry) => ({
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

  return (
    <VStack spacing={4} align="stretch">
      {/* Full name section */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .firstName && touched.caregiver?.[index]?.firstName
        }
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
          {(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).firstName}
        </FormErrorMessage>
      </FormControl>

      {/* Last name section */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .lastName && touched.caregiver?.[index]?.lastName
        }
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
          {(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).lastName}
        </FormErrorMessage>
      </FormControl>

      {/* Email */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).email &&
          touched.caregiver?.[index]?.email
        }
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
          {(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).email}
        </FormErrorMessage>
      </FormControl>

      {/* Gender Select */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).gender &&
          touched.caregiver?.[index]?.gender
        }
      >
        <FormLabel htmlFor={`caregiver[${index}].gender`}>Gender</FormLabel>
        <Select
          id={`caregiver[${index}].gender`}
          placeholder="Select gender"
          onChange={(e) =>
            setFieldValue(`caregiver[${index}].gender`, e.target.value)
          }
        >
          {genderData.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.value}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {(errors.caregiver?.[index] as FormikErrors<CaregiverForm>).gender}
        </FormErrorMessage>
      </FormControl>

      {/* Role in Church Select */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .roleInChurch && touched.caregiver?.[index]?.roleInChurch
        }
      >
        <FormLabel htmlFor={`caregiver[${index}].roleInChurch`}>
          Role in Church
        </FormLabel>
        <Select
          id={`caregiver[${index}].roleInChurch`}
          placeholder="Select role in church"
          onChange={(e) =>
            setFieldValue(`caregiver[${index}].roleInChurch`, e.target.value)
          }
        >
          {roleInChurchData.map((role) => (
            <option key={role.id} value={role.id}>
              {role.value}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .roleInChurch
          }
        </FormErrorMessage>
      </FormControl>

      {/* Department in Church Select */}
      {showDepartmentDropdown && (
        <FormControl
          isInvalid={
            !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .departmentInChurch &&
            touched.caregiver?.[index]?.departmentInChurch
          }
        >
          <FormLabel htmlFor={`caregiver[${index}].departmentInChurch`}>
            Department in Church
          </FormLabel>
          <Select
            id={`caregiver[${index}].departmentInChurch`}
            placeholder="Select department in church"
            onChange={(e) =>
              setFieldValue(
                `caregiver[${index}].departmentInChurch`,
                e.target.value
              )
            }
          >
            {departmentOptions.map((department) => (
              <option key={department.value} value={department.value}>
                {department.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {
              (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
                .departmentInChurch
            }
          </FormErrorMessage>
        </FormControl>
      )}

      {/* Ministry Select */}
      {showMinistryDropdown && (
        <FormControl
          isInvalid={
            !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .ministry && touched.caregiver?.[index]?.ministry
          }
        >
          <FormLabel htmlFor={`caregiver[${index}].ministry`}>
            Ministry
          </FormLabel>
          <Select
            id={`caregiver[${index}].ministry`}
            placeholder="Select ministry"
            onChange={(e) =>
              setFieldValue(`caregiver[${index}].ministry`, e.target.value)
            }
          >
            {ministryOptions.map((ministry) => (
              <option key={ministry.value} value={ministry.value}>
                {ministry.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {
              (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
                .ministry
            }
          </FormErrorMessage>
        </FormControl>
      )}

      {/* Phone Number */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .phoneNumberPrimary &&
          touched.caregiver?.[index]?.phoneNumberPrimary
        }
      >
        <FormLabel htmlFor={`caregiver[${index}].phoneNumberPrimary`}>
          Phone Number
        </FormLabel>
        <Input
          id={`caregiver[${index}].phoneNumberPrimary`}
          name={`caregiver[${index}].phoneNumberPrimary`}
          onChange={(e) =>
            setFieldValue(
              `caregiver[${index}].phoneNumberPrimary`,
              e.target.value
            )
          }
        />
        <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .phoneNumberPrimary
          }
        </FormErrorMessage>
      </FormControl>

      {/* Alternative Phone Number */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .phoneNumberSecondary &&
          touched.caregiver?.[index]?.phoneNumberSecondary
        }
      >
        <FormLabel htmlFor={`caregiver[${index}].phoneNumberSecondary`}>
          Alternative Phone Number
        </FormLabel>
        <Input
          id={`caregiver[${index}].phoneNumberSecondary`}
          name={`caregiver[${index}].phoneNumberSecondary`}
          onChange={(e) =>
            setFieldValue(
              `caregiver[${index}].phoneNumberSecondary`,
              e.target.value
            )
          }
        />
        <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .phoneNumberSecondary
          }
        </FormErrorMessage>
      </FormControl>

      {/* Relationship Type Select */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .relationshipWithChildType &&
          touched.caregiver?.[index]?.relationshipWithChildType
        }
      >
        <FormLabel htmlFor={`caregiver[${index}].relationshipWithChildType`}>
          Relationship Type with Child
        </FormLabel>
        <Select
          id={`caregiver[${index}].relationshipWithChildType`}
          placeholder="Select relationship type"
          onChange={(e) =>
            setFieldValue(
              `caregiver[${index}].relationshipWithChildType`,
              e.target.value
            )
          }
        >
          {relationshipTypeData.map((relationshipType) => (
            <option key={relationshipType.id} value={relationshipType.id}>
              {relationshipType.type}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .relationshipWithChildType
          }
        </FormErrorMessage>
      </FormControl>

      {/* Relationship Select */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .relationshipWithChild &&
          touched.caregiver?.[index]?.relationshipWithChild
        }
      >
        <FormLabel htmlFor={`caregiver[${index}].relationshipWithChild`}>
          Relationship with Child
        </FormLabel>
        <Select
          id={`caregiver[${index}].relationshipWithChild`}
          placeholder="Select relationship"
          onChange={(e) =>
            setFieldValue(
              `caregiver[${index}].relationshipWithChild`,
              e.target.value
            )
          }
        >
          {relationshipDataFiltered?.relationship?.map(
            (item: { id: string; value: string }) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            )
          )}
        </Select>
        <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .relationshipWithChild
          }
        </FormErrorMessage>
      </FormControl>

      {/* exact relationship */}
      {otherType.status && (
        <FormControl
          isInvalid={
            !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .relationshipWithChild &&
            touched.caregiver?.[index]?.relationshipWithChild
          }
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
          <FormErrorMessage>
            {
              (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
                .relationshipWithChild
            }
          </FormErrorMessage>
        </FormControl>
      )}

      {/* Relationship Select */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .caregiverRelationshipTypeWithParent &&
          touched.caregiver?.[index]?.caregiverRelationshipTypeWithParent
        }
      >
        <FormLabel
          htmlFor={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
        >
          Relationship with Parent
        </FormLabel>
        <Select
          id={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
          placeholder="Select relationship"
          onChange={(e) =>
            setFieldValue(
              `caregiver[${index}].caregiverRelationshipTypeWithParent`,
              e.target.value
            )
          }
        >
          {caregiverRelationshipTypeWithParent?.map((relationship) => (
            <option key={relationship.id} value={relationship.id}>
              {relationship.type}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .caregiverRelationshipTypeWithParent
          }
        </FormErrorMessage>
      </FormControl>

      {/* Relationship Type Select */}
      <FormControl
        isInvalid={
          !!(errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
            .caregiverRelationshipWithParentData &&
          touched.caregiver?.[index]?.caregiverRelationshipWithParentData
        }
      >
        <FormLabel
          htmlFor={`caregiver[${index}].caregiverRelationshipWithParentData`}
        >
          Relationship Type with Parent
        </FormLabel>
        <Select
          id={`caregiver[${index}].caregiverRelationshipWithParentData`}
          placeholder="Select relationship type"
          onChange={(e) =>
            setFieldValue(
              `caregiver[${index}].caregiverRelationshipWithParentData`,
              e.target.value
            )
          }
        >
          {caregiverRelationshipFiltered?.relationship?.map(
            (item: { id: string; value: string }) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            )
          )}
        </Select>
        <FormErrorMessage>
          {
            (errors.caregiver?.[index] as FormikErrors<CaregiverForm>)
              .caregiverRelationshipWithParentData
          }
        </FormErrorMessage>
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
  );
};

export default CaregiverComponent;
