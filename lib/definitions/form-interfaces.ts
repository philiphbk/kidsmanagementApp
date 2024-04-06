export interface FormHeaderType {
  title: string;
  description?: string;
}

// member registration interface

export interface ParentForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  roleInChurch: string;
  departmentInChurch?: string;
  ministry?: string;
  phoneNumberPrimary: string;
  phoneNumberSecondary?: string;
  idType: string;
  idNumber: string;
  idPhoto: any;
  photograph: any;
  address: string;
}

export interface ChildForm {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: string;
  gender: string;
  dateOfBirth: string;
  photograph: any;
  relationshipWithChildType: string;
  relationshipWithChild: string;
  specialNeeds: string;
  parentId: string;
  caregiverIds: string;
}

export interface CaregiverForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  roleInChurch: string;
  departmentInChurch: string;
  ministry: string;
  phoneNumberPrimary: string;
  phoneNumberSecondary?: string;
  relationshipWithChildType: string;
  relationshipWithChild: string;
  caregiverRelationshipTypeWithParent: string;
  caregiverRelationshipWithParentData: string;
  photograph?: any;
}

export interface RegistrationForm {
  parent: ParentForm;
  caregiver: CaregiverForm[];
  child: ChildForm[];
}

export interface Department {
  id: string;
  value: string;
}

export enum CareGiverType {
  grandDad = "grandDad",
  grandMom = "grandMom",
  uncle = "uncle",
  aunt = "aunt",
  brother = "brother",
  sister = "sister",
  other = "other",
}

export interface RoleFormValues {
  selectedRole: string;
  selectedPortfolio?: string;
  selectedDepartment?: string;
  selectedColony?: string;
  selectedHousehold?: string;
}

export interface RoleDropdownProps {
  onRoleChange: (values: RoleFormValues) => void;
}

// visitor registration interface
export interface VisitorParent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  relationshipWithChildType: string;
  relationshipWithChild: string;
}

export interface VisitorChild {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  ageGroup: string;
  photograph: string;
  specialNeeds?: string;
}

export interface Visitor {
  parentInformation: VisitorParent;
  childInformation: VisitorChild[];
}

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

export interface ChildDropOffProfile {
  id: number;
  name: string;
  pictureUrl?: string | StaticImageData | undefined;
  dropOffTime: string;
}

export interface LatestDropOffsProps {
  childrenDropOffProfiles: ChildDropOffProfile[];
}

export interface ChildPickUpProfile {
  id: number;
  name: string;
  pictureUrl?: string | StaticImageData | undefined;
  pickUpTime: string;
}
export interface LatestPickupsProps {
  childrenPickUpProfiles: ChildPickUpProfile[];
}
