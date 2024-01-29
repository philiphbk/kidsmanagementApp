import { useState, ChangeEvent } from "react";

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useField,
  useFormikContext,
} from "formik";

import {
  branchAndCenterData,
  departmentInChurchData,
  genderData,
  locationTypeData,
  relationshipData,
  relationshipTypeData,
  roleInChurchData,
} from "@/lib/data/dummy-data";

import {
  Department,
  OptionType,
  MySelectComponentProps,
} from "@/lib/definitions/form-interfaces";

import Select, { SingleValue } from "react-select";

import {
  Caregiver,
  RegistrationFormValues,
} from "@/lib/definitions/form-interfaces";
import ImageFileUploader from "../../components/ImageFileUploader";

const CaregiverComponent = ({ index }: { index: number }) => {
  const { setFieldValue } = useFormikContext<Caregiver>();

  const [currentType, setCurrentType] = useState("parent");
  const [currentLocation, setCurrentLocation] = useState("lagos");

  const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value, id } = e.target;

    if (id.includes("relationshipWithChildType")) {
      setCurrentType(value);
      setFieldValue(`caregiver[${index}].relationshipWithChild`, "");
    }

    if (id.includes("churchLocation")) {
      setCurrentLocation(value);
      setFieldValue(`caregiver[${index}].churchBranchInLocation`, "");
    }

    setFieldValue(name, value);
  };

  const relationshipDataFiltered = relationshipData?.find(
    (relationship) => relationship.type === currentType
  );

  const branchAndCenterFiltered = branchAndCenterData?.find(
    (branch) => branch.locationId === currentLocation
  );

  const [field] = useField(`caregiver[${index}].departmentInChurch`);

  const options: OptionType[] = departmentInChurchData.map((dept) => ({
    value: dept.id,
    label: dept.value,
  }));

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setFieldValue(
      `caregiver[${index}].departmentInChurch`,
      selectedOption?.value
    );
  };

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

      {/* ministry */}
      <div className="input_group">
        <label htmlFor={`caregiver[${index}].departmentInChurch`}>
          Department in church
        </label>
        <Select
          options={options}
          onChange={(e) => {
            setFieldValue(`caregiver[${index}].departmentInChurch`, e?.value);
          }}
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
        <ErrorMessage name={`caregiver[${index}].departmentInChurch`} />
      </div>

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

          {currentType !== "other" ? (
            <>
              <Field
                name={`caregiver[${index}].relationshipWithChild`}
                id={`caregiver[${index}].relationshipWithChild`}
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
              <ErrorMessage
                name={`caregiver[${index}].relationshipWithChild`}
              />
            </>
          ) : (
            <>
              <Field
                name={`caregiver[${index}].relationshipWithChild`}
                id={`caregiver[${index}].relationshipWithChild`}
                type="text"
                className="hod_input"
                aria-placeholder="Specify Relationship"
                aria-label="Specify Relationship"
              />
              <ErrorMessage
                name={`caregiver[${index}].relationshipWithChild`}
              />
            </>
          )}
        </div>
      </div>

      {/* relationship with parent */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor={`caregiver[${index}].relationshipWithParentType`}>
            Relationship with Parent
          </label>
          <Field
            name={`caregiver[${index}].relationshipWithParentType`}
            id={`caregiver[${index}].relationshipWithParentType`}
            as="select"
            className="hod_input"
            aria-label="Relationship with parent"
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
            name={`caregiver[${index}].relationshipWithParentType`}
          />
        </div>

        <div className="input_group">
          <label htmlFor={`caregiver[${index}].relationshipWithParent`}>
            Specify Relationship
          </label>

          {currentType !== "other" ? (
            <>
              <Field
                name={`caregiver[${index}].relationshipWithParent`}
                id={`caregiver[${index}].relationshipWithParent`}
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
              <ErrorMessage
                name={`caregiver[${index}].relationshipWithParent`}
              />
            </>
          ) : (
            <>
              <Field
                name={`caregiver[${index}].relationshipWithParent`}
                id={`caregiver[${index}].relationshipWithParent`}
                type="text"
                className="hod_input"
                aria-placeholder="Specify Relationship"
                aria-label="Specify Relationship"
              />
              <ErrorMessage
                name={`caregiver[${index}].relationshipWithParent`}
              />
            </>
          )}
        </div>
      </div>

      {/* church location and branch */}
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
      </div>

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
