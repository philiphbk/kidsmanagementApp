export interface FormHeaderType {
  title: string;
  description?: string;
}

export enum Gender {
  male = 'male',
  female = 'female'
}

export enum ParentType {
  biological = 'biological',
  guardian = 'guardian'
}

// member registration interface
export interface CreateParentData {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  roleInChurch: string;
  departmentInChurch: string;
  phoneNumberPrimary: string;
  phoneNumberSecondary?: string;
  idName: string;
  idNumber: string;
  idPhoto: any; // Image data for the ID picture
  type: ParentType;
}

export interface Parent extends CreateParentData {
  // Additional properties specify to Parent entity
}

export interface Department {
  id: string;
  value: string;
}

export interface OptionType {
  label: string;
  value: string;
}

export interface MySelectComponentProps {
  departmentInChurchData: Department[];
}


export interface Child {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  ageGroup: string;
  photograph: string; // Image data for the photograph
  relationshipWithChildType: string;
  relationshipWithChild: string;
  parent: string[];
  caregiver: string[];
  specialNeeds?: string;
}

export enum CareGiverType {
  grandDad = 'grandDad',
  grandMom = 'grandMom',
  uncle = 'uncle',
  aunt = 'aunt',
  brother = 'brother',
  sister = 'sister',
  other = 'other'
}

export interface Caregiver {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  roleInChurch: string;
  departmentInChurch: string;
  phoneNumberPrimary: string;
  phoneNumberSecondary?: string;
  relationshipWithChildType: string;
  relationshipWithChild: string;
  caregiverRelationshipTypeWithParent: string;
  caregiverRelationshipWithParentData: string;
  // churchLocation: string;
  // churchBranchInLocation: string;
  photograph: string; // Compulsory if relationship with parent is 'Others'
  type: CareGiverType;
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

export interface RegistrationFormValues {
  parent: Parent;
  child: Child[];
  caregiver: Caregiver[];
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
