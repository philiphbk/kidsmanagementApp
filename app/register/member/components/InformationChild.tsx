import { ChangeEvent, useState, useEffect } from "react";

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";

import {
  ageGroupData,
  genderData,
  relationshipData,
  relationshipTypeData,
} from "@/lib/data/dummy-data";
import { Child } from "@/lib/definitions/form-interfaces";

import ImageUploader from "../../components/ImageUploader";
import ImageFileUploader from "../../components/ImageFileUploader";

// interface PropsInterface {
//     errors: FormikErrors<RegistrationFormValues>;
//     touched: FormikTouched<RegistrationFormValues>;
// }

// interface ChildProps extends Child, PropsInterface { }

const ChildComponent = ({ index }: { index: number }) => {
  const { setFieldValue } = useFormikContext<Child>();

  const [currentType, setCurrentType] = useState("parent");
  const [otherType, setOtherType] = useState({
    status: false,
    value: ""
  });

  const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value, id } = e.target;

    if (id.includes("relationshipWithChildType")) {
      setCurrentType(value);
      setOtherType({ ...otherType, status: false });
      setFieldValue(`child[${index}].relationshipWithChild`, "");
      setFieldValue(name, value);
    }

    if (id.includes("childGuardian")) {
      if (value === "other") {
        setOtherType({ ...otherType, status: true });
        setFieldValue(`child[${index}].relationshipWithChildType`, "guardian");
      } else {
        setOtherType({ ...otherType, status: false });
        setFieldValue(`child[${index}].relationshipWithChild`, value);
      }
    }

    console.log(e, name, value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue(`child[${index}].relationshipWithChild`, value);
  };

  const relationshipDataFiltered = relationshipData?.find(
    (relationship) => relationship.type === currentType
  );

  // useEffect(() => {
  //   setFieldValue(`child[${index}].relationshipWithChild`, otherType?.value);
  // }, [index, otherType?.value, setFieldValue])


  return (
    <div className="personal_info">
      {/* full name */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor={`child[${index}].firstName`}>First Name</label>
          <Field
            // name="child.firstName"
            name={`child[${index}].firstName`}
            id={`child[${index}].firstName`}
            type="text"
            className="hod_input"
            aria-placeholder="Enter first name"
            aria-label="First Name"
          />
          <ErrorMessage name={`child[${index}].firstName`} />
          {/* {errors?.child?.firstName
                        && touched?.child?.firstName ? (
                        <div>{errors?.child?.firstName}</div>
                    ) : null} */}
        </div>

        <div className="input_group">
          <label htmlFor={`child[${index}].lastName`}>Last Name</label>
          <Field
            name={`child[${index}].lastName`}
            id={`child[${index}].lastName`}
            type="text"
            className="hod_input"
            aria-placeholder="Enter last name"
            aria-label="Last Name"
          />
          <ErrorMessage name={`child[${index}].lastName`} />
        </div>
      </div>

      {/* date of birth and gender */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor={`child[${index}].dateOfBirth`}>Date of birth</label>
          <Field
            name={`child[${index}].dateOfBirth`}
            id={`child[${index}].dateOfBirth`}
            type="date"
            className="hod_input"
            aria-placeholder="Enter date of birth name"
            aria-label="Date of birth"
          />
          <ErrorMessage name={`child[${index}].dateOfBirth`} />
        </div>

        <div className="input_group">
          <label htmlFor={`child[${index}].gender`}>Gender</label>
          <Field
            name={`child[${index}].gender`}
            id={`child[${index}].gender`}
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
          <ErrorMessage name={`child[${index}].gender`} />
        </div>
      </div>

      {/* photograph */}
      <div className="input_group">
        <label htmlFor={`child[${index}].photograph`}>
          Upload a clear photograph
        </label>
        <ImageFileUploader
          id={`child[${index}].photograph`}
          ariaLabel="Upload a clear photograph"
        />
        <ErrorMessage name={`child[${index}].photograph`} />
      </div>

      {/* age group */}
      <div className="input_group">
        <label htmlFor={`child[${index}].ageGroup`}>Age Group</label>
        <Field
          name={`child[${index}].ageGroup`}
          id={`child[${index}].ageGroup`}
          as="select"
          className="hod_input"
          aria-label="Age Group"
        >
          <option value="" disabled>
            select age group
          </option>

          {ageGroupData?.map((group) => (
            <option key={group.id} value={group.id}>
              {group.value}
            </option>
          ))}
        </Field>
        <ErrorMessage name={`child[${index}].ageGroup`} />
      </div>

      {/* relationship with child */}
      <div className="flex gap-x-6 flex-col md:flex-row">
        <div className="input_group">
          <label htmlFor={`child[${index}].relationshipWithChildType`}>
            Relationship with child
          </label>
          <Field
            name={`child[${index}].relationshipWithChildType`}
            id={`child[${index}].relationshipWithChildType`}
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
          <ErrorMessage name={`child[${index}].relationshipWithChildType`} />
        </div>

        <div className="input_group">
          <label htmlFor={`child[${index}].relationshipWithChild`}>
            Specify Relationship
          </label>

          <Field
            name="childGuardian"
            id="childGuardian"
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
          <ErrorMessage name="childGuardian" />
        </div>
      </div>

      {/* exact relationship */}
      {otherType.status && (
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
            defaultValue={otherType.value}
          />
          <ErrorMessage name="otherGuardian" />
        </div>
      )}

      {/* special need */}
      <div className="input_group">
        <label htmlFor={`child[${index}].specialNeeds`}>
          Special Needs{" "}
          <span className="font-normal text-hod-text-gray2 text-base leading-6 italic">
            (Any special type of care for the child)
          </span>
        </label>
        <Field
          name={`child[${index}].specialNeeds`}
          id={`child[${index}].specialNeeds`}
          type="text"
          className="hod_input"
          aria-placeholder="Enter any special needs for the child"
          aria-label="Special Needs"
        />
        <ErrorMessage name={`child[${index}].specialNeeds`} />
      </div>
    </div>
  );
};

export default ChildComponent;
