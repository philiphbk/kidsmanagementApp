// components/ChildCard.tsx

import React from "react";
// import Image from "next/image";
// import Card from "react-bootstrap/Card";
import { Box, Image, Text, VStack, Badge } from "@chakra-ui/react";

interface ChildCardProps {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: number;
  dateOfBirth: string;
  parent: string;
  gender: string;
  photograph: string;
  specialNeeds: string;
  status: string;
  onClick: () => void;
}

const ChildCard: React.FC<ChildCardProps> = ({
  firstName,
  lastName,
  gender,
  ageGroup,
  dateOfBirth,
  parent,
  photograph,
  specialNeeds,
  status,
  onClick,
}) => {
  return (
    <Box
      p={4}
      bg="white"
      boxShadow="base"
      rounded="lg"
      cursor="pointer"
      maxW="18rem"
      h="13rem"
      m={1}
      borderWidth="1px"
      borderColor="blue.500"
      onClick={onClick}
    >
      <VStack align="center" justify="center" spacing={4}>
        <Image
          src={photograph}
          alt={`${firstName} ${lastName}`}
          borderRadius="full"
          boxSize="50px"
          objectFit="cover"
        />

        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            {firstName} {lastName}
          </Text>
          <Text fontSize="xs">{`${ageGroup} yrs, ${gender}`}</Text>
          <Badge
            colorScheme={status === "checked_in" ? "green" : "red"}
            borderRadius={3}
          >
            {status}
          </Badge>
        </Box>
      </VStack>
    </Box>
  );
};

export default ChildCard;
