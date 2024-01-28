import { ChangeEvent, useState, useEffect } from "react";

import { ErrorMessage, Field, FormikErrors, FormikTouched, useFormikContext } from "formik";

import { ageGroupData, genderData, relationshipData, relationshipTypeData } from "@/lib/data/dummy-data";
import { Child } from "@/lib/definitions/form-interfaces";

import ImageUploader from "../../components/ImageUploader";
import ImageFileUploader from "../../components/ImageFileUploader";

// interface PropsInterface {
//     errors: FormikErrors<RegistrationFormValues>;
//     touched: FormikTouched<RegistrationFormValues>;
// }

// interface ChildProps extends Child, PropsInterface { }

const ChildComponent = ({ index }: { index: number }) => {
    const formikContext = useFormikContext<Child>();

    const [currentType, setCurrentType] = useState("");

    const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value, id } = e.target;

        if (id.includes("relationshipWithChildType")) {
            setCurrentType(value);
            formikContext.setFieldValue(`Child[${index}].relationshipWithChild`, "");
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
                    <label htmlFor={`Child[${index}].firstName`}>First Name</label>
                    <Field
                        // name="Child.firstName"
                        name={`Child[${index}].firstName`}
                        id={`Child[${index}].firstName`}
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter first name"
                        aria-label="First Name"
                    />
                    <ErrorMessage
                        name={`Child[${index}].firstName`}
                    />
                    {/* {errors?.Child?.firstName
                        && touched?.Child?.firstName ? (
                        <div>{errors?.Child?.firstName}</div>
                    ) : null} */}
                </div>

                <div className="input_group">
                    <label htmlFor={`Child[${index}].lastName`}>Last Name</label>
                    <Field
                        name={`Child[${index}].lastName`}
                        id={`Child[${index}].lastName`}
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter last name"
                        aria-label="Last Name"
                    />
                    <ErrorMessage
                        name={`Child[${index}].lastName`}
                    />
                </div>
            </div>

            {/* date of birth and gender */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`Child[${index}].dateOfBirth`}>Date of birth</label>
                    <Field
                        name={`Child[${index}].dateOfBirth`}
                        id={`Child[${index}].dateOfBirth`}
                        type="date"
                        className="hod_input"
                        aria-placeholder="Enter date of birth name"
                        aria-label="Date of birth"
                    />
                    <ErrorMessage
                        name={`Child[${index}].dateOfBirth`}
                    />
                </div>

                <div className="input_group">
                    <label htmlFor={`Child[${index}].gender`}>Gender</label>
                    <Field
                        name={`Child[${index}].gender`}
                        id={`Child[${index}].gender`}
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
                        name={`Child[${index}].gender`}
                    />
                </div>
            </div>

            {/* photograph */}
            <div className="input_group">
                <label htmlFor={`Child[${index}].photograph`}>Upload a clear photograph</label>
                <ImageFileUploader id={`Child[${index}].photograph`} ariaLabel="Upload a clear photograph" />
                <ErrorMessage
                    name={`Child[${index}].photograph`}
                />
            </div>

            {/* age group */}
            <div className="input_group">
                <label htmlFor={`Child[${index}].ageGroup`}>Age Group</label>
                <Field
                    name={`Child[${index}].ageGroup`}
                    id={`Child[${index}].ageGroup`}
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
                    name={`Child[${index}].ageGroup`}
                />
            </div>

            {/* relationship with child */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor={`Child[${index}].relationshipWithChildType`}>Relationship with child</label>
                    <Field
                        name={`Child[${index}].relationshipWithChildType`}
                        id={`Child[${index}].relationshipWithChildType`}
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
                        name={`Child[${index}].relationshipWithChildType`}
                    />
                </div>

                <div className="input_group">
                    <label htmlFor={`Child[${index}].relationshipWithChild`}>Specify Relationship</label>

                    {currentType !== "other" ? (
                        <>
                            <Field
                                name={`Child[${index}].relationshipWithChild`}
                                id={`Child[${index}].relationshipWithChild`}
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
                                name={`Child[${index}].relationshipWithChild`}
                            />
                        </>
                    ) : (
                        <>
                            <Field
                                name={`Child[${index}].relationshipWithChild`}
                                id={`Child[${index}].relationshipWithChild`}
                                type="text"
                                className="hod_input"
                                aria-placeholder="Specify Relationship"
                                aria-label="Specify Relationship"
                            />
                            <ErrorMessage
                                name={`Child[${index}].relationshipWithChild`}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* special need */}
            <div className="input_group">
                <label htmlFor={`Child[${index}].specialNeeds`}>
                    Special Needs <span className="font-normal text-hod-text-gray2 text-base leading-6 italic">(Any special type of care for the child)</span>
                </label>
                <Field
                    name={`Child[${index}].specialNeeds`}
                    id={`Child[${index}].specialNeeds`}
                    type="text"
                    className="hod_input"
                    aria-placeholder="Enter any special needs for the child"
                    aria-label="Special Needs"
                />
                <ErrorMessage
                    name={`Child[${index}].specialNeeds`}
                />
            </div>
        </div>
    );
};

export default ChildComponent;
