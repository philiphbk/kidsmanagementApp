import { useState, ChangeEvent } from "react";

import { ErrorMessage, Field, FormikErrors, FormikTouched, useFormikContext } from "formik";

import {
    branchAndCenterData,
    departmentInChurchData,
    genderData,
    locationTypeData,
    relationshipData,
    relationshipTypeData,
    roleInChurchData
} from "@/lib/data/dummy-data";

import ImageUploader from "../../components/ImageUploader";

import { CaregiverInformation, RegistrationFormValues } from "@/lib/definitions/form-interfaces";
import ImageFileUploader from "../../components/ImageFileUploader";

// interface PropsInterface {
//     errors: FormikErrors<RegistrationFormValues>;
//     touched: FormikTouched<RegistrationFormValues>;
// }

// interface CaregiverInformationProps extends CaregiverInformation, PropsInterface { }

const CaregiverInformationComponent = ({ index }: { index: number }) => {
    const formikContext = useFormikContext<CaregiverInformation>();

    const [currentType, setCurrentType] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");

    const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value, id } = e.target;

        if (id.includes("relationshipWithChildType")) {
            setCurrentType(value);
            formikContext.setFieldValue(`caregiverInformation[${index}].relationshipWithChild`, "");
        }

        if (id.includes("churchLocation")) {
            setCurrentLocation(value);
            formikContext.setFieldValue(`caregiverInformation[${index}].churchBranchInLocation`, "");
        }

        console.log(e, name, value)

        // Update otherField in formik context based on the selected value
        formikContext.setFieldValue(name, value);
    };

    const relationshipDataFiltered = relationshipData?.find((relationship) => relationship.type === currentType);

    const branchAndCenterFiltered = branchAndCenterData?.find((branch) => branch.locationId === currentLocation);

    return (
        <section className="personal_info">
            {/* full name */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`caregiverInformation[${index}].firstName`}>First Name</label>
                    <Field
                        name={`caregiverInformation[${index}].firstName`}
                        id={`caregiverInformation[${index}].firstName`}
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter first name"
                        aria-label="First Name"
                    />
                    <ErrorMessage
                        name={`caregiverInformation[${index}].firstName`}
                    />
                </div>

                <div className="input_group">
                    <label htmlFor={`caregiverInformation[${index}].lastName`}>Last Name</label>
                    <Field
                        name={`caregiverInformation[${index}].lastName`}
                        id={`caregiverInformation[${index}].lastName`}
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter last name"
                        aria-label="Last Name"
                    />
                    <ErrorMessage
                        name={`caregiverInformation[${index}].lastName`}
                    />
                </div>
            </div>

            {/* email */}
            <div className="input_group">
                <label htmlFor={`caregiverInformation[${index}].email`}>Email Address</label>
                <Field
                    name={`caregiverInformation[${index}].email`}
                    id={`caregiverInformation[${index}].email`}
                    type="email"
                    className="hod_input"
                    aria-placeholder="Enter email"
                    aria-label="Email Address"
                />
                <ErrorMessage name={`caregiverInformation[${index}].email`} />
            </div>

            {/* gender */}
            <div className="input_group">
                <label htmlFor={`caregiverInformation[${index}].gender`}>Gender</label>
                <Field
                    name={`caregiverInformation[${index}].gender`}
                    id={`caregiverInformation[${index}].gender`}
                    as="select"
                    className="hod_input"
                    aria-label="Gender"
                >
                    <option value="" disabled>select gender</option>

                    {genderData?.map(gender => (
                        <option
                            key={gender.id}
                            value={gender.id}
                        >
                            {gender.value}
                        </option>
                    ))}
                </Field>
                <ErrorMessage
                    name={`caregiverInformation[${index}].gender`}
                />
            </div>

            {/* role */}
            <div className="input_group">
                <label htmlFor={`caregiverInformation[${index}].roleInChurch`}>Role in church</label>
                <Field
                    name={`caregiverInformation[${index}].roleInChurch`}
                    id={`caregiverInformation[${index}].roleInChurch`}
                    as="select"
                    className="hod_input"
                    aria-label="Role in church"
                >
                    <option value="" disabled>select role in church</option>

                    {roleInChurchData?.map(role => (
                        <option
                            key={role.id}
                            value={role.id}
                        >
                            {role.value}
                        </option>
                    ))}
                </Field>
                <ErrorMessage
                    name={`caregiverInformation[${index}].roleInChurch`}
                />
            </div>

            {/* ministry */}
            <div className="input_group">
                <label htmlFor={`caregiverInformation[${index}].departmentInChurch`}>Department in church</label>
                <Field
                    name={`caregiverInformation[${index}].departmentInChurch`}
                    id={`caregiverInformation[${index}].departmentInChurch`}
                    as="select"
                    className="hod_input"
                    aria-label="Department in church"
                >
                    <option value="" disabled>select department in church</option>

                    {departmentInChurchData?.map(dept => (
                        <option
                            key={dept.id}
                            value={dept.id}
                        >
                            {dept.value}
                        </option>
                    ))}
                </Field>
                <ErrorMessage
                    name={`caregiverInformation[${index}].departmentInChurch`}
                />
            </div>

            <div className="input_group">
                <label htmlFor={`caregiverInformation[${index}].phoneNumberPrimary`}>Primary Phone Number</label>
                <Field
                    name={`caregiverInformation[${index}].phoneNumberPrimary`}
                    id={`caregiverInformation[${index}].phoneNumberPrimary`}
                    type="text"
                    className="hod_input"
                    aria-placeholder="Enter primary phone number"
                    aria-label="Primary Phone Number"
                />
                <ErrorMessage name={`caregiverInformation[${index}].phoneNumberPrimary`} />
            </div>

            <div className="input_group">
                <label htmlFor={`caregiverInformation[${index}].phoneNumberSecondary`}>Secondary Phone Number</label>
                <Field
                    name={`caregiverInformation[${index}].phoneNumberSecondary`}
                    id={`caregiverInformation[${index}].phoneNumberSecondary`}
                    type="text"
                    className="hod_input"
                    aria-placeholder="Enter secondary phone number"
                    aria-label="Secondary Phone Number"
                />
                <ErrorMessage name={`caregiverInformation[${index}].phoneNumberSecondary`} />
            </div>

            {/* relationship with child */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`caregiverInformation[${index}].relationshipWithChildType`}>Relationship with child</label>
                    <Field
                        name={`caregiverInformation[${index}].relationshipWithChildType`}
                        id={`caregiverInformation[${index}].relationshipWithChildType`}
                        as="select"
                        className="hod_input"
                        aria-label="Relationship with child"
                        onChange={handleRelationshipChange}
                    >
                        <option value="" disabled>select relationship</option>

                        {relationshipTypeData?.map(relationship => (
                            <option
                                key={relationship.id}
                                value={relationship.id}
                            >
                                {relationship.type}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name={`caregiverInformation[${index}].relationshipWithChildType`}
                    />
                </div>

                <div className="input_group">
                    <label htmlFor={`caregiverInformation[${index}].relationshipWithChild`}>Specify Relationship</label>

                    {currentType !== "other" ? (
                        <>
                            <Field
                                name={`caregiverInformation[${index}].relationshipWithChild`}
                                id={`caregiverInformation[${index}].relationshipWithChild`}
                                as="select"
                                className="hod_input"
                                aria-label="Specify Relationship"
                                onChange={handleRelationshipChange}
                            // disabled={!currentType}
                            >
                                <option value="" disabled>choose relationship</option>

                                {relationshipDataFiltered?.relationship?.map((item: { id: string, value: string }) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.value}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name={`caregiverInformation[${index}].relationshipWithChild`}
                            />
                        </>
                    ) : (
                        <>
                            <Field
                                name={`caregiverInformation[${index}].relationshipWithChild`}
                                id={`caregiverInformation[${index}].relationshipWithChild`}
                                type="text"
                                className="hod_input"
                                aria-placeholder="Specify Relationship"
                                aria-label="Specify Relationship"
                            />
                            <ErrorMessage
                                name={`caregiverInformation[${index}].relationshipWithChild`}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* relationship with parent */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`caregiverInformation[${index}].relationshipWithChildType`}>Relationship with child</label>
                    <Field
                        name={`caregiverInformation[${index}].relationshipWithChildType`}
                        id={`caregiverInformation[${index}].relationshipWithChildType`}
                        as="select"
                        className="hod_input"
                        aria-label="Relationship with child"
                        onChange={handleRelationshipChange}
                    >
                        <option value="" disabled>select relationship</option>

                        {relationshipTypeData?.map(relationship => (
                            <option
                                key={relationship.id}
                                value={relationship.id}
                            >
                                {relationship.type}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage
                        name={`caregiverInformation[${index}].relationshipWithChildType`}
                    />
                </div>

                <div className="input_group">
                    <label htmlFor={`caregiverInformation[${index}].relationshipWithChild`}>Specify Relationship</label>

                    {currentType !== "other" ? (
                        <>
                            <Field
                                name={`caregiverInformation[${index}].relationshipWithChild`}
                                id={`caregiverInformation[${index}].relationshipWithChild`}
                                as="select"
                                className="hod_input"
                                aria-label="Specify Relationship"
                                onChange={handleRelationshipChange}
                            // disabled={!currentType}
                            >
                                <option value="" disabled>choose relationship</option>

                                {relationshipDataFiltered?.relationship?.map((item: { id: string, value: string }) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.value}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name={`caregiverInformation[${index}].relationshipWithChild`}
                            />
                        </>
                    ) : (
                        <>
                            <Field
                                name={`caregiverInformation[${index}].relationshipWithChild`}
                                id={`caregiverInformation[${index}].relationshipWithChild`}
                                type="text"
                                className="hod_input"
                                aria-placeholder="Specify Relationship"
                                aria-label="Specify Relationship"
                            />
                            <ErrorMessage
                                name={`caregiverInformation[${index}].relationshipWithChild`}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* church location and branch */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`caregiverInformation[${index}].churchLocation`}>Church Location</label>
                    <Field
                        name={`caregiverInformation[${index}].churchLocation`}
                        id={`caregiverInformation[${index}].churchLocation`}
                        as="select"
                        className="hod_input"
                        aria-label="Church Location"
                        onChange={handleRelationshipChange}
                    >
                        <option value="" disabled>select church location</option>

                        {locationTypeData?.map(location => (
                            <option
                                key={location.id}
                                value={location.id}
                            >
                                {location.value}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name={`caregiverInformation[${index}].churchLocation`} />
                </div>

                <div className="input_group">
                    <label htmlFor={`caregiverInformation[${index}].churchBranchInLocation`}>Branch / Center</label>

                    <Field
                        name={`caregiverInformation[${index}].churchBranchInLocation`}
                        id={`caregiverInformation[${index}].churchBranchInLocation`}
                        as="select"
                        className="hod_input"
                        aria-label="Branch / Center"
                        onChange={handleRelationshipChange}
                    >
                        <option value="" disabled>select branch or center</option>

                        {branchAndCenterFiltered?.branches?.map((item: any) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.value}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name={`caregiverInformation[${index}].churchBranchInLocation`} />
                </div>
            </div>

            <div className="input_group">
                <label htmlFor={`caregiverInformation[${index}].photograph`}>Upload Photo</label>
                <ImageFileUploader id={`caregiverInformation[${index}].photograph`} ariaLabel="Upload Photo" />
                <ErrorMessage
                    name={`caregiverInformation[${index}].photograph`}
                />
            </div>
        </section>
    );
};

export default CaregiverInformationComponent;
