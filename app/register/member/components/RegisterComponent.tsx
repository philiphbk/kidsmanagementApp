"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
    useFormikContext,
    Formik,
    FormikHelpers,
    Form,
    FieldArray,
  } from "formik";
  import * as Yup from "yup";

  import { RegistrationForm } from "@/lib/definitions/form-interfaces";
  import HodLogoOnly from "@/app/register/components/HodLogo";
import FormHeader from "@/app/register/components/FormHeader";
import ParentComponent from "./InformationParent";
import ChildComponent from "./InformationChild";
import CaregiverComponent from "./InformationCaregiver";
import { BsPlusCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";

const RegisterComponent = () => {
  const router = useRouter();
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

  const ParentSchema = Yup.object().shape({
    parent: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      gender: Yup.string(),
        roleInChurch: Yup.string().required("Role in church is required"),
        departmentInChurch: Yup.string(),
      phoneNumberPrimary: Yup.string().required("Phone Number is required"),
        phoneNumberSecondary: Yup.string(),
        idType: Yup.string().required("ID Type is required"),
        idNumber: Yup.string().required("ID Number is required"),
        idPhoto: Yup.string().required("ID Photo is required"),
        photograph: Yup.string().required("Photograph is required"),
        address: Yup.string().required("Address is required"),
    }),
}). nullable();

const ChildSchema = Yup.object().shape({
    child: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        ageGroup: Yup.string().required("Age Group is required"),
        gender: Yup.string().required("Gender is required"),
        dateOfBirth: Yup.string().required("Date of Birth is required"),
        photograph: Yup.string().required("Photograph is required"),
        relationshipWithChildType: Yup.string().required("Relationship with Child Type is required"),
        relationshipWithChild: Yup.string().required("Relationship with Child is required"),
        specialNeeds: Yup.string().required("Special Needs is required"),
      })),
}).nullable();

const CaregiverSchema = Yup.object().shape({
    caregiver:Yup.array().of( 
    Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      gender: Yup.string().required("Gender is required"),
        roleInChurch: Yup.string().required("Role in church is required"),
        departmentInChurch: Yup.string().required("Department in church is required"),
        phoneNumberPrimary: Yup.string().required("Phone Number is required"),
        phoneNumberSecondary: Yup.string(),
        relationshipWithChildType: Yup.string().required("Relationship with Child Type is required"),
        relationshipWithChild: Yup.string().required("Relationship with Child is required"),
        caregiverRelationshipTypeWithParent: Yup.string().required("Caregiver Relationship Type with Parent is required"),
        caregiverRelationshipWithParentData: Yup.string().required("Caregiver Relationship with Parent Data is required"),
        photograph: Yup.string().required("Photograph is required"), 
    })),
    }).nullable();


  const initialValues: RegistrationForm = {
    parent: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",

    };

    return ();

    export default RegisterComponent;