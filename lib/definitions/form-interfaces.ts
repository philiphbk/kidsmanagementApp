export interface FormHeaderType {
  title: string;
  description?: string;
}

// member registration interface
export interface Parent {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  roleInChurch: string;
  departmentInChurch: string;
  phoneNumberPrimary: string;
  phoneNumberSecondary?: string;
  idName: string;
  idNumber: string;
  idPhoto: string; // Image data for the ID picture
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
  specialNeeds?: string;
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
  relationshipWithParentType: string;
  relationshipWithParent: string;
  churchLocation: string;
  churchBranchInLocation: string;
  photograph: string; // Compulsory if relationship with parent is 'Others'
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
