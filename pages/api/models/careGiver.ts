import { v4 as uuidv4 } from "uuid";
import { CaregiverForm } from "@/lib/definitions/form-interfaces";
import { db } from "../db";

const buildCareGiver = () => {
  return function makeCareGiver(careGiver: CaregiverForm) {
    const id = uuidv4();
    const caregiver = { ...careGiver, id };

    if (!caregiver.firstName) {
      throw new Error("Caregiver must have a first name.");
    }
    if (caregiver.firstName.length < 2) {
      throw new Error("Caregiver first name must be longer than 2 characters.");
    }
    if (!caregiver.lastName) {
      throw new Error("Caregiver must have a last name.");
    }
    if (caregiver.lastName.length < 2) {
      throw new Error("Caregiver last name must be longer than 2 characters.");
    }
    if (!caregiver.email) {
      throw new Error("Caregiver must have an email.");
    }
    if (!caregiver.gender) {
      throw new Error("CareGiver mast have a gender.");
    }
    if (!caregiver.roleInChurch) {
      throw new Error("CareGiver must have a role in church.");
    }
    // if (caregiver.departmentInChurch) {
    //   throw new Error("CareGiver must have a department in church.");
    // }
    if (!caregiver.phoneNumberPrimary) {
      throw new Error("CareGiver must have a primary phone number.");
    }
    if (!caregiver.relationshipWithChild) {
      throw new Error("CareGiver must have a relationship with child.");
    }
    if (!caregiver.relationshipWithChildType) {
      throw new Error("CareGiver must have a relationship with child type.");
    }
    if (!caregiver.caregiverRelationshipTypeWithParent) {
      throw new Error("CareGiver must have a relationship with parent.");
    }
    if (!caregiver.caregiverRelationshipWithParentData) {
      throw new Error("CareGiver must have a relationship with parent type.");
    }

    return Object.freeze({
      getId: () => caregiver.id,
      getFirstName: () => caregiver.firstName,
      getLastName: () => caregiver.lastName,
      getEmail: () => caregiver.email,
      getGender: () => caregiver.gender,
      getRoleInChurch: () => caregiver.roleInChurch,
      getDepartmentInChurch: () => caregiver.departmentInChurch,
      getMinistry: () => caregiver.ministry,
      getPhoneNumberPrimary: () => caregiver.phoneNumberPrimary,
      getPhoneNumberSecondary: () => caregiver.phoneNumberSecondary,
      getRelationshipWithChild: () => caregiver.relationshipWithChild,
      getRelationshipWithChildType: () => caregiver.relationshipWithChildType,
      getCaregiverRelationshipTypeWithParent: () =>
        caregiver.caregiverRelationshipTypeWithParent,
      getCaregiverRelationshipWithParentData: () =>
        caregiver.caregiverRelationshipWithParentData,
      getPhotograph: () => caregiver.photograph,

      getCareGiverData: (): CaregiverForm => {
        return {
          id: caregiver.id,
          firstName: caregiver.firstName,
          lastName: caregiver.lastName,
          email: caregiver.email,
          gender: caregiver.gender,
          roleInChurch: caregiver.roleInChurch,
          departmentInChurch: caregiver.departmentInChurch,
          ministry: caregiver.ministry,
          phoneNumberPrimary: caregiver.phoneNumberPrimary,
          phoneNumberSecondary: caregiver.phoneNumberSecondary,
          relationshipWithChild: caregiver.relationshipWithChild,
          relationshipWithChildType: caregiver.relationshipWithChildType,
          caregiverRelationshipTypeWithParent:
            caregiver.caregiverRelationshipTypeWithParent,
          caregiverRelationshipWithParentData:
            caregiver.caregiverRelationshipWithParentData,
          photograph: caregiver.photograph,
        };
      },

      getById: async (caregiverId: string) => {
        const careGiverDb = db("careGiver");
        const caregiver = await careGiverDb.getOne(caregiverId);
        if (!caregiver) {
          throw new Error("CareGiver not found.");
        }
        return caregiver;
      },

      save: async (data: CaregiverForm) => {
        const careGiverDb = db("careGiver");
        return await careGiverDb.create(data);
      },
    });
  };
};

export default buildCareGiver;
