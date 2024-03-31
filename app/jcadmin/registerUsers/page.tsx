"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";

interface Users {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export default function RegisteredUsers() {
  const [registeredUsers, setRegisteredUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios(`/api/user`);
        if (Array.isArray(result.data)) {
          setRegisteredUsers(result.data);
        } else {
          console.error(
            "Expected an array of users, but received:",
            result.data
          );
          // Handle the unexpected structure appropriately, maybe set to an empty array
          setRegisteredUsers([]);
        }
        setRegisteredUsers(result.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box py="20" px="20">
      <h1>Registered Users</h1>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>FirstName</Th>
              <Th>LastName</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {registeredUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
