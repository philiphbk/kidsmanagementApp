import { useState, ChangeEvent } from "react";

import { ErrorMessage, Field, useField, useFormikContext } from "formik";

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

import Select, { ActionMeta, SingleValue } from "react-select";

import ImageFileUploader from "../../components/ImageFileUploader";

const CaregiverComponent = ({ index }: { index: number }) => {
  const { values, setFieldValue } = useFormikContext<RegistrationForm>();
  const [currentType, setCurrentType] = useState("parent");
  const [currentCaregiverType, setCurrentCaregiverType] = useState("");
  const [otherType, setOtherType] = useState({
    status: false,
    value: "",
  });

  const options: OptionType[] = departmentInChurchData.map((dept) => ({
    value: dept.id,
    label: dept.value,
  }));

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

  // const handleRelationshipChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   index: number
  // ) => {
  //   const { name, value } = e.target;

  //   // Update the formik field value directly.
  //   setFieldValue(name, value);

  //   // Handle relationship with child type changes.
  //   if (name === `caregiver[${index}].relationshipWithChildType`) {
  //     setCurrentType(value);
  //     setOtherType({ ...otherType, status: false });
  //     setFieldValue(`caregiver[${index}].relationshipWithChild`, "");
  //     setFieldValue(name, value);
  //   }

  //   // Handle caregiver guardian relationship changes.
  //   if (name === `caregiverGuardian`) {
  //     // Logic to handle "other" type relationships.
  //     const isOther = value === "other";
  //     setOtherType({ status: isOther, value: isOther ? "" : value });
  //     setFieldValue(
  //       `caregiver[${index}].relationshipWithChildType`,
  //       isOther ? "guardian" : value
  //     );
  //   }

  //   if (name === `caregiver[${index}].caregiverRelationshipTypeWithParent`) {
  //     setCurrentCaregiverType(value);
  //     setFieldValue(
  //       `caregiver[${index}].caregiverRelationshipWithParentData`,
  //       value
  //     );
  //     setFieldValue(name, value);
  //   }

  //   // if (name === caregiver[index].churchLocation) {
  //   //   setCurrentLocation(value);
  //   //   setFieldValue(values.caregiver[index].churchBranchInLocation, "");
  //   // }
  // };

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
    <section className="personal_info">
      {/* full name */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor={`caregiver[${index}].firstName`}>First Name</label>
          <Field
            name={`caregiver[${index}].firstName`}
            id={`caregiver[${index}].firstName`}
            type="text"
            className="hod_input"
            aria-placeholder="Enter first name"
            aria-label="First Name"
          />
          <ErrorMessage name={`caregiver[${index}].firstName`} />
        </div>

        <div className="input_group">
          <label htmlFor={`caregiver[${index}].lastName`}>Last Name</label>
          <Field
            name={`caregiver[${index}].lastName`}
            id={`caregiver[${index}].lastName`}
            type="text"
            className="hod_input"
            aria-placeholder="Enter last name"
            aria-label="Last Name"
          />
          <ErrorMessage name={`caregiver[${index}].lastName`} />
        </div>
      </div>

      {/* email */}
      <div className="input_group">
        <label htmlFor={`caregiver[${index}].email`}>Email Address</label>
        <Field
          name={`caregiver[${index}].email`}
          id={`caregiver[${index}].email`}
          type="email"
          className="hod_input"
          aria-placeholder="Enter email"
          aria-label="Email Address"
        />
        <ErrorMessage name={`caregiver[${index}].email`} />
      </div>

      {/* gender */}
      <div className="input_group">
        <label htmlFor={`caregiver[${index}].gender`}>Gender</label>
        <Field
          name={`caregiver[${index}].gender`}
          id={`caregiver[${index}].gender`}
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
        <ErrorMessage name={`caregiver[${index}].gender`} />
      </div>

      {/* role */}
      <div className="input_group">
        <label htmlFor={`caregiver[${index}].roleInChurch`}>
          Role in church
        </label>
        <Field
          name={`caregiver[${index}].roleInChurch`}
          id={`caregiver[${index}].roleInChurch`}
          as="select"
          className="hod_input"
          aria-label="Role in church"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const { value } = e.target;
            setFieldValue(`caregiver[${index}].roleInChurch`, value);
            if (value !== "visitor" && value !== "member") {
              setFieldValue(`caregiver[${index}].roleInChurch`, "");
            }
          }}
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
        <ErrorMessage name={`caregiver[${index}].roleInChurch`} />
      </div>

      {/* department */}
      {showDepartmentDropdown && (
        <div className="input_group">
          <label htmlFor={`caregiver[${index}].departmentInChurch`}>
            Department in church
          </label>
          <Select
            name={`caregiver[${index}].departmentInChurch`}
            options={options}
            onChange={(option: OptionType | null) => {
              setFieldValue(
                `caregiver[${index}].departmentInChurch`,
                option ? option.value : ""
              );
            }}
            classNames={{
              control: (state: { isFocused: any }) =>
                state.isFocused
                  ? "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-bg-red-light"
                  : "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-border-gray",
            }}
            aria-label="Department in church"
            placeholder="Select department in church"
            isClearable
            isSearchable
          />
          <ErrorMessage name={`caregiver[${index}].departmentInChurch`} />
        </div>
      )}

      {/* ministry */}
      {showMinistryDropdown && (
        <div className="input_group">
          <label htmlFor={`caregiver[${index}].ministry`}>Ministry</label>
          <Select
            name={`caregiver[${index}].ministry`}
            options={ministryOptions}
            onChange={(option: OptionType | null) => {
              setFieldValue(
                `caregiver[${index}].ministry`,
                option ? option.value : ""
              );
            }}
            classNames={{
              control: (state: { isFocused: any }) =>
                state.isFocused
                  ? "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-bg-red-light"
                  : "flex items-center gap-2 h-14 w-full px-2 py-2 rounded-lg bg-white border border-hod-border-gray",
            }}
            aria-label="Ministry in Church"
            placeholder="Select ministry"
            isClearable
            isSearchable
          />
          <ErrorMessage name={`caregiver[${index}].ministry`} />
        </div>
      )}

      {/* phone number */}
      <div className="input_group">
        <label htmlFor={`caregiver[${index}].phoneNumberPrimary`}>
          Primary Phone Number
        </label>
        <Field
          name={`caregiver[${index}].phoneNumberPrimary`}
          id={`caregiver[${index}].phoneNumberPrimary`}
          type="text"
          className="hod_input"
          aria-placeholder="Enter primary phone number"
          aria-label="Primary Phone Number"
        />
        <ErrorMessage name={`caregiver[${index}].phoneNumberPrimary`} />
      </div>

      <div className="input_group">
        <label htmlFor={`caregiver[${index}].phoneNumberSecondary`}>
          Secondary Phone Number
        </label>
        <Field
          name={`caregiver[${index}].phoneNumberSecondary`}
          id={`caregiver[${index}].phoneNumberSecondary`}
          type="text"
          className="hod_input"
          aria-placeholder="Enter secondary phone number"
          aria-label="Secondary Phone Number"
        />
        <ErrorMessage name={`caregiver[${index}].phoneNumberSecondary`} />
      </div>

      {/* relationship with child */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor={`caregiver[${index}].relationshipWithChildType`}>
            Relationship with child
          </label>
          <Field
            name={`caregiver[${index}].relationshipWithChildType`}
            id={`caregiver[${index}].relationshipWithChildType`}
            as="select"
            className="hod_input"
            aria-label="Relationship with child"
            onChange={handleRelationshipChange}
          >
            <option value="" disabled>
              select relationship
            </option>

            {relationshipTypeData?.map((relationship) => (
              <option key={relationship.id} value={relationship.id}>
                {relationship.type}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name={`caregiver[${index}].relationshipWithChildType`}
          />
        </div>

        <div className="input_group">
          <label htmlFor={`caregiver[${index}].relationshipWithChild`}>
            Specify Relationship
          </label>

          <Field
            name="caregiverGuardian"
            id="caregiverGuardian"
            as="select"
            className="hod_input"
            aria-label="Specify Relationship"
            onChange={handleRelationshipChange}
          >
            <option value="" disabled>
              choose relationship
            </option>

            {relationshipDataFiltered?.relationship?.map(
              (item: { id: string; value: string }) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              )
            )}
          </Field>
          <ErrorMessage name={`caregiver[${index}].relationshipWithChild`} />
        </div>
      </div>

      {/* exact relationship */}
      {otherType.status && (
        <div className="input_group">
          <label htmlFor="otherGuardian">
            Please enter the exact relationship with child
          </label>

          <Field
            name="otherGuardian"
            id="otherGuardian"
            type="text"
            className="hod_input"
            aria-placeholder="Enter relationship with child"
            aria-label="Enter relationship with child"
            onChange={handleInputChange}
            defaultValue={otherType.value}
          />
          <ErrorMessage name="otherGuardian" />
        </div>
      )}

      {/* relationship with parent */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label
            htmlFor={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
          >
            Relationship with Parent
          </label>
          <Field
            name={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
            id={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
            as="select"
            className="hod_input"
            aria-label="Relationship with parent"
            onChange={handleRelationshipChange}
          >
            <option value="" disabled>
              select relationship
            </option>

            {caregiverRelationshipTypeWithParent?.map((relationship) => (
              <option key={relationship.id} value={relationship.id}>
                {relationship.type}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name={`caregiver[${index}].caregiverRelationshipTypeWithParent`}
          />
        </div>

        <div className="input_group">
          <label
            htmlFor={`caregiver[${index}].caregiverRelationshipWithParentData`}
          >
            Specify Relationship
          </label>
          <Field
            name={`caregiver[${index}].caregiverRelationshipWithParentData`}
            id={`caregiver[${index}].caregiverRelationshipWithParentData`}
            as="select"
            className="hod_input"
            aria-label="Specify Relationship"
            onChange={handleRelationshipChange}
          >
            <option value="" disabled>
              choose relationship
            </option>

            {caregiverRelationshipFiltered?.relationship?.map(
              (item: { id: string; value: string }) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              )
            )}
          </Field>
          <ErrorMessage
            name={`caregiver[${index}].caregiverRelationshipWithParentData`}
          />
        </div>
      </div>

      {/* church location and branch
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
      </div> */}

      <div className="input_group">
        <label htmlFor={`caregiver[${index}].photograph`}>Upload Photo</label>
        <ImageFileUploader
          id={`caregiver[${index}].photograph`}
          ariaLabel="Upload Photo"
        />
        <ErrorMessage name={`caregiver[${index}].photograph`} />
      </div>
    </section>
  );
};

export default CaregiverComponent;
