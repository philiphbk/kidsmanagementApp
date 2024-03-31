"use client";

import { useState } from "react";
import HODLogo from "@/public/images/hodlogo1.png";
// import Image from "next/image";
// import Link from "next/link";
import {
  Box,
  Flex,
  Image,
  Link,
  IconButton,
  Stack,
  useBreakpointValue,
  Collapse,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // <Box px={4} bg="bodyTertiary">
    //   <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
    //     <NextLink href="#" passHref>
    //       <Link>
    //         <Image src={HODLogo.toString()} boxSize="60px" alt="HOD Logo" />
    //       </Link>
    //     </NextLink>

    //     {isMobile ? (
    //       <IconButton
    //         onClick={toggleMenu}
    //         icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
    //         variant="outline"
    //         aria-label="Toggle Menu"
    //       />
    //     ) : null}

    //     <Collapse in={isMenuOpen || !isMobile} animateOpacity>
    //       <Flex
    //         align="center"
    //         justify={isMobile ? "start" : "space-between"}
    //         direction={isMobile ? "column" : "row"}
    //         pt={isMobile ? 4 : 0}
    //       >
    //         {isMobile ? (
    //           <Stack as={"nav"} spacing={4}>
    //             <NextLink href="/jcadmin/overview" passHref>
    //               <Link>Overview</Link>
    //             </NextLink>
    //             <NextLink href="/jcadmin/checkInOut" passHref>
    //               <Link>Check In/Out</Link>
    //             </NextLink>
    //             <NextLink href="/jcadmin/registerUsers" passHref>
    //               <Link>Registered Users</Link>
    //             </NextLink>
    //             <NextLink href="/jcadmin/settings" passHref>
    //               <Link>Settings</Link>
    //             </NextLink>
    //             <NextLink href="/login" passHref>
    //               <Link>Logout</Link>
    //             </NextLink>
    //           </Stack>
    //         ) : (
    //           <Stack as={"nav"} direction={"row"} spacing={4}>
    //             <NextLink href="/jcadmin/overview" passHref>
    //               <Link>Overview</Link>
    //             </NextLink>
    //             <NextLink href="/jcadmin/checkInOut" passHref>
    //               <Link>Check In/Out</Link>
    //             </NextLink>
    //             <NextLink href="/jcadmin/registerUsers" passHref>
    //               <Link>Registered Users</Link>
    //             </NextLink>
    //             <NextLink href="/jcadmin/settings" passHref>
    //               <Link>Settings</Link>
    //             </NextLink>
    //             <NextLink href="/login" passHref>
    //               <Link>Logout</Link>
    //             </NextLink>
    //           </Stack>
    //         )}
    //       </Flex>
    //     </Collapse>
    //   </Flex>
    // </Box>
    <Box bg="bodyTertiary" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <NextLink href="#" passHref>
            <Link>
              <Image
                src={HODLogo.toString()}
                width={60}
                height={60}
                alt="HOD Logo"
              />
            </Link>
          </NextLink>
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <NextLink href="/jcadmin/overview" passHref>
              <MenuItem as={Link}>Overview</MenuItem>
            </NextLink>
            <NextLink href="/jcadmin/checkInOut" passHref>
              <MenuItem as={Link}>Check In/Out</MenuItem>
            </NextLink>
            <NextLink href="/jcadmin/registerUsers" passHref>
              <MenuItem as={Link}>Registered Users</MenuItem>
            </NextLink>
            <NextLink href="/jcadmin/settings" passHref>
              <MenuItem as={Link}>Settings</MenuItem>
            </NextLink>
            <NextLink href="/login" passHref>
              <MenuItem as={Link}>Logout</MenuItem>
            </NextLink>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
    // <div>
    //   <Navbar expand="lg" className="bg-body-tertiary">
    //     <Container>
    //       <Navbar.Brand href="#">
    //         <Image src={HODLogo} width={60} height={60} alt="hodlogo" />
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="me-auto">
    //           <Nav.Link
    //             href="/jcadmin/overview"
    //             className=" hover: text-blue-800 ease-out font-semibold"
    //           >
    //             Overview
    //           </Nav.Link>
    //           <Nav.Link
    //             href="/jcadmin/checkInOut"
    //             className=" active: text-blue-800 ease-out font-semibold"
    //           >
    //             Check In/Out
    //           </Nav.Link>
    //           <Nav.Link
    //             href="/jcadmin/registerUsers"
    //             className=" active: text-blue-800 ease-out font-semibold"
    //           >
    //             Registered Users
    //           </Nav.Link>
    //           <Nav.Link
    //             href="/jcadmin/settings"
    //             className=" active: text-blue-800 ease-out font-semibold"
    //           >
    //             Settings
    //           </Nav.Link>
    //           <Nav.Link
    //             href="/login"
    //             className=" active: text-blue-800 ease-out font-semibold"
    //           >
    //             Logout
    //           </Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </div>
  );
}
