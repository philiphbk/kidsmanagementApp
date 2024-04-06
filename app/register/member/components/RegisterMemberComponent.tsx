"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Formik, FormikHelpers, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  VStack,
  Heading,
  Container,
  useToast,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";

import { RegistrationForm } from "@/lib/definitions/form-interfaces";

import HodLogoOnly from "@/app/register/components/HodLogo";
import FormHeader from "@/app/register/components/FormHeader";
import ParentComponent from "./InformationParent";
import ChildComponent from "./InformationChild";
import CaregiverComponent from "./InformationCaregiver";
import { BsPlusCircle } from "react-icons/bs";
import NewChildInstanceTitle from "../../components/NewChildInstanceTitle";
import { useRouter } from "next/navigation";
import { useStore } from "./Store";

const RegisterMemberComponent = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [currentTitle, setCurrentTitle] = useState("Parent Information");

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

  const ParentRegistrationSchema = Yup.object()
    .shape({
      parent: Yup.object().shape({
        // firstName: Yup.string().required("First Name is required"),
        // lastName: Yup.string().required("Last Name is required"),
        // email: Yup.string()
        //   .email("Invalid email")
        //   .required("Email is required"),
        // gender: Yup.string(),
        // roleInChurch: Yup.string().required("Role in church is required"),
        // departmentInChurch: Yup.string(),
        // ministry: Yup.string(),
        // phoneNumberPrimary: Yup.string().required("Phone Number is required"),
        // phoneNumberSecondary: Yup.string(),
        // idType: Yup.string().required("ID Type is required"),
        // idNumber: Yup.string(),
        // idPhoto: Yup.string(),
        // photograph: Yup.string().required("Photograph is required"),
        // address: Yup.string().required("Address is required"),
      }),
    })
    .nullable();

  const ChildRegistrationSchema = Yup.object()
    .shape({
      child: Yup.array()
        .of(
          Yup.object().shape({
            // firstName: Yup.string().required("First Name is required"),
            // lastName: Yup.string().required("Last Name is required"),
            // ageGroup: Yup.string().required("Age Group is required"),
            // gender: Yup.string().required("Gender is required"),
            // dateOfBirth: Yup.string().required("Date of Birth is required"),
            // photograph: Yup.string().required("Photograph is required"),
            // relationshipWithChildType: Yup.string().required(
            //   "Relationship with Child Type is required"
            // ),
            // relationshipWithChild: Yup.string().required(
            //   "Relationship with Child is required"
            // ),
            // specialNeeds: Yup.string(),
          })
        )
        .nullable(),
    })
    .nullable();

  const CareGiverRegistrationSchema = Yup.object()
    .shape({
      caregiver: Yup.array()
        .of(
          Yup.object().shape({
            // firstName: Yup.string().required("First Name is required"),
            // lastName: Yup.string().required("Last Name is required"),
            // email: Yup.string()
            //   .email("Invalid email")
            //   .required("Email is required"),
            // gender: Yup.string().required("Gender is required"),
            // roleInChurch: Yup.string().required("Role in church is required"),
            // departmentInChurch: Yup.string(),
            // ministry: Yup.string(),
            // phoneNumberPrimary: Yup.string().required(
            //   "Phone Number is required"
            // ),
            // phoneNumberSecondary: Yup.string(),
            // relationshipWithChildType: Yup.string().required(
            //   "Relationship with Child Type is required"
            // ),
            // relationshipWithChild: Yup.string().required(
            //   "Relationship with Child is required"
            // ),
            // caregiverRelationshipTypeWithParent: Yup.string().required(
            //   "Caregiver Relationship Type with Parent is required"
            // ),
            // caregiverRelationshipWithParentData: Yup.string().required(
            //   "Caregiver Relationship with Parent Data is required"
            // ),
            // photograph: Yup.string().required("Photograph is required"),
          })
        )
        .nullable(),
    })
    .nullable();

  const newInfo = {
    child: {
      id: "",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: new Date(),
      ageGroup: "",
      photograph: "",
      relationshipWithChildType: "",
      relationshipWithChild: "",
      parentId: "",
      caregiverIds: [""],
      specialNeeds: "",
    },
    caregiver: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      roleInChurch: "",
      departmentInChurch: "",
      ministry: "",
      phoneNumberPrimary: "",
      phoneNumberSecondary: "",
      relationshipWithChildType: "",
      relationshipWithChild: "",
      caregiverRelationshipTypeWithParent: "",
      caregiverRelationshipWithParentData: "",
      // churchLocation: "",
      // churchBranchInLocation: "",
      photograph: "",
    },
  };

  const initialValues: RegistrationForm = {
    parent: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      roleInChurch: "",
      ministry: "",
      departmentInChurch: "",
      phoneNumberPrimary: "",
      phoneNumberSecondary: "",
      idType: "",
      idNumber: "",
      idPhoto: "",
      photograph: "",
      address: "",
    },
    caregiver: [
      {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        roleInChurch: "",
        departmentInChurch: "",
        ministry: "",
        phoneNumberPrimary: "",
        phoneNumberSecondary: "",
        relationshipWithChildType: "",
        relationshipWithChild: "",
        caregiverRelationshipTypeWithParent: "",
        caregiverRelationshipWithParentData: "",
        photograph: "",
      },
    ],
    child: [
      {
        id: "",
        firstName: "",
        lastName: "",
        ageGroup: "",
        gender: "",
        dateOfBirth: "",
        photograph: "",
        relationshipWithChildType: "",
        relationshipWithChild: "",
        specialNeeds: "",
        parentId: "",
        caregiverIds: "",
      },
    ],
  };

  const handleSubmit = async (
    values: RegistrationForm,
    actions: FormikHelpers<RegistrationForm>
  ) => {
    useStore.getState().setFormData(values);

    console.log("values", values);
    console.log("is clicked!");
    if (step < totalSteps) {
      console.log("values", values);
      console.log("is clicked!");
      nextStep();
      actions.setTouched({});
      actions.setSubmitting(false);
    } else {
      console.log("values", values);

      actions.setSubmitting(true);
      console.log("is submitting!", values);

      try {
        // router.push("/member/summary");
        const response = await axios.post("/api/registration", values, {
          headers: {
            "Content-Type": "application/json",
          },
          maxContentLength: 100000000,
          maxBodyLength: 1000000000,
        });

        console.log(response.data, "Registration form submitted!");

        setStep(1);
        actions.resetForm();
        router.push("/register/success");
      } catch (err) {
        console.log(err);
      } finally {
        actions.setSubmitting(false);
      }
    }
  };

  useEffect(() => {
    switch (step) {
      case 1:
        setCurrentTitle("Parent Information");
        break;
      case 2:
        setCurrentTitle("Child’s Information");
        break;
      case 3:
        setCurrentTitle("Caregiver Information");
        break;
      default:
        setCurrentTitle("Form");
    }
  }, [step]);

  return (
    <Box maxWidth="container.md" py={8} px={4} margin="auto">
      <VStack spacing={8} align="center">
        <HodLogoOnly />
        <Heading as="h1" size="lg">
          Junior Church Monitor
        </Heading>

        <Formik<RegistrationForm>
          initialValues={initialValues}
          validationSchema={
            step == 1
              ? ParentRegistrationSchema
              : step == 2
              ? ChildRegistrationSchema
              : CareGiverRegistrationSchema
          }
          // enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="form">
              <div className="steps mb-2 w-18">
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
                    name="child"
                    render={({ push, remove }) => (
                      <VStack spacing={4}>
                        {values.child &&
                          values.child.length > 0 &&
                          values.child.map((child, index) => (
                            <Box key={index}>
                              <NewChildInstanceTitle
                                index={index}
                                remove={remove}
                                desc="Child"
                              />

                              <ChildComponent index={index} />
                            </Box>
                          ))}

                        <Button
                          leftIcon={<Icon as={BsPlusCircle} />}
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => push(newInfo.child)}
                        >
                          Include another child
                        </Button>
                      </VStack>
                    )}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <FieldArray
                    name="caregiver"
                    render={({ push, remove }) => (
                      <VStack spacing={4}>
                        {values.caregiver &&
                          values.caregiver.length > 0 &&
                          values.caregiver.map((caregiver, index) => (
                            <Box key={index}>
                              <NewChildInstanceTitle
                                index={index}
                                remove={remove}
                                desc="Caregiver"
                              />

                              <CaregiverComponent index={index} />
                            </Box>
                          ))}

                        <Button
                          leftIcon={<Icon as={BsPlusCircle} />}
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => push(newInfo.caregiver)}
                        >
                          Include new caregiver
                        </Button>
                      </VStack>
                    )}
                  />
                </>
              )}

              <Flex justifyContent="space-between" mt={4}>
                {step > 1 && (
                  <Button
                    colorScheme="pink"
                    variant="ghost"
                    onClick={previousStep}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : step < totalSteps
                    ? "Next"
                    : "Submit"}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </VStack>
    </Box>
  );
};

export default RegisterMemberComponent;
