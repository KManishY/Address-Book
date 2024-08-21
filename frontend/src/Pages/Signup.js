import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleShowClick = () => setShowPassword(!showPassword);

  // console.log("state: ", status);

  const initialState = {
    name: "",
    email: "",
    password: "",
    username: "",
    mobile: ""
  };
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = () => {
    console.log(registerDetails);
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="103vh"
      mt="-90px"
      justifyContent="center"
      alignItems="center"
    >
      {" "}
      <Stack
        border="2px solid #070b34"
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="#070b34" mt="1rem" />
        <Heading color="#070b34">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form style={{ backgroundColor: "white" }}>
            <Stack spacing={4} p="1rem" boxShadow="md">
              {" "}
              // backgroundColor='whiteAlpha.900'
              {/* ---------Name---------  */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </FormControl>
              {/* --------username------------  */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="UserName"
                    name="username"
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </FormControl>
              {/* ------------Email------------  */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </FormControl>
              {/* --------Password------- */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      style={{ color: "white", backgroundColor: "teal" }}
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* -----------Phone Number----------- */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    name="mobile"
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </FormControl>
              {/* -------- Sign up Button-------- */}
              <Button
                borderRadius={0}
                variant="solid"
                width="full"
                onClick={
                  handleSubmit // colorScheme='teal'
                }
              >
                Sign Up
              </Button>
            <Link to ={'/'}>already registered...? login</Link>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
