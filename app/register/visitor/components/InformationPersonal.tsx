import { genderData, relationshipWithChild } from "@/lib/data/dummy-data";
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
          <option value="" disabled>
            select gender
          </option>

          {genderData?.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.value}
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

      {/* Relationship with the child */}
      <div className="input_group">
        <label htmlFor="relationship">Relationship with the child</label>
        <Field
          name="relationship"
          id="relationship"
          as="select"
          className="hod_input"
          aria-label="Relationship with the child"
        >
          <option value="" disabled>
            select relationship
          </option>

          {relationshipWithChild?.map((relationship) => (
            <option key={relationship.id} value={relationship.id}>
              {relationship.value}
            </option>
          ))}
        </Field>
      </div>
    </section>
  );
};

export default PersonalInformation;
