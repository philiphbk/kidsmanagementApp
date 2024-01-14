"use client";

import { useState, useEffect } from "react";

import {
    //   useFormik,
    // useFormikContext,
    Formik,
    FormikHelpers,
    Form,
} from "formik";
import * as Yup from "yup";

import { RegistrationFormValues } from "@/lib/definitions/form-interfaces";

// import PreviewImage from "../components/PreviewImage";
// import ImageUpload from "../components/ImageUpload";
// import ImageUploader from "../components/ImageUploader";

import HodLogoOnly from "@/app/register/components/HodLogo";
import FormHeader from "@/app/register/components/FormHeader";
import PersonalInformation from "@/app/register/member/components/InformationPersonal";
import ChildInformation from "@/app/register/member/components/InformationChild";
import CaretakerInformation from "@/app/register/member/components/InformationCaretaker";

const RegisterMemberComponent = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const [currentTitle, setCurrentTitle] = useState("Personal Information");

    // const formik = useFormikContext<RegistrationFormValues>();

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

    const [registrationSuccessful, setRegistrationSuccessful] = useState<boolean>(false);

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
                    .test("fileSize", "Image size should be less than 1MB", (value: any) => {
                        return value && value.size <= 1000000;
                    })
                    .test("fileType", "Only images are allowed", (value: any) => {
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
                                (value: any) => {
                                    return value && value.size <= 1000000;
                                }
                            )
                            .test("fileType", "Only images are allowed", (value: any) => {
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
                                (value: any) => {
                                    return value && value.size <= 1000000;
                                }
                            )
                            .test("fileType", "Only images are allowed", (value: any) => {
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
            actions.setSubmitting(true)
            console.log("is submitting!", values);
            // const formData = new FormData();

            try {
                console.log("Registration form submitted!");
                setStep(1);
                actions.resetForm();
            } catch (err) {
                console.log(err);
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
    }, [step])

    return (
        <>
            {registrationSuccessful ? (
                <>
                    <p>Registration is successful</p>
                    {alert("Registration is successful")}
                </>
            ) : (
                <>
                    <div className="h-screen w-screen flex flex-col items-center mx-auto p-5 md:p-10">
                        <div className="flex flex-col gap-6 items-center">
                            <HodLogoOnly />
                            <h1 className="platform_title">HOD Kids Pick-Up Platform</h1>
                        </div>

                        <main className="form_container flex flex-col items-center w-full h-full mb-14">
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
                                // validationSchema={RegistrationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, errors, touched }) => (
                                    <Form className="mt-14 px-5 py-6 md:p-10 flex flex-col justify-center max-w-[564px] w-full bg-white rounded-2xl">
                                        <div className="steps mb-2 w-16">
                                            Step {step}/{totalSteps}
                                        </div>

                                        <FormHeader title={currentTitle} />
                                        <hr className="text-hod-text-gray2 mt-6 mb-10" />

                                        {step === 1 && (
                                            <>
                                                <PersonalInformation />
                                            </>
                                        )}

                                        {step === 2 && (
                                            <>
                                                <ChildInformation />
                                            </>
                                        )}

                                        {step === 3 && (
                                            <>
                                                <CaretakerInformation />
                                            </>
                                        )}

                                        <div className="buttons mt-10 flex flex-col md-flex-row gap-6 justify-end">
                                            {step > 1 && (
                                                <button
                                                    type="button"
                                                    className="hod_button hod_button_secondary"
                                                    onClick={previousStep}
                                                >
                                                    Previous
                                                </button>
                                            )}
                                            <button type="submit" className="hod_button hod_button_primary">
                                                {step < totalSteps ? "Next" : "Submit"}
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
}

export default RegisterMemberComponent;
