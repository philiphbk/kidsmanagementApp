import { ChangeEvent, useState, useEffect } from "react";

import { ErrorMessage, Field, FormikErrors, FormikTouched, useFormikContext } from "formik";

import { ageGroupData, genderData, relationshipData, relationshipTypeData } from "@/lib/data/dummy-data";
import { ChildInformation } from "@/lib/definitions/form-interfaces";

import ImageUploader from "../../components/ImageUploader";

// interface PropsInterface {
//     errors: FormikErrors<RegistrationFormValues>;
//     touched: FormikTouched<RegistrationFormValues>;
// }

// interface ChildInformationProps extends ChildInformation, PropsInterface { }

const ChildInformationComponent = ({ index }: { index: number }) => {
    const formikContext = useFormikContext<ChildInformation>();

    const [currentType, setCurrentType] = useState("");

    const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value, id } = e.target;

        if (id.includes("relationshipWithChildType")) {
            setCurrentType(value);
            formikContext.setFieldValue(`childInformation[${index}].relationshipWithChild`, "");
        }

        console.log(e, name, value)

        // Update otherField in formik context based on the selected value
        formikContext.setFieldValue(name, value);
    };

    const relationshipDataFiltered = relationshipData?.find((relationship) => relationship.type === currentType);

    return (
        <div className="personal_info">
            {/* full name */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`childInformation[${index}].firstName`}>First Name</label>
                    <Field
                        // name="childInformation.firstName"
                        name={`childInformation[${index}].firstName`}
                        id={`childInformation[${index}].firstName`}
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter first name"
                        aria-label="First Name"
                    />
                    <ErrorMessage
                        name={`childInformation[${index}].firstName`}
                    />
                    {/* {errors?.childInformation?.firstName
                        && touched?.childInformation?.firstName ? (
                        <div>{errors?.childInformation?.firstName}</div>
                    ) : null} */}
                </div>

                <div className="input_group">
                    <label htmlFor={`childInformation[${index}].lastName`}>Last Name</label>
                    <Field
                        name={`childInformation[${index}].lastName`}
                        id={`childInformation[${index}].lastName`}
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter last name"
                        aria-label="Last Name"
                    />
                    <ErrorMessage
                        name={`childInformation[${index}].lastName`}
                    />
                </div>
            </div>

            {/* date of birth and gender */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`childInformation[${index}].dateOfBirth`}>Date of birth</label>
                    <Field
                        name={`childInformation[${index}].dateOfBirth`}
                        id={`childInformation[${index}].dateOfBirth`}
                        type="date"
                        className="hod_input"
                        aria-placeholder="Enter date of birth name"
                        aria-label="Date of birth"
                    />
                    <ErrorMessage
                        name={`childInformation[${index}].dateOfBirth`}
                    />
                </div>

                <div className="input_group">
                    <label htmlFor={`childInformation[${index}].gender`}>Gender</label>
                    <Field
                        name={`childInformation[${index}].gender`}
                        id={`childInformation[${index}].gender`}
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
                        name={`childInformation[${index}].gender`}
                    />
                </div>
            </div>

            {/* photograph */}
            <div className="input_group">
                <label htmlFor={`childInformation[${index}].photograph`}>Upload a clear photograph</label>
                <ImageUploader id={`childInformation[${index}].photograph`} ariaLabel="Upload a clear photograph" />
                <ErrorMessage
                    name={`childInformation[${index}].photograph`}
                />
            </div>

            {/* age group */}
            <div className="input_group">
                <label htmlFor={`childInformation[${index}].ageGroup`}>Age Group</label>
                <Field
                    name={`childInformation[${index}].ageGroup`}
                    id={`childInformation[${index}].ageGroup`}
                    as="select"
                    className="hod_input"
                    aria-label="Age Group"
                >
                    <option value="" disabled>select age group</option>

                    {ageGroupData?.map(group => (
                        <option
                            key={group.id}
                            value={group.id}
                        >
                            {group.value}
                        </option>
                    ))}
                </Field>
                <ErrorMessage
                    name={`childInformation[${index}].ageGroup`}
                />
            </div>

            {/* relationship with child */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`childInformation[${index}].relationshipWithChildType`}>Relationship with child</label>
                    <Field
                        name={`childInformation[${index}].relationshipWithChildType`}
                        id={`childInformation[${index}].relationshipWithChildType`}
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
                        name={`childInformation[${index}].relationshipWithChildType`}
                    />
                </div>

                <div className="input_group">
                    <label htmlFor={`childInformation[${index}].relationshipWithChild`}>Specify Relationship</label>

                    {currentType !== "other" ? (
                        <>
                            <Field
                                name={`childInformation[${index}].relationshipWithChild`}
                                id={`childInformation[${index}].relationshipWithChild`}
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
                                name={`childInformation[${index}].relationshipWithChild`}
                            />
                        </>
                    ) : (
                        <>
                            <Field
                                name={`childInformation[${index}].relationshipWithChild`}
                                id={`childInformation[${index}].relationshipWithChild`}
                                type="text"
                                className="hod_input"
                                aria-placeholder="Specify Relationship"
                                aria-label="Specify Relationship"
                            />
                            <ErrorMessage
                                name={`childInformation[${index}].relationshipWithChild`}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* special need */}
            <div className="input_group">
                <label htmlFor={`childInformation[${index}].specialNeeds`}>
                    Special Needs <span className="font-normal text-hod-text-gray2 text-base leading-6 italic">(Any special type of care for the child)</span>
                </label>
                <Field
                    name={`childInformation[${index}].specialNeeds`}
                    id={`childInformation[${index}].specialNeeds`}
                    type="text"
                    className="hod_input"
                    aria-placeholder="Enter any special needs for the child"
                    aria-label="Special Needs"
                />
                <ErrorMessage
                    name={`childInformation[${index}].specialNeeds`}
                />
            </div>
        </div>
    );
};

export default ChildInformationComponent;
