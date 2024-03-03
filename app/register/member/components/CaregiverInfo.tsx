import React, { useState, ChangeEvent, Key } from "react";

import {
  ErrorMessage,
  Field,
  FieldArray,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";

import {
  departmentInChurchData,
  genderData,
  relationshipData,
  relationshipTypeData,
  roleInChurchData,
  caregiverRelationshipTypeWithParent,
  caregiverRelationshipWithParentData,
} from "@/lib/data/dummy-data";

import {
  OptionType,
  RegistrationForm,
  CaregiverForm,
} from "@/lib/definitions/form-interfaces";

import ImageFileUploader from "../../components/ImageFileUploader";

interface PropsInterface {
  errors: FormikErrors<RegistrationForm>;
  touched: FormikTouched<RegistrationForm>;
}

interface CaregiverProps extends CaregiverForm, PropsInterface {}

const CaregiverInfoComponent: React.FC<CaregiverProps> = ({
  errors,
  touched,
}) => {
  const { values, setFieldValue } = useFormikContext<RegistrationForm>();
  const [numberOfCaregivers, setNumberOfCaregivers] = useState(1);
  const [relationshipType, setRelationshipType] = useState("parent");
  const [currentCaregiverType, setCurrentCaregiverType] = useState("");
  const [otherRelationship, setOtherRelationship] = useState({
    status: false,
    value: "",
  });

  const options: OptionType[] = departmentInChurchData.map((dept) => ({
    value: dept.id,
    label: dept.value,
  }));

  const handleCaregiverNumberChange = (event: { target: { value: any } }) => {
    const newNumberOfCaregiver = Number(event.target.value);
    setNumberOfCaregivers(newNumberOfCaregiver);
  };

  const handleRelationshipChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: any
  ) => {
    const { name, value, id } = e.target;

    if (id.includes("relationshipWithChildType")) {
      setRelationshipType(value);
      setOtherRelationship({ ...otherRelationship, status: false });
      setFieldValue(`caregiver[${index}].relationshipWithChild`, "");
      setFieldValue(name, value);
    }

    if (id.includes("caregiverGuardian")) {
      if (value === "other") {
        setOtherRelationship({ ...otherRelationship, status: true });
        setFieldValue(
          `caregiver[${index}].relationshipWithChildType`,
          "guardian"
        );
      } else {
        setOtherRelationship({ ...otherRelationship, status: false });
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
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: any) => {
    const { value } = e.target;
    setFieldValue(`caregiver[${index}].relationshipWithChild`, value);
  };

  const caregiverRelationshipFiltered =
    caregiverRelationshipWithParentData?.find(
      (CaregiverRelationship) =>
        CaregiverRelationship.type === currentCaregiverType
    );

  const relationshipDataFiltered = relationshipData?.find(
    (relationship) => relationship.type === relationshipType
  );

  return (
    <div className="personal_info">
      <div className="input_group">
        <label htmlFor="caregiverNumber">How many Caregivers?</label>
        <Field
          as="select"
          name="caregiverNumber"
          onChange={handleCaregiverNumberChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          {/* Add more options as needed */}
        </Field>
      </div>

      <FieldArray
        name="caregiver"
        render={(arrayHelpers) => (
          <div>
            {values.caregiver.map(
              (caregiver: any, index: Key | null | undefined) => (
                <div key={index}>
                  <div className="flex gap-x-6 flex-col md:flex-row">
                    <div className="input_group">
                      <label htmlFor={`caregiver[${index}].firstName`}>
                        First Name
                      </label>
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
                      <label htmlFor={`caregiver[${index}].lastName`}>
                        Last Name
                      </label>
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
                  <div className="input_group">
                    <label htmlFor={`caregiver[${index}].email`}>Email</label>
                    <Field
                      name={`caregiver[${index}].email`}
                      id={`caregiver[${index}].email`}
                      type="email"
                      className="hod_input"
                      aria-placeholder="Enter email"
                      aria-label="Email"
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

                  <div className="input_group">
                    {`errors?.caregiver[${index}]?.roleInChurch` &&
                      `touched?.caregiver[${index}]?.roleInChurch` && (
                        <span className="text-red">{`errors?.caregiver[${index}]?.roleInChurch`}</span>
                      )}
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
                        setFieldValue(
                          `caregiver[${index}].roleInChurch`,
                          value
                        );
                        if (value !== "Visitor" && value !== "Member") {
                          setFieldValue(
                            `caregiver[${index}].departmentInChurch`,
                            ""
                          );
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
                  {`values.caregiver[${index}].roleInChurch` &&
                    `values.caregiver[${index}].roleInChurch` !== "Visitor" &&
                    `values.caregiver[${index}].roleInChurch` !== "Member" && (
                      <div className="input_group">
                        {`errors?.caregiver[${index}]?.departmentInChurch` &&
                          `touched?.caregiver[${index}]?.departmentInChurch` && (
                            <span className="text-red">
                              {`errors?.caregiver[${index}]?.departmentInChurch`}
                            </span>
                          )}
                        <label
                          htmlFor={`caregiver[${index}].departmentInChurch`}
                        >
                          Department in church
                        </label>
                        <Field
                          name={`caregiver[${index}].departmentInChurch`}
                          options={options}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setFieldValue(
                              `caregiver[${index}].departmentInChurch`,
                              e?.target.value
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
                        <ErrorMessage
                          name={`caregiver[${index}].departmentInChurch`}
                        />
                      </div>
                    )}

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
                    <ErrorMessage
                      name={`caregiver[${index}].phoneNumberPrimary`}
                    />
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
                    <ErrorMessage
                      name={`caregiver[${index}].phoneNumberSecondary`}
                    />
                  </div>

                  {/* relationship with child */}
                  <div className="flex gap-x-6 flex-col md:flex-row">
                    <div className="input_group">
                      <label
                        htmlFor={`caregiver[${index}].relationshipWithChildType`}
                      >
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
                      <label
                        htmlFor={`caregiver[${index}].relationshipWithChild`}
                      >
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
                      <ErrorMessage name={`caregiverGuardian`} />
                    </div>
                  </div>

                  {/* exact relationship */}
                  {otherRelationship.status && (
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
                        defaultValue={otherRelationship.value}
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

                        {caregiverRelationshipTypeWithParent?.map(
                          (relationship) => (
                            <option
                              key={relationship.id}
                              value={relationship.id}
                            >
                              {relationship.type}
                            </option>
                          )
                        )}
                      </Field>
                      <ErrorMessage
                        name={`caregiver[${index}].relationshipWithParentType`}
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

                  <div className="input_group">
                    <label htmlFor={`caregiver[${index}].photograph`}>
                      Upload Photo
                    </label>
                    <ImageFileUploader
                      id={`caregiver[${index}].photograph`}
                      ariaLabel="Upload Photo"
                    />
                    <ErrorMessage name={`caregiver[${index}].photograph`} />
                  </div>
                </div>
              )
            )}
            ;
          </div>
        )}
      />
    </div>
  );
};

export default CaregiverInfoComponent;
