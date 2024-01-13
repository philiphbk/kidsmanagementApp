import { departmentInChurch, genderData, meansOfId, roleInChurch } from "@/lib/data/dummy-data";
import { ErrorMessage, Field } from "formik";

const PersonalInformation = () => {
    return (
        <section className="personal_info">
            <div className="flex gap-6">
                <div className="input_group">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                        name="firstName"
                        id="firstName"
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter first name"
                        aria-label="First Name"
                    />
                    <ErrorMessage name="firstName" />
                </div>

                <div className="input_group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                        name="lastName"
                        id="lastName"
                        type="text"
                        className="hod_input"
                        aria-placeholder="Enter last name"
                        aria-label="Last Name"
                    />
                    <ErrorMessage name="lastName" />
                </div>
            </div>

            <div className="input_group">
                <label htmlFor="email">Email Address</label>
                <Field
                    name="email"
                    id="email"
                    type="email"
                    className="hod_input"
                    aria-placeholder="Enter email"
                    aria-label="Email Address"
                />
                <ErrorMessage name="email" />
            </div>

            {/* gender */}
            <div className="input_group">
                <label htmlFor="gender">Gender</label>
                <Field
                    name="gender"
                    id="gender"
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
            </div>

            {/* role */}
            <div className="input_group">
                <label htmlFor="role">Role in church</label>
                <Field
                    name="role"
                    id="role"
                    as="select"
                    className="hod_input"
                    aria-label="Role in church"
                >
                    <option value="" disabled>select role in church</option>

                    {roleInChurch?.map(role => (
                        <option
                            key={role.id}
                            value={role.id}
                        >
                            {role.value}
                        </option>
                    ))}
                </Field>
            </div>

            {/* ministry */}
            <div className="input_group">
                <label htmlFor="department">Department in church</label>
                <Field
                    name="department"
                    id="department"
                    as="select"
                    className="hod_input"
                    aria-label="Department in church"
                >
                    <option value="" disabled>select department in church</option>

                    {departmentInChurch?.map(dept => (
                        <option
                            key={dept.id}
                            value={dept.id}
                        >
                            {dept.value}
                        </option>
                    ))}
                </Field>
            </div>

            <div className="input_group">
                <label htmlFor="primaryPhone">Primary Phone Number</label>
                <Field
                    name="phoneNumberPrimary"
                    id="phoneNumberPrimary"
                    type="text"
                    className="hod_input"
                    aria-placeholder="Enter primary phone number"
                    aria-label="Primary Phone Number"
                />
                <ErrorMessage name="primaryPhone" />
            </div>

            <div className="input_group">
                <label htmlFor="secondaryPhone">Secondary Phone Number</label>
                <Field
                    name="phoneNumberSecondary"
                    id="phoneNumberSecondary"
                    type="text"
                    className="hod_input"
                    aria-placeholder="Enter secondary phone number"
                    aria-label="Secondary Phone Number"
                />
                <ErrorMessage name="secondaryPhone" />
            </div>

            {/* means of id */}
            <div className="input_group">
                <label htmlFor="idName">Means of identification</label>
                <Field
                    name="idName"
                    id="idName"
                    as="select"
                    className="hod_input"
                    aria-label="Means of identification"
                >
                    <option value="" disabled>select means of identification</option>

                    {meansOfId?.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.value}
                        </option>
                    ))}
                </Field>
            </div>

            <div className="input_group">
                <label htmlFor="identificationNumber">Identification Number</label>
                <Field
                    name="identificationNumber"
                    id="identificationNumber"
                    type="text"
                    className="hod_input"
                    aria-placeholder="Enter identification number"
                    aria-label="Identification Number"
                />
                <ErrorMessage name="identificationNumber" />
            </div>
        </section>
    );
};

export default PersonalInformation;
