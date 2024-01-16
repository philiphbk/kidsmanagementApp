export interface FormHeaderType {
    title: string,
    description?: string
}

// member registration interface
export interface ParentInformation {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    roleInChurch: string;
    departmentInChurch: string;
    phoneNumberPrimary: string;
    phoneNumberSecondary?: string;
    idName: string;
    idPhoto: string; // Image data for the ID picture
}

export interface ChildInformation {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    ageGroup: string;
    photograph: string;// Image data for the photograph
    relationshipWithChildType: string;
    relationshipWithChild: string;
    specialNeeds?: string;
}

export interface CaregiverInformation {
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
    parentInformation: ParentInformation;
    childInformation: ChildInformation[];
    caregiverInformation: CaregiverInformation[];
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

export interface VisitorInformation {
    parentInformation: VisitorParent;
    childInformation: VisitorChild[];
}