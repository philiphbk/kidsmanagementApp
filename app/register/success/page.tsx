//import Image from "next/image";
import HODLogo from "@/public/images/hodlogo1.png";
import Tick from "@/public/images/Circle.png";
import Link from "next/link";
import { Box, VStack, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Success() {
  return (
    <>
      <Box
        className="success_container"
        p={24}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Image src={HODLogo.src} boxSize="80px" alt="hodlogo" />
        <Text mb={4}>Junior Church Monitor</Text>
        <VStack
          alignItems="center"
          border="1px"
          borderColor="gray.200"
          p={4}
          rounded="md"
          shadow="xl"
          spacing={4}
        >
          <Image src={Tick.src} boxSize="100px" alt="tick" />
          <Heading fontSize="xl" fontWeight="bold">
            Registration Successful
          </Heading>
          <Text>Voila! There you go!</Text>
          <hr />
          <Text mt={1} mb={14}>
            Thank you for registering your child(ren) with us!
          </Text>
          <NextLink href="/register" passHref>
            <Button
              bg="#273472"
              color="white"
              px={4}
              py={2}
              rounded="md"
              fontWeight="semibold"
            >
              Go to Home
            </Button>
          </NextLink>
        </VStack>
      </Box>
      {/* <div className=" success_container flex flex-col p-24 items-center">
        <Image src={HODLogo} width={80} height={80} alt="hodlogo" />
        <p className=" mb-4">Junior Church Monitor</p>
        <div className=" flex flex-col items-center border rounded p-4 shadow-xl">
          <Image src={Tick} width={100} height={100} alt="tick" />
          <h1 className=" font-bold">Registration Successful</h1>
          <p>Voila! There you go!</p>
          <br />
          <hr></hr>
          <br />
          <p className=" mb-14">
            Thank you for registering your child(ren) with us!
          </p>
          <Link href={`/register`}>
            <button className=" bg-[#273472] rounded px-4 py-5 text-wrap text-white font-semibold">
              Go to Home
            </button>
          </Link>
        </div>
      </div> */}
    </>
  );
}
