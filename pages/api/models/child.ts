import { v4 as uuidv4 } from "uuid";
import { ChildForm } from "@/lib/definitions/form-interfaces";
import { db } from "../db";

const buildMakeChild = () => {
  return function makeChild(
    childInfo: ChildForm,
    parentId: string,
    caregiverIds: string
  ) {
    const id = uuidv4();
    const child = { ...childInfo, id };

    if (!child.firstName) {
      throw new Error("Child must have a first name.");
    }
    if (child.firstName.length < 2) {
      throw new Error("Child first name must be longer than 2 characters.");
    }
    if (!child.lastName) {
      throw new Error("Child must have a last name.");
    }
    if (child.lastName.length < 2) {
      throw new Error("Child last name must be longer than 2 characters.");
    }
    if (!child.gender) {
      throw new Error("Child must have a gender.");
    }
    if (!child.dateOfBirth) {
      throw new Error("Child must have a date of birth.");
    }
    if (!child.ageGroup) {
      throw new Error("Child must have an age group.");
    }
    if (!child.photograph) {
      throw new Error("Child must have a photograph.");
    }
    // if (!parent.length) {
    //   throw new Error('Child must have a parent.')
    // }
    // if (!caregiver) {
    //   throw new Error('Child must have a caregiver.')
    // }

    return Object.freeze({
      getId: () => child.id,
      getFirstName: () => child.firstName,
      getLastName: () => child.lastName,
      getGender: () => child.gender,
      getDateOfBirth: () => child.dateOfBirth,
      getAgeGroup: () => child.ageGroup,
      getPhotograph: () => child.photograph,
      getParentId: () => parentId,
      getCaregiverIds: () => caregiverIds,
      getRelationshipWithChildType: () => child.relationshipWithChildType,
      getRelationshipWithChild: () => child.relationshipWithChild,
      getSpecialNeeds: () => (child.specialNeeds ? child.specialNeeds : null),

      getCreateChildData: (): ChildForm => {
        return {
          id: child.id,
          firstName: child.firstName,
          lastName: child.lastName,
          gender: child.gender,
          dateOfBirth: child.dateOfBirth,
          ageGroup: child.ageGroup,
          photograph: child.photograph,
          parentId: parentId,
          caregiverIds: caregiverIds,
          relationshipWithChildType: child.relationshipWithChildType,
          relationshipWithChild: child.relationshipWithChild,
          specialNeeds: child.specialNeeds,
        };
      },

      getById: async (childId: string) => {
        const childData = await db.getOne("child", childId);
        if (!childData) {
          throw new Error("Child not found.");
        }
        return childData;
      },

      save: async (data: ChildForm) => {
        await db.create("child", data);
      },
    });
  };
};

export default buildMakeChild;
