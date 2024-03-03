import { Caregiver } from "@/lib/definitions/form-interfaces";
import { db } from "../db";

const buildCareGiver = () => {
  return function makeCareGiver(careGiver: Caregiver) {
    const {
      firstName,
      lastName,
      email,
      gender,
      roleInChurch,
      departmentInChurch,
      phoneNumberPrimary,
      phoneNumberSecondary,
      relationshipWithChild,
      relationshipWithChildType,
      caregiverRelationshipTypeWithParent,
      caregiverRelationshipWithParentData,
      // churchBranchInLocation,
      // churchLocation,
      photograph,
      type,
    } = careGiver;
    if (!firstName) {
      throw new Error("Caregiver must have a first name.");
    }
    if (firstName.length < 2) {
      throw new Error("Caregiver first name must be longer than 2 characters.");
    }
    if (!lastName) {
      throw new Error("Caregiver must have a last name.");
    }
    if (lastName.length < 2) {
      throw new Error("Caregiver last name must be longer than 2 characters.");
    }
    if (!email) {
      throw new Error("Caregiver must have an email.");
    }
    if (!gender) {
      throw new Error("CareGiver mast have a gender.");
    }
    if (!roleInChurch) {
      throw new Error("CareGiver must have a role in church.");
    }
    if (!departmentInChurch) {
      throw new Error("CareGiver must have a department in church.");
    }
    if (!phoneNumberPrimary) {
      throw new Error("CareGiver must have a primary phone number.");
    }
    if (!relationshipWithChild) {
      throw new Error("CareGiver must have a relationship with child.");
    }
    if (!relationshipWithChildType) {
      throw new Error("CareGiver must have a relationship with child type.");
    }
    if (!caregiverRelationshipTypeWithParent) {
      throw new Error("CareGiver must have a relationship with parent.");
    }
    if (!caregiverRelationshipWithParentData) {
      throw new Error("CareGiver must have a relationship with parent type.");
    }
    // if (!churchBranchInLocation) {
    //   throw new Error("CareGiver must have a church branch in location.");
    // }

    return Object.freeze({
      getCareGiverData: () => ({
        firstName,
        lastName,
        email,
        gender,
        roleInChurch,
        departmentInChurch,
        phoneNumberPrimary,
        phoneNumberSecondary,
        relationshipWithChild,
        relationshipWithChildType,
        caregiverRelationshipTypeWithParent,
        caregiverRelationshipWithParentData,
        // churchBranchInLocation,
        // churchLocation,
        photograph,
        type,
      }),

      save: async (data: Caregiver) => {
        const careGiverDb = db("careGiver");
        return await careGiverDb.create(data);
      },
    });
  };
};

export default buildCareGiver;
