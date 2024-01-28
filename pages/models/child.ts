import { Child } from "@/lib/definitions/form-interfaces";
import { db } from "../api/db";

const buildMakeChild = () => {
  return function makeChild(childInfo: Child) {
    const { firstName, lastName, gender, dateOfBirth, ageGroup, photograph, parent, caregiver, specialNeeds } = childInfo;
    if (!firstName) {
      throw new Error('Child must have a first name.')
    }
    if (firstName.length < 2) {
      throw new Error('Child first name must be longer than 2 characters.')
    }
    if (!lastName) {
      throw new Error('Child must have a last name.')
    }
    if (lastName.length < 2) {
      throw new Error('Child last name must be longer than 2 characters.')
    }
    if (!gender) {
      throw new Error('Child must have a gender.')
    }
    if (!dateOfBirth) {
      throw new Error('Child must have a date of birth.')
    }
    if (!ageGroup) {
      throw new Error('Child must have an age group.')
    }
    if (!photograph) {
      throw new Error('Child must have a photograph.')
    }
    if (!parent.length) {
      throw new Error('Child must have a parent.')
    }
    if (!caregiver) {
      throw new Error('Child must have a caregiver.')
    }

    return Object.freeze({
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getGender: () => gender,
      getDateOfBirth: () => dateOfBirth,
      getAgeGroup: () => ageGroup,
      getPhotograph: () => photograph,
      parent: () => parent,
      getRelationshipWithChild: () => caregiver,
      getSpecialNeeds: () => specialNeeds,

      getCreateChildData: () => ({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        ageGroup,
        photograph,
        parent,
        caregiver,
        specialNeeds
      }),

      save: async (data: Child) => {
        const parentDb = db('child')
        await parentDb.create(data)
      }
    });
  };
}

export default buildMakeChild;
