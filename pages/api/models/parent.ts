import { v4 as uuidv4 } from "uuid";
import { ParentForm } from "@/lib/definitions/form-interfaces";
import { db } from "../db";

const buildMakeParent = () => {
  return function makeParent(parentInput: ParentForm) {
    const id = uuidv4();
    const parent = { ...parentInput, id };

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
    if (!parent.roleInChurch) {
      throw new Error("Parent must have a role in church.");
    }
    if (!parent.phoneNumberPrimary) {
      throw new Error("Parent must have a primary phone number.");
    }
    if (!parent.idType) {
      throw new Error("Please select a means of identification.");
    }
    if (!parent.idNumber) {
      throw new Error("Please enter the identification number.");
    }
    if (parent.idPhoto) {
      throw new Error("Please upload a photo of the identification.");
    }
    if (!parent.address) {
      throw new Error("Parent must have an address.");
    }

    return Object.freeze({
      getId: () => parent.id,
      getFirstName: () => parent.firstName,
      getLastName: () => parent.lastName,
      getEmail: () => parent.email,
      getGender: () => parent.gender,
      getRoleInChurch: () => parent.roleInChurch,
      getDepartmentInChurch: () => parent.departmentInChurch,
      getPhoneNumberPrimary: () => parent.phoneNumberPrimary,
      getPhoneNumberSecondary: () => parent.phoneNumberSecondary,
      getIdType: () => parent.idType,
      getIdNumber: () => parent.idNumber,
      getIdPhoto: () => parent.idPhoto,
      getPhotograph: () => parent.photograph,
      getAddress: () => parent.address,

      getCreateParentData: (): ParentForm => {
        return {
          id: parent.id,
          firstName: parent.firstName,
          lastName: parent.lastName,
          email: parent.email,
          gender: parent.gender,
          roleInChurch: parent.roleInChurch,
          departmentInChurch: parent.departmentInChurch,
          phoneNumberPrimary: parent.phoneNumberPrimary,
          phoneNumberSecondary: parent.phoneNumberSecondary,
          idType: parent.idType,
          idNumber: parent.idNumber,
          idPhoto: parent.idPhoto,
          photograph: parent.photograph,
          address: parent.address,
        };
      },

      getById: async (parentId: string) => {
        const parent = await db.getOne("parent", parentId);
        if (!parent) {
          throw new Error("Parent not found.");
        }
        return parent;
      },

      save: async (data: ParentForm) => {
        return await db.create("parent", data);
      },
    });
  };
};

export default buildMakeParent;
