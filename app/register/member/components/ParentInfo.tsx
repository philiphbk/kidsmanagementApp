import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";

import {
  departmentInChurchData,
  genderData,
  roleInChurchData,
} from "@/lib/data/dummy-data";

import { OptionType } from "@/lib/definitions/form-interfaces";

import {
  ParentForm,
  RegistrationForm,
} from "@/lib/definitions/form-interfaces";
import ImageFileUploader from "../../components/ImageFileUploader";

interface PropsInterface {
  errors: FormikErrors<RegistrationForm>;
  touched: FormikTouched<RegistrationForm>;
}

interface ParentProps extends ParentForm, PropsInterface {}

const ParentFormComponent: React.FC<ParentProps> = ({ errors, touched }) => {
  const { values, setFieldValue } = useFormikContext<RegistrationForm>();
  const options: OptionType[] = departmentInChurchData.map((dept) => ({
    value: dept.id,
    label: dept.value,
  }));

  const showDepartmentDropdown =
    values.parent.roleInChurch &&
    values.parent.roleInChurch !== "Visitor" &&
    values.parent.roleInChurch !== "Member";

  return (
    <section className="personal_info">
      {/* full name */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor="parent.firstName">First Name</label>
          <Field
            name="parent.firstName"
            id="parent.firstName"
            type="text"
            className="hod_input"
            aria-placeholder="Enter first name"
            aria-label="First Name"
          />
          <ErrorMessage name="parent.firstName" />
        </div>
        <div className="input_group">
          <label htmlFor="parent.lastName">Last Name</label>
          <Field
            name="parent.lastName"
            id="parent.lastName"
            type="text"
            className="hod_input"
            aria-placeholder="Enter last name"
            aria-label="Last Name"
          />
          <ErrorMessage name="parent.lastName" />
        </div>
      </div>

      {/* email */}
      <div className="input_group">
        <label htmlFor="parent.email">Email Address</label>
        <Field
          name="parent.email"
          id="parent.email"
          type="email"
          className="hod_input"
          aria-placeholder="Enter email"
          aria-label="Email Address"
        />
        <ErrorMessage name="parent.email" />
      </div>

      {/* gender */}
      <div className="input_group">
        <label htmlFor="parent.gender">Gender</label>
        <Field
          name="parent.gender"
          id="parent.gender"
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
        <ErrorMessage name="parent.gender" />
      </div>

      {/* role */}
      <div className="input_group">
        {errors?.parent?.roleInChurch && touched?.parent?.roleInChurch && (
          <span className="text-red">{errors?.parent?.roleInChurch}</span>
        )}
        <label htmlFor="parent.roleInChurch">Role in church</label>
        <Field
          name="parent.roleInChurch"
          id="parent.roleInChurch"
          as="select"
          className="hod_input"
          aria-label="Role in church"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const { value } = e.target;
            setFieldValue("parent.roleInChurch", value);
            if (value !== "Visitor" && value !== "Member") {
              setFieldValue("parent.departmentInChurch", "");
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
        <ErrorMessage name="parent.roleInChurch" />
      </div>

      {/* department */}
      {showDepartmentDropdown && (
        <div className="input_group">
          {errors?.parent?.departmentInChurch &&
            touched?.parent?.departmentInChurch && (
              <span className="text-red">
                {errors?.parent?.departmentInChurch}
              </span>
            )}
          <label htmlFor="parent.departmentInChurch">
            Department in church
          </label>
          <Field
            name="parent.departmentInChurch"
            options={options}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFieldValue("parent.departmentInChurch", e?.target.value);
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
          <ErrorMessage name="parent.departmentInChurch" />
        </div>
      )}

      {/* primary phone */}
      <div className="input_group">
        <label htmlFor="parent.phoneNumberPrimary">Primary Phone Number</label>
        <Field
          name="parent.phoneNumberPrimary"
          id="parent.phoneNumberPrimary"
          type="text"
          className="hod_input"
          aria-placeholder="Enter primary phone number"
          aria-label="Primary Phone Number"
        />
        <ErrorMessage name="parent.phoneNumberPrimary" />
      </div>

      {/* secondary phone */}
      <div className="input_group">
        <label htmlFor="parent.phoneNumberSecondary">
          Secondary Phone Number
        </label>
        <Field
          name="parent.phoneNumberSecondary"
          id="parent.phoneNumberSecondary"
          type="text"
          className="hod_input"
          aria-placeholder="Enter secondary phone number"
          aria-label="Secondary Phone Number"
        />
        <ErrorMessage name="parent.phoneNumberSecondary" />
      </div>

      {/* means of identification */}
      <div className="input_group">
        <label htmlFor="parent.idType">Means of Identification</label>
        <Field
          name="parent.idType"
          as="select"
          className="hod_input"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFieldValue("parent.idType", e.target.value);
          }}
        >
          <option value="" disabled>
            Select your ID
          </option>
          <option value="NIN">NIN</option>
          <option value="Driver's License">Driver&apos;s License</option>
          <option value="Voter's Card">Voter&apos;s Card</option>
        </Field>
        <ErrorMessage name="parent.idType" />
      </div>

      {(values.parent.idType === "NIN" ||
        values.parent.idType === "Driver's License") && (
        <div className="input_group">
          <label htmlFor="parent.idNumber">Identification Number</label>
          <Field
            name="parent.idNumber"
            type="text"
            className="hod_input"
            aria-placeholder="Enter identification number"
            aria-label="Identification Number"
          />
          <ErrorMessage name="parent.idNumber" />
        </div>
      )}

      {values.parent.idType === "Voter's Card" && (
        <div className="input_group">
          <label htmlFor="parent.idPhoto">Upload Voter&apos;s Card</label>
          <ImageFileUploader
            id="parent.idPhoto"
            ariaLabel="Upload Voter's Card"
          />
          <ErrorMessage name="parent.idPhoto" />
        </div>
      )}

      {/* photograph */}
      <div className="input_group">
        <label htmlFor="parent.idPhoto">Upload Photo</label>
        <ImageFileUploader id="parent.idPhoto" ariaLabel="Upload Photo" />

        <ErrorMessage name="parent.idPhoto" />
      </div>

      <div className="input_group">
        <label htmlFor="parent.address">Address</label>
        <Field
          name="parent.address"
          id="parent.address"
          as="textarea"
          className="hod_input"
          aria-placeholder="Enter address"
          aria-label="Address"
        />
        <ErrorMessage name="parent.address" />
      </div>
    </section>
  );
};

export default ParentFormComponent;
