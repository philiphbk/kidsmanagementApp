"use client";

import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import HODLogo from "@/public/images/hodlogo1.png";
import Image from "next/image";
import Link from "next/link";

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">
            <Image src={HODLogo} width={60} height={60} alt="hodlogo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/jcadmin/overview"
                className=" hover: text-blue-800 ease-out font-semibold"
              >
                Overview
              </Nav.Link>
              <Nav.Link
                href="/jcadmin/checkInOut"
                className=" active: text-blue-800 ease-out font-semibold"
              >
                Check In/Out
              </Nav.Link>
              <Nav.Link
                href="/jcadmin/registerUsers"
                className=" active: text-blue-800 ease-out font-semibold"
              >
                Registered Users
              </Nav.Link>
              <Nav.Link
                href="/jcadmin/settings"
                className=" active: text-blue-800 ease-out font-semibold"
              >
                Settings
              </Nav.Link>
              <Nav.Link
                href="/login"
                className=" active: text-blue-800 ease-out font-semibold"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
