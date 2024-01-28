-- Create Parent table
CREATE TABLE Parent (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR
(255),
    lastName VARCHAR
(255),
    email VARCHAR
(255),
    gender VARCHAR
(10),
    roleInChurch VARCHAR
(255),
    departmentInChurch VARCHAR
(255),
    phoneNumberPrimary VARCHAR
(20),
    phoneNumberSecondary VARCHAR
(20),
    idName VARCHAR
(255),
    idNumber VARCHAR
(255),
    idPhoto VARCHAR
(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
UPDATE CURRENT_TIMESTAMP
);

-- Create Child table
CREATE TABLE Child (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR
(255),
    lastName VARCHAR
(255),
    gender VARCHAR
(10),
    dateOfBirth DATE,
    ageGroup VARCHAR
(255),
    photograph VARCHAR
(255),
    relationshipWithChildType VARCHAR
(255),
    relationshipWithChild VARCHAR
(255),
    specialNeeds VARCHAR
(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
UPDATE CURRENT_TIMESTAMP
);

-- Create Caregiver table
CREATE TABLE Caregiver (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR
(255),
    lastName VARCHAR
(255),
    email VARCHAR
(255),
    gender VARCHAR
(10),
    roleInChurch VARCHAR
(255),
    departmentInChurch VARCHAR
(255),
    phoneNumberPrimary VARCHAR
(20),
    phoneNumberSecondary VARCHAR
(20),
    relationshipWithChildType VARCHAR
(255),
    relationshipWithChild VARCHAR
(255),
    relationshipWithParentType VARCHAR
(255),
    relationshipWithParent VARCHAR
(255),
    churchLocation VARCHAR
(255),
    churchBranchInLocation VARCHAR
(255),
    photograph VARCHAR
(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
UPDATE CURRENT_TIMESTAMP
);

-- Create Registration table
CREATE TABLE Registration (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_id INT,
    child_id INT,
    caregiver_id INT,
    FOREIGN KEY
(parent_id) REFERENCES Parent
(id),
    FOREIGN KEY
(child_id) REFERENCES Child
(id),
    FOREIGN KEY
(caregiver_id) REFERENCES Caregiver
(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
UPDATE CURRENT_TIMESTAMP
);
