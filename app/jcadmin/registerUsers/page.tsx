"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

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
    <div className=" p-6">
      <h1>Registered Users</h1>
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {registeredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
