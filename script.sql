
CREATE DATABASE IF NOT EXISTS kids_app;

-- Create table for Parent information
CREATE TABLE Parent (
    parent_id int auto_increment,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    role_in_church VARCHAR(50) NOT NULL,
    department_in_church VARCHAR(50) NOT NULL,
    phone_number_primary VARCHAR(15) NOT NULL,
    phone_number_secondary VARCHAR(15),
    id_name VARCHAR(50) NOT NULL,
    id_photo VARCHAR(255),
    identification_number VARCHAR(20) NOT NULL,
    PRIMARY KEY (parent_id)
);

-- Create table for Child information
CREATE TABLE Child (
    child_id int auto_increment,
    parent_id INT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    age_group VARCHAR(50) NOT NULL,
    photograph VARCHAR(255),
    relationship_with_child_type VARCHAR(50) NOT NULL,
    relationship_with_child VARCHAR(50) NOT NULL,
    special_needs VARCHAR(255),
    PRIMARY KEY (child_id),
    FOREIGN KEY (parent_id) REFERENCES Parent(parent_id)
);

-- Create table for Caregiver information
CREATE TABLE Caregiver (
    caregiver_id int auto_increment,
    parent_id INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    gender VARCHAR(10),
    role_in_church VARCHAR(50),
    department_in_church VARCHAR(50),
    phone_number_primary VARCHAR(15),
    phone_number_secondary VARCHAR(15),
    relationship_with_child_type VARCHAR(50),
    relationship_with_child VARCHAR(50),
    relationship_with_parent_type VARCHAR(50),
    relationship_with_parent VARCHAR(50),
    church_location VARCHAR(255),
    church_branch_in_location VARCHAR(255),
    photograph VARCHAR(255),
    PRIMARY KEY (caregiver_id),
    FOREIGN KEY (parent_id) REFERENCES Parent(parent_id)
);

-- Create table for Registration information
CREATE TABLE Registration (
    registration_id int auto_increment,
    parent_id INT,
    child_id INT,
    caregiver_id INT,
    primary key (registration_id),
    FOREIGN KEY (parent_id) REFERENCES Parent(parent_id),
    FOREIGN KEY (child_id) REFERENCES Child(child_id),
    FOREIGN KEY (caregiver_id) REFERENCES Caregiver(caregiver_id)
);