"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  useFormik,
  Field,
  Form,
  FormikHelpers,
  Formik,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import PreviewImage from "./components/PreviewImage";
import ImageUpload from "./components/ImageUpload";
import ImageUploader from "./components/ImageUploader";
import { RegistrationFormValues } from "./components/interface";
import HODLogo from "../../public/hod-logo.png";

export default function Registration() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const formik = useFormikContext<RegistrationFormValues>();

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

  const [registrationSuccssful, setRegistrationSuccessful] =
    useState<boolean>(false);

  const RegistrationSchema = Yup.object()
    .shape({
      parentInformation: Yup.object().shape({
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
        idName: Yup.string().required("ID name is required!"),
        idPhoto: Yup.mixed()
          .required("ID photo is required!")
          .test("fileSize", "Image size should be less than 1MB", (value) => {
            return value && value.size <= 1000000;
          })
          .test("fileType", "Only images are allowed", (value) => {
            return value && value.type.includes("image");
          }),
      }),
      childInformation: Yup.array()
        .of(
          Yup.object().shape({
            firsName: Yup.string().required("First name is required!"),
            lastName: Yup.string().required("Last name is required!"),
            gender: Yup.string().required("Gender is required!"),
            dateOfBirth: Yup.date().required("Date of birth is required!"),
            ageGroup: Yup.string().required("Age group is required!"),
            photograph: Yup.mixed()
              .required("Photograph is required!")
              .test(
                "fileSize",
                "Image size should be less than 1MB",
                (value) => {
                  return value && value.size <= 1000000;
                }
              )
              .test("fileType", "Only images are allowed", (value) => {
                return value && value.type.includes("image");
              }),
            relationship: Yup.string().required("Relationship is required!"),
            specialNeeds: Yup.string(),
          })
        )
        .nullable(),
      caregiverInformation: Yup.array()
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
            relationshipWithChild: Yup.string().required(
              "Relationship with child is required!"
            ),
            relationshipWithParent: Yup.string().required(
              "Relationship with parent is required!"
            ),
            photograph: Yup.mixed()
              .test(
                "fileSize",
                "Image size should be less than 1MB",
                (value) => {
                  return value && value.size <= 1000000;
                }
              )
              .test("fileType", "Only images are allowed", (value) => {
                return value && value.type.includes("image");
              }),
          })
        )
        .nullable(),
    })
    .nullable();

  const handleSubmit = async (
    values: RegistrationFormValues,
    actions: FormikHelpers<RegistrationFormValues>
  ) => {
    if (step < totalSteps) {
      nextStep();
      actions.setTouched({});
      actions.setSubmitting(false);
    } else {
      console.log("Registration form submitted!");
      console.log(values);
      const formData = new FormData();

      try {
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {registrationSuccssful ? (
        <>
          <p>Registration is successful</p>
          {alert("Registration is successful")}
        </>
      ) : (
        <>
          <Formik<RegistrationFormValues>
            initialValues={{
              parentInformation: {
                firstName: "",
                lastName: "",
                email: "",
                gender: "",
                phoneNumberPrimary: "",
                phoneNumberSecondary: "",
                idName: "",
                idPhoto: "", // Image data for the ID picture
              },
              childInformation: [
                {
                  firstName: "",
                  lastName: "",
                  gender: "",
                  dateOfBirth: new Date(),
                  ageGroup: "",
                  photograph: "", // Image data for the photograph
                  relationship: "",
                  specialNeeds: "",
                },
              ],
              caregiverInformation: [
                {
                  firstName: "",
                  lastName: "",
                  email: "",
                  gender: "",
                  phoneNumberPrimary: "",
                  phoneNumberSecondary: "",
                  relationshipWithChild: "",
                  relationshipWithParent: "",
                  photograph: "", // Compulsory if relationship with parent is 'Others'
                },
              ],
            }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className=" p-7">
                  <div className="flex justify-center"></div>
                  <div className="flex justify-center">
                    <h1 className="text-xl font-bold">Registration Form</h1>
                  </div>
                </div>
                {step === 1 && (
                  <>
                    <p className=" text-xs text-red-800 text-center">Step 1/3</p>
                    <p className="text-2xl font-bold text-center">
                      Parent Information
                    </p>
                    <p className=" italic text-xs">
                      (All fields are required unless specified optional)
                    </p>
                    <br />
                    <hr />
                    <br />

                  </>
                )}
                {step === 2 && <></>}
                {step === 3 && <></>}
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}
