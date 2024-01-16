import { ErrorMessage, Field } from "formik";
import { genderData, ageGroupData } from "@/lib/data/dummy-data";
import { VisitorChild } from "@/lib/definitions/form-interfaces";

import ImageUploader from "../../components/ImageUploader";

const ChildInformation = ({ index }: { index: number }) => {
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

            {/* gender */}
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

            {/* date of birth */}
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

            {/* photograph */}
            <div className="input_group">
                <label htmlFor={`childInformation[${index}].photograph`}>Upload Photo</label>
                <ImageUploader id={`childInformation[${index}].photograph`} ariaLabel="Upload Photo" />
                <ErrorMessage name={`childInformation[${index}].photograph`} />
            </div>
        </div>
    );
};

export default ChildInformation;