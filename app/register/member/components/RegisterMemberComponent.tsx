"use client";

import { useState, useEffect } from "react";

import {
  useFormikContext,
  Formik,
  FormikHelpers,
  Form,
  FieldArray,
} from "formik";
import * as Yup from "yup";

import {
  Gender,
  ParentType,
  RegistrationFormValues,
  CareGiverType,
} from "@/lib/definitions/form-interfaces";

// import PreviewImage from "../components/PreviewImage";
// import ImageUpload from "../components/ImageUpload";
// import ImageUploader from "../components/ImageUploader";

import HodLogoOnly from "@/app/register/components/HodLogo";
import FormHeader from "@/app/register/components/FormHeader";
import ParentComponent from "./InformationParent";
import ChildComponent from "./InformationChild";
import CaregiverComponent from "./InformationCaregiver";
import { BsPlusCircle, BsTrash3 } from "react-icons/bs";
import NewChildInstanceTitle from "../../components/NewChildInstanceTitle";
import { formatDateToYMD } from "@/lib/utils/utils";

const RegisterMemberComponent = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [currentTitle, setCurrentTitle] = useState("Personal Information");

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const [registrationSuccessful, setRegistrationSuccessful] =
    useState<boolean>(false);

  // const MAX_FILE_SIZE = 1000000; // 1MB
  // const validFileExtensions = [
  //   "image/jpg",
  //   "image/gif",
  //   "image/jfif",
  //   "image/png",
  //   "image/jpeg",
  //   "image/svg",
  //   "image/webp",
  // ];

  // const checkIfFilesAreTooBig = (file?: any): boolean => {
  //   let valid = true;
  //   if (file && file.size < MAX_FILE_SIZE) {
  //     valid = false;
  //   }
  //   return valid;
  // };

  // const checkIfFilesAreCorrectType = (file?: any): boolean => {
  //   let valid = true;
  //   if (file && validFileExtensions.includes(file.type)) {
  //     valid = false;
  //   }
  //   return valid;
  // };

  const RegistrationSchema = Yup.object()
    .shape({
      parent: Yup.object().shape({
        firstName: Yup.string().required("First name is required!"),
        lastName: Yup.string().required("Last name is required!"),
        email: Yup.string()
          .email("Invalid email address!")
          .required("Email is required!"),
        gender: Yup.string().required("Gender is required!"),
        roleInChurch: Yup.string().required(
          "Please select your role in church!"
        ),
        departmentInChurch: Yup.string().required(
          "Please select your department in church!"
        ),
        phoneNumberPrimary: Yup.string().required(
          "Primary phone number is required!"
        ),
        phoneNumberSecondary: Yup.string(),
        idName: Yup.string().required(
          "Please select a means of Identification!"
        ),
        idNumber: Yup.string().required("Please enter your ID Number!"),
        // idPhoto: Yup.mixed()
        // .test("fileType", "Only images are allowed", (file?: any) =>
        //   file && validFileExtensions.includes(file.type)
        // )
        // .test(
        //   "fileSize",
        //   "Image size should not be greater than 1MB",
        //   (file?: any) => file && file.size < MAX_FILE_SIZE
        // ),
      }),
      child: Yup.array()
        .of(
          Yup.object().shape({
            firsName: Yup.string().required("First name is required!"),
            lastName: Yup.string().required("Last name is required!"),
            gender: Yup.string().required("Gender is required!"),
            dateOfBirth: Yup.date().required("Date of birth is required!"),
            ageGroup: Yup.string().required("Age group is required!"),
            // photograph: Yup.mixed()
            //   .required("Photograph is required!")
            //   .test(
            //     "fileSize",
            //     "Image size should be less than 1MB",
            //     (value: any) => {
            //       return value && value.size <= 1000000;
            //     }
            //   )
            //   .test("fileType", "Only images are allowed", (value: any) => {
            //     return value && value.type.includes("image");
            //   }),
            relationshipWithChildType: Yup.string().required(
              "Type of relationship with child is required!"
            ),
            relationshipWithChild: Yup.string().required(
              "Relationship with child is required!"
            ),
            specialNeeds: Yup.string(),
          })
        )
        .nullable(),
      caregiver: Yup.array()
        .of(
          Yup.object().shape({
            firstName: Yup.string().required("First name is required!"),
            lastName: Yup.string().required("Last name is required!"),
            email: Yup.string()
              .email("Invalid email address!")
              .required("Email is required!"),
            gender: Yup.string().required("Gender is required!"),
            phoneNumberPrimary: Yup.string().required(
              "Primary phone number is required!"
            ),
            phoneNumberSecondary: Yup.string(),
            roleInChurch: Yup.string().required(
              "Please select your role in church!"
            ),
            departmentInChurch: Yup.string().required(
              "Please select your department in church!"
            ),
            relationshipWithChildType: Yup.string().required(
              "Type of relationship with child is required!"
            ),
            relationshipWithChild: Yup.string().required(
              "Relationship with child is required!"
            ),
            relationshipWithParentType: Yup.string().required(
              "Type of relationship with parent is required!"
            ),
            relationshipWithParent: Yup.string().required(
              "Relationship with parent is required!"
            ),
            churchLocation: Yup.string().required(
              "Please select church location!"
            ),
            churchBranchInLocation: Yup.string().required(
              "Please select the branch in the location selected!"
            ),
            // photograph: Yup.mixed()
            //   .test(
            //     "fileSize",
            //     "Image size should be less than 1MB",
            //     (value: any) => {
            //       return value && value.size <= 1000000;
            //     }
            //   )
            //   .test("fileType", "Only images are allowed", (value: any) => {
            //     return value && value.type.includes("image");
            //   }),
          })
        )
        .nullable(),
    })
    .nullable();

  const initialValues = {
    parent: {
      firstName: "",
      lastName: "",
      email: "",
      gender: Gender,
      roleInChurch: "",
      departmentInChurch: "",
      phoneNumberPrimary: "",
      phoneNumberSecondary: "",
      idName: "",
      idNumber: "",
      idPhoto: "",
      type: ParentType.biological,
    },
    child: [
      {
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: new Date(),
        ageGroup: "",
        photograph: "", // Image data for the photograph
        relationshipWithChildType: "",
        relationshipWithChild: "",
        specialNeeds: "",
      },
    ],
    caregiver: [
      {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        roleInChurch: "",
        departmentInChurch: "",
        phoneNumberPrimary: "",
        phoneNumberSecondary: "",
        relationshipWithChildType: "",
        relationshipWithChild: "",
        relationshipWithParentType: "",
        relationshipWithParent: "",
        churchLocation: "",
        churchBranchInLocation: "",
        photograph: "",
        type: CareGiverType.grandDad, // Compulsory if relationship with parent is 'Others'
      },
    ],
  };

  const handleSubmit = async (
    values: RegistrationFormValues,
    actions: FormikHelpers<RegistrationFormValues>
  ) => {
    if (step < totalSteps) {
      console.log("is clicked!");
      nextStep();
      actions.setTouched({});
      actions.setSubmitting(false);
    } else {
      actions.setSubmitting(true);
      console.log("is submitting!", values);

      try {
        const response = await fetch("/api/registration", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data, "Registration form submitted!");

          setStep(1);
          actions.resetForm();
          setRegistrationSuccessful(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        actions.setSubmitting(false);
        setRegistrationSuccessful(false);
      }
    }
  };

  useEffect(() => {
    if (step === 1) {
      setCurrentTitle("Parent Information");
    } else if (step === 2) {
      setCurrentTitle("Child’s Information");
    } else {
      setCurrentTitle("Caretaker Information");
    }
  }, [step]);

  return (
    <>
      {registrationSuccessful ? (
        <>
          <p>Registration is successful</p>
          {/* {alert("Registration is successful")} */}
        </>
      ) : (
        <>
          <div className="registration_container">
            <div className="flex flex-col gap-6 items-center">
              <HodLogoOnly />
              <h1 className="platform_title">HOD Kids Pick-Up Platform</h1>
            </div>

            <main className="form_container flex flex-col items-center w-full h-full">
              <Formik<RegistrationFormValues>
                initialValues={{
                  parent: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    gender: Gender.male,
                    roleInChurch: "",
                    departmentInChurch: "",
                    phoneNumberPrimary: "",
                    phoneNumberSecondary: "",
                    idName: "",
                    idNumber: "",
                    idPhoto: "",
                    type: ParentType.biological,
                  },
                  child: [
                    {
                      firstName: "",
                      lastName: "",
                      gender: "",
                      dateOfBirth: new Date(),
                      ageGroup: "",
                      photograph: "", // Image data for the photograph
                      parent: [""],
                      caregiver: [""],
                      specialNeeds: "",
                    },
                  ],
                  caregiver: [
                    {
                      firstName: "",
                      lastName: "",
                      email: "",
                      gender: "",
                      roleInChurch: "",
                      departmentInChurch: "",
                      phoneNumberPrimary: "",
                      phoneNumberSecondary: "",
                      relationshipWithChildType: "",
                      relationshipWithChild: "",
                      relationshipWithParentType: "",
                      relationshipWithParent: "",
                      churchLocation: "",
                      churchBranchInLocation: "",
                      photograph: "",
                      type: CareGiverType.grandDad, // Compulsory if relationship with parent is 'Others'
                    },
                  ],
                }}
                // validationSchema={RegistrationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting }) => (
                  <Form className="form">
                    <div className="steps mb-2 w-16">
                      Step {step}/{totalSteps}
                    </div>
                    <FormHeader title={currentTitle} />
                    <hr className="text-hod-text-gray2 mt-6 mb-10" />

                    {step === 1 && (
                      <>
                        <ParentComponent
                          {...values.parent}
                          errors={errors}
                          touched={touched}
                        />
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <FieldArray
                          name="Child"
                          render={({ push, remove }) => (
                            <>
                              {values.child &&
                                values.child.length > 0 &&
                                values.child.map((child, index) => (
                                  <div key={index}>
                                    <NewChildInstanceTitle
                                      index={index}
                                      remove={remove}
                                      desc="Child"
                                    />

                                    <ChildComponent index={index} />
                                  </div>
                                ))}

                              <button
                                type="button"
                                className="flex gap-2 items-center text-hod-secondary text-base font-normal"
                                onClick={() =>
                                  // values.child.forEach((child) => {
                                  //   push(child);
                                  // })
                                  push(initialValues.child)
                                }
                              >
                                <BsPlusCircle className="text-hod-secondary" />{" "}
                                Include another child
                              </button>
                            </>
                          )}
                        />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <FieldArray
                          name="Caregiver"
                          render={({ push, remove }) => (
                            <>
                              {values.caregiver &&
                                values.caregiver.length > 0 &&
                                values.caregiver.map((caregiver, index) => (
                                  <div key={index}>
                                    <NewChildInstanceTitle
                                      index={index}
                                      remove={remove}
                                      desc="Caregiver"
                                    />

                                    <CaregiverComponent index={index} />
                                  </div>
                                ))}

                              <button
                                type="button"
                                className="flex gap-2 items-center text-hod-secondary text-base font-normal"
                                onClick={() => push(initialValues.child)}
                              >
                                <BsPlusCircle className="text-hod-secondary" />{" "}
                                Include new caregiver
                              </button>
                            </>
                          )}
                        />
                      </>
                    )}

                    <div className="form_button_container">
                      {step > 1 && (
                        <button
                          type="button"
                          className="hod_button hod_button_secondary"
                          onClick={previousStep}
                        >
                          Previous
                        </button>
                      )}
                      <button
                        type="submit"
                        className="hod_button hod_button_primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : step < totalSteps
                          ? "Next"
                          : "Submit"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterMemberComponent;
