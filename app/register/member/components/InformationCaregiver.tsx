import { useState, ChangeEvent } from "react";

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
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

import ImageUploader from "../../components/ImageUploader";

import {
  Caregiver,
  RegistrationFormValues,
} from "@/lib/definitions/form-interfaces";
import ImageFileUploader from "../../components/ImageFileUploader";

// interface PropsInterface {
//     errors: FormikErrors<RegistrationFormValues>;
//     touched: FormikTouched<RegistrationFormValues>;
// }

// interface CaregiverProps extends Caregiver, PropsInterface { }

const CaregiverComponent = ({ index }: { index: number }) => {
  const formikContext = useFormikContext<Caregiver>();

  const [currentType, setCurrentType] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value, id } = e.target;

    if (id.includes("relationshipWithChildType")) {
      setCurrentType(value);
      formikContext.setFieldValue(
        `Caregiver[${index}].relationshipWithChild`,
        ""
      );
    }

    if (id.includes("churchLocation")) {
      setCurrentLocation(value);
      formikContext.setFieldValue(
        `Caregiver[${index}].churchBranchInLocation`,
        ""
      );
    }

    console.log(e, name, value);

    // Update otherField in formik context based on the selected value
    formikContext.setFieldValue(name, value);
  };

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
          <label htmlFor={`Caregiver[${index}].firstName`}>
            First Name
          </label>
          <Field
            name={`Caregiver[${index}].firstName`}
            id={`Caregiver[${index}].firstName`}
            type="text"
            className="hod_input"
            aria-placeholder="Enter first name"
            aria-label="First Name"
          />
          <ErrorMessage name={`Caregiver[${index}].firstName`} />
        </div>

        <div className="input_group">
          <label htmlFor={`Caregiver[${index}].lastName`}>
            Last Name
          </label>
          <Field
            name={`Caregiver[${index}].lastName`}
            id={`Caregiver[${index}].lastName`}
            type="text"
            className="hod_input"
            aria-placeholder="Enter last name"
            aria-label="Last Name"
          />
          <ErrorMessage name={`Caregiver[${index}].lastName`} />
        </div>
      </div>

      {/* email */}
      <div className="input_group">
        <label htmlFor={`Caregiver[${index}].email`}>
          Email Address
        </label>
        <Field
          name={`Caregiver[${index}].email`}
          id={`Caregiver[${index}].email`}
          type="email"
          className="hod_input"
          aria-placeholder="Enter email"
          aria-label="Email Address"
        />
        <ErrorMessage name={`Caregiver[${index}].email`} />
      </div>

      {/* gender */}
      <div className="input_group">
        <label htmlFor={`Caregiver[${index}].gender`}>Gender</label>
        <Field
          name={`Caregiver[${index}].gender`}
          id={`Caregiver[${index}].gender`}
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
        <ErrorMessage name={`Caregiver[${index}].gender`} />
      </div>

      {/* role */}
      <div className="input_group">
        <label htmlFor={`Caregiver[${index}].roleInChurch`}>
          Role in church
        </label>
        <Field
          name={`Caregiver[${index}].roleInChurch`}
          id={`Caregiver[${index}].roleInChurch`}
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
        <ErrorMessage name={`Caregiver[${index}].roleInChurch`} />
      </div>

      {/* ministry */}
      <div className="input_group">
        <label htmlFor={`Caregiver[${index}].departmentInChurch`}>
          Department in church
        </label>
        <Field
          name={`Caregiver[${index}].departmentInChurch`}
          id={`Caregiver[${index}].departmentInChurch`}
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
        </Field>
        <ErrorMessage
          name={`Caregiver[${index}].departmentInChurch`}
        />
      </div>

      <div className="input_group">
        <label htmlFor={`Caregiver[${index}].phoneNumberPrimary`}>
          Primary Phone Number
        </label>
        <Field
          name={`Caregiver[${index}].phoneNumberPrimary`}
          id={`Caregiver[${index}].phoneNumberPrimary`}
          type="text"
          className="hod_input"
          aria-placeholder="Enter primary phone number"
          aria-label="Primary Phone Number"
        />
        <ErrorMessage
          name={`Caregiver[${index}].phoneNumberPrimary`}
        />
      </div>

      <div className="input_group">
        <label htmlFor={`Caregiver[${index}].phoneNumberSecondary`}>
          Secondary Phone Number
        </label>
        <Field
          name={`Caregiver[${index}].phoneNumberSecondary`}
          id={`Caregiver[${index}].phoneNumberSecondary`}
          type="text"
          className="hod_input"
          aria-placeholder="Enter secondary phone number"
          aria-label="Secondary Phone Number"
        />
        <ErrorMessage
          name={`Caregiver[${index}].phoneNumberSecondary`}
        />
      </div>

      {/* relationship with child */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label
            htmlFor={`Caregiver[${index}].relationshipWithChildType`}
          >
            Relationship with child
          </label>
          <Field
            name={`Caregiver[${index}].relationshipWithChildType`}
            id={`Caregiver[${index}].relationshipWithChildType`}
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
            name={`Caregiver[${index}].relationshipWithChildType`}
          />
        </div>

        <div className="input_group">
          <label
            htmlFor={`Caregiver[${index}].relationshipWithChild`}
          >
            Specify Relationship
          </label>

          {currentType !== "other" ? (
            <>
              <Field
                name={`Caregiver[${index}].relationshipWithChild`}
                id={`Caregiver[${index}].relationshipWithChild`}
                as="select"
                className="hod_input"
                aria-label="Specify Relationship"
                onChange={handleRelationshipChange}
                // disabled={!currentType}
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
                name={`Caregiver[${index}].relationshipWithChild`}
              />
            </>
          ) : (
            <>
              <Field
                name={`Caregiver[${index}].relationshipWithChild`}
                id={`Caregiver[${index}].relationshipWithChild`}
                type="text"
                className="hod_input"
                aria-placeholder="Specify Relationship"
                aria-label="Specify Relationship"
              />
              <ErrorMessage
                name={`Caregiver[${index}].relationshipWithChild`}
              />
            </>
          )}
        </div>
      </div>

      {/* relationship with parent */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label
            htmlFor={`Caregiver[${index}].relationshipWithParentType`}
          >
            Relationship with Parent
          </label>
          <Field
            name={`Caregiver[${index}].relationshipWithParentType`}
            id={`Caregiver[${index}].relationshipWithParentType`}
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
            name={`Caregiver[${index}].relationshipWithParentType`}
          />
        </div>

        <div className="input_group">
          <label
            htmlFor={`Caregiver[${index}].relationshipWithParent`}
          >
            Specify Relationship
          </label>

          {currentType !== "other" ? (
            <>
              <Field
                name={`Caregiver[${index}].relationshipWithParent`}
                id={`Caregiver[${index}].relationshipWithParent`}
                as="select"
                className="hod_input"
                aria-label="Specify Relationship"
                onChange={handleRelationshipChange}
                // disabled={!currentType}
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
                name={`Caregiver[${index}].relationshipWithParent`}
              />
            </>
          ) : (
            <>
              <Field
                name={`Caregiver[${index}].relationshipWithParent`}
                id={`Caregiver[${index}].relationshipWithParent`}
                type="text"
                className="hod_input"
                aria-placeholder="Specify Relationship"
                aria-label="Specify Relationship"
              />
              <ErrorMessage
                name={`Caregiver[${index}].relationshipWithParent`}
              />
            </>
          )}
        </div>
      </div>

      {/* church location and branch */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor={`Caregiver[${index}].churchLocation`}>
            Church Location
          </label>
          <Field
            name={`Caregiver[${index}].churchLocation`}
            id={`Caregiver[${index}].churchLocation`}
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
          <ErrorMessage
            name={`Caregiver[${index}].churchLocation`}
          />
        </div>

        <div className="input_group">
          <label
            htmlFor={`Caregiver[${index}].churchBranchInLocation`}
          >
            Branch / Center
          </label>

          <Field
            name={`Caregiver[${index}].churchBranchInLocation`}
            id={`Caregiver[${index}].churchBranchInLocation`}
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
          <ErrorMessage
            name={`Caregiver[${index}].churchBranchInLocation`}
          />
        </div>
      </div>

      <div className="input_group">
        <label htmlFor={`Caregiver[${index}].photograph`}>
          Upload Photo
        </label>
        <ImageFileUploader
          id={`Caregiver[${index}].photograph`}
          ariaLabel="Upload Photo"
        />
        <ErrorMessage name={`Caregiver[${index}].photograph`} />
      </div>
    </section>
  );
};

export default CaregiverComponent;
