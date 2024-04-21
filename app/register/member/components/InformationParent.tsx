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
  Flex,
} from "@chakra-ui/react";

import {
  departmentInChurchData,
  genderData,
  roleInChurchData,
  ministryData,
} from "@/lib/data/dummy-data";

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

interface ParentProps extends ParentForm, PropsInterface { }

const ParentComponent: React.FC<ParentProps> = ({ errors, touched }) => {
  const { values, setFieldValue } = useFormikContext<RegistrationForm>();

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
      <Flex flexDirection="column" gap="4">
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
          <FormLabel htmlFor="parent.phoneNumberPrimary">Phone Number</FormLabel>
          <Field
            as={Input}
            id="parent.phoneNumberPrimary"
            name="parent.phoneNumberPrimary"
            type="tel"
            onChange={(e: { target: { value: any } }) => {
              const { value } = e.target;
              if (/^\d*$/.test(value)) {
                // Allows only numeric input
                setFieldValue("parent.phoneNumberPrimary", value.toString());
              }
            }}
            onBlur={(e: { target: { value: any } }) => {
              // Validate on blur to ensure the length is checked after the user finishes typing
              const { value } = e.target;
              if (value && value.length < 11) {
                setFieldValue("parent.phoneNumberPrimary", "");
              }
            }}
          />
          <FormErrorMessage>{errors.parent?.phoneNumberPrimary}</FormErrorMessage>
        </FormControl>

        {/* Example for Secondary Phone Number */}
        <FormControl
          isInvalid={
            !!errors.parent?.phoneNumberSecondary &&
            touched.parent?.phoneNumberSecondary
          }
        >
          <FormLabel htmlFor="parent.phoneNumberSecondary">
            Secondary Phone Number
          </FormLabel>
          <Field
            as={Input}
            id="parent.phoneNumberSecondary"
            name="parent.phoneNumberSecondary"
            type="tel"
            onChange={(e: { target: { value: any } }) => {
              const { value } = e.target;
              if (/^\d*$/.test(value)) {
                // Allows only numeric input
                setFieldValue("parent.phoneNumberSecondary", value.toString());
              }
            }}
            onBlur={(e: { target: { value: any } }) => {
              // Validate on blur to ensure the length is checked after the user finishes typing
              const { value } = e.target;
              if (value && value.length < 11) {
                setFieldValue("parent.phoneNumberSecondary", "");
              }
            }}
          />
          <FormErrorMessage>
            {errors.parent?.phoneNumberSecondary}
          </FormErrorMessage>
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
      </Flex>
    </Box>
  );
};

export default ParentComponent;
