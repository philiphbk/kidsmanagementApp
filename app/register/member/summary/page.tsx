// pages/summary.tsx
import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Container,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useStore } from "../components/Store"; // Adjust the import path as necessary
import axios from "axios";
import { useRouter } from "next/navigation";

const SummaryPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  // Retrieve form data from Zustand store
  const { formData } = useStore();

  const submitRegistration = async () => {
    // Retrieve the stored data
    const data = useStore.getState().formData;

    if (!data) {
      console.error("No data to submit");
      return;
    }

    try {
      // Make the API call
      const response = await axios.post("/api/registration", data, {
        headers: { "Content-Type": "application/json" },
        // Adjust these values based on the size of your data
        maxContentLength: 100000000,
        maxBodyLength: 1000000000,
      });
      console.log(response.data);

      toast({
        title: "Registration successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/register/success");
    } catch (error) {
      // Handle errors here
      console.error("Failed to submit registration:", error);
      toast({
        title: "Registration failed.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!formData) {
    return (
      <Box>
        <Text>No form data available.</Text>
      </Box>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Heading as="h2" size="lg">
          Registration Summary
        </Heading>
        {/* Display the summary information here */}
        <Box>
          <Text fontWeight="bold">Parent Information:</Text>
          <Text>First Name: {formData.parent.firstName}</Text>
          <Text>Last Name: {formData.parent.lastName}</Text>
          <Text>Email: {formData.parent.email}</Text>
          <Text>Phone Number: {formData.parent.phoneNumberPrimary}</Text>
          <Text>
            Secondary Phone Number: {formData.parent.phoneNumberSecondary}
          </Text>
          <Text>Address: {formData.parent.address}</Text>
          <Text>RoleInChurch: {formData.parent.roleInChurch}</Text>
          <Text>DepartmentInChurch: {formData.parent.departmentInChurch}</Text>

          {/* Display other parent information */}
        </Box>
        <Box>
          <Text fontWeight="bold">Children:</Text>
          {formData.child.map((child, index) => (
            <VStack key={index} align="start">
              <Text>
                Child {index + 1} First Name: {child.firstName}
              </Text>
              <Text>
                Child {index + 1} Last Name: {child.lastName}
              </Text>
              <Text>
                Child {index + 1} Date of Birth: {child.dateOfBirth}
              </Text>
              <Text>
                Child {index + 1} Gender: {child.gender}
              </Text>
              {/* Display other child information */}
            </VStack>
          ))}
        </Box>
        {/* Similarly for caregivers */}
        <Box>
          <Text fontWeight="bold">Caregivers:</Text>
          {formData.caregiver.map((caregiver, index) => (
            <VStack key={index} align="start">
              <Text>
                Caregiver {index + 1} First Name: {caregiver.firstName}
              </Text>
              <Text>
                Caregiver {index + 1} Last Name: {caregiver.lastName}
              </Text>
              <Text>
                Caregiver {index + 1} Email: {caregiver.email}
              </Text>
              <Text>
                Caregiver {index + 1} Gender: {caregiver.gender}
              </Text>
              {/* Display other caregiver information */}
            </VStack>
          ))}
        </Box>
        <Button colorScheme="blue" onClick={submitRegistration}>
          Submit Registration
        </Button>
      </VStack>
    </Container>
  );
};

export default SummaryPage;
