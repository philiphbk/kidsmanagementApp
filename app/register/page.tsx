// import Link from "next/link";
import {
  Box,
  Heading,
  Button,
  Flex,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import HODLogo from "@/public/images/hodlogo1.png";
// import Image from "next/image";
import NextLink from "next/link";

export default function Register() {
  return (
    <>
      <Flex
        className="success_container"
        minHeight="100vh"
        align="center"
        justify="center"
        py="20"
      >
        <Box>
          <Flex justify="center">
            <Image src={HODLogo.src} width={100} height={100} alt="HOD logo" />
          </Flex>
          <Heading
            mt="8"
            mb="12"
            fontWeight="extrabold"
            fontSize={{ base: "2xl", sm: "2.75rem", md: "6xl" }}
            lineHeight="shorter"
            textAlign="center"
            color="#273472"
          >
            Welcome to <br />
            Junior Church <br />
            Kids App
          </Heading>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap="6"
            align="center"
            justify="center"
          >
            <NextLink href="/register/member" passHref>
              <ChakraLink>
                <Button colorScheme="blue" fontWeight="500" size="lg">
                  Register as a Member
                </Button>
              </ChakraLink>
            </NextLink>
            {/* Uncomment and use when the visitor registration is needed */}
            {/* <NextLink href="/register/visitor" passHref>
            <Button
              as={ChakraLink}
              variant="outline"
              fontWeight="500"
              size="lg"
            >
              Register as a Visitor
            </Button>
          </NextLink> */}
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
