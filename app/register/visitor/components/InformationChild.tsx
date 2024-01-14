import { genderData, ageGroup } from "@/lib/data/dummy-data";
import { ErrorMessage, Field } from "formik";

const ChildInformation = () => {
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

      {/* date of birth */}
      <div className="input_group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <Field
          name="dateOfBirth"
          id="dateOfBirth"
          type="date"
          className="hod_input"
          aria-label="Date of Birth"
        />
        <ErrorMessage name="dateOfBirth" />
      </div>

      {/* age */}
      <div className="input_group">
        <label htmlFor="age">Age</label>
        <Field
          name="age"
          id="age"
          as="select"
          className="hod_input"
          aria-label="Age"
        >
          <option value="" disabled>
            select age
          </option>

          {ageGroup?.map((age) => (
            <option key={age.id} value={age.id}>
              {age.value}
            </option>
          ))}
        </Field>
      </div>
    </section>

    {/* special needs */}
    <section className="special_needs">
      <h3 className="section_title">Special Needs</h3>

      <div className="input_group">
        <label htmlFor="specialNeeds">Special Needs</label>
        <Field
          name="specialNeeds"
          id="specialNeeds"
          type="text"
          className="hod_input"
          aria-placeholder="Enter special needs"
          aria-label="Special Needs"
        />
        <ErrorMessage name="specialNeeds" />
      </div>
    </section>
  );
};

export default ChildInformation;
