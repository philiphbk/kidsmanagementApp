import {
  CreateParentData
} from "@/lib/definitions/form-interfaces";
import { db } from "../db";

const buildMakeParent = () => {
  return function makeParent(parent: CreateParentData) {
    if (parent === undefined) {
      throw new Error("Parent object is required.");
    }
    if (!parent.firstName) {
      throw new Error("Parent must have a first name.");
    }
    if (parent.firstName.length < 2) {
      throw new Error("Parent first name must be longer than 2 characters.");
    }
    if (!parent.lastName) {
      throw new Error("Parent must have a last name.");
    }
    if (parent.lastName.length < 2) {
      throw new Error("Parent last name must be longer than 2 characters.");
    }
    if (!parent.email) {
      throw new Error("Parent must have an email.");
    }
    if (!parent.gender) {
      throw new Error("Parent must have a gender.");
    }
    // if (Object.values(Gender).includes(parent.gender)) {
    //   throw new Error("Please enter a valid gender.");
    // }
    if (!parent.phoneNumberPrimary) {
      throw new Error("Parent must have a primary phone number.");
    }
    if (!parent.idName) {
      throw new Error("Please select a means of identification.");
    }
    if (!parent.idNumber) {
      throw new Error("Please enter the identification number.");
    }
    if (!parent.idPhoto) {
      throw new Error("Please upload a photo of the identification.");
    }

    return Object.freeze({
      getFirstName: () => parent.firstName,
      getLastName: () => parent.lastName,
      getEmail: () => parent.email,
      getGender: () => parent.gender,
      getRoleInChurch: () => parent.roleInChurch,
      getDepartmentInChurch: () => parent.departmentInChurch,
      getPhoneNumberPrimary: () => parent.phoneNumberPrimary,
      getphoneNumberSecondary: () => parent.phoneNumberSecondary,
      getIdName: () => parent.idName,
      getIdNumber: () => parent.idNumber,
      getIdPhoto: () => parent.idPhoto,
      getType: () => parent.type,

      getCreateParentData: (): CreateParentData => {
        return {
          firstName: parent.firstName,
          lastName: parent.lastName,
          email: parent.email,
          gender: parent.gender,
          roleInChurch: parent.roleInChurch,
          departmentInChurch: parent.departmentInChurch,
          phoneNumberPrimary: parent.phoneNumberPrimary,
          phoneNumberSecondary: parent.phoneNumberSecondary,
          idName: parent.idName,
          idNumber: parent.idNumber,
          idPhoto: parent.idPhoto,
          type: parent.type,
        };
      },

      getById: async (parentId: string) => {
        const parentDb = db("parent");
        const parent = await parentDb.getOne(parentId);
        if (!parent) {
          throw new Error("Parent not found.");
        }
        return parent;
      },

      save: async (data: CreateParentData) => {
        const parentDb = db("parent");
        await parentDb.create(data);
      },
    });
  };
};

export default buildMakeParent;
