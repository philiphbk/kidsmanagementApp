import { useState, ChangeEvent } from "react";
import { genderData, relationshipTypeData, relationshipData } from "@/lib/data/dummy-data";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { VisitorParent } from "@/lib/definitions/form-interfaces";

const PersonalInformation = () => {
    const formikContext = useFormikContext<VisitorParent>();

    const [currentType, setCurrentType] = useState("");

    const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value, id } = e.target;

        if (id.includes("relationshipWithChildType")) {
            setCurrentType(value);
            formikContext.setFieldValue(`parentInformation.relationshipWithChild`, "");
        }

        // Update fields in formik context based on the selected value
        formikContext.setFieldValue(name, value);
    };

    const relationshipDataFiltered = relationshipData?.find((relationship) => relationship.type === currentType);


    return (
        <section className="personal_info">
            {/* full name */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                        name="parentInformation.firstName"
                        id="firstName"
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter first name"
                        aria-label="First Name"
                    />
                    <ErrorMessage name="parentInformation.firstName" />
                </div>

                <div className="input_group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                        name="parentInformation.lastName"
                        id="lastName"
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter last name"
                        aria-label="Last Name"
                    />
                    <ErrorMessage name="parentInformation.lastName" />
                </div>
            </div>

            {/* email */}
            <div className="input_group">
                <label htmlFor="parentInformation.email">Email Address</label>
                <Field
                    name="parentInformation.email"
                    id="parentInformation.email"
                    type="email"
                    className="hod_input"
                    aria-placeholder="Enter email"
                    aria-label="Email Address"
                />
                <ErrorMessage name="parentInformation.email" />
            </div>

            {/* gender */}
            <div className="input_group">
                <label htmlFor="parentInformation.gender">Gender</label>
                <Field
                    name="parentInformation.gender"
                    id="parentInformation.gender"
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
                <ErrorMessage name="parentInformation.gender" />
            </div>

            {/* primary phone */}
            <div className="input_group">
                <label htmlFor="parentInformation.phoneNumber">Primary Phone Number</label>
                <Field
                    name="parentInformation.phoneNumber"
                    id="parentInformation.phoneNumber"
                    type="text"
                    className="hod_input"
                    aria-placeholder="Enter primary phone number"
                    aria-label="Primary Phone Number"
                />
                <ErrorMessage name="parentInformation.phoneNumber" />
            </div>

            {/* relationship with child */}
            <div className="flex gap-x-6 flex-col md:flex-row">
                <div className="input_group">
                    <label htmlFor="parentInformation.relationshipWithChildType">Relationship with child</label>
                    <Field
                        name="parentInformation.relationshipWithChildType"
                        id="parentInformation.relationshipWithChildType"
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
                        name="parentInformation.relationshipWithChildType"
                    />
                </div>

                <div className="input_group">
                    <label htmlFor="parentInformation.relationshipWithChild">Specify Relationship</label>

                    {currentType !== "other" ? (
                        <>
                            <Field
                                name="parentInformation.relationshipWithChild"
                                id="parentInformation.relationshipWithChild"
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
                                name="parentInformation.relationshipWithChild"
                            />
                        </>
                    ) : (
                        <>
                            <Field
                                name="parentInformation.relationshipWithChild"
                                id="parentInformation.relationshipWithChild"
                                type="text"
                                className="hod_input"
                                aria-placeholder="Specify Relationship"
                                aria-label="Specify Relationship"
                            />
                            <ErrorMessage
                                name="parentInformation.relationshipWithChild"
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PersonalInformation;
