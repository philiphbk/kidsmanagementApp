export interface FormHeaderType {
    title: string,
    description?: string
}

export interface ParentInformation {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
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
    relationship: string;
    specialNeeds?: string;
}

export interface CaregiverInformation {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phoneNumberPrimary: string;
    phoneNumberSecondary?: string;
    relationshipWithChild: string;
    relationshipWithParent: string;
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