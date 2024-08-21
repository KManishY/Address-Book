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
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login,setLogin] = useState(true);
  const handleShowClick = () => setShowPassword(!showPassword);
  // const navigate = useNavigate()

  const initialState = { username: "", password: "" };
  const [loginDetails, setLoginDetails] = useState(initialState);

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = () => {
    if (loginDetails) {
      console.log("loginDetails: ", loginDetails);
    }
  };
  const handleSignupClick =()=>{
    setLogin(true)
    console.log(login)
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="105.6vh"
      justifyContent="center"
      alignItems="center"
      mt="-110px"
    >
      <Stack
        border="2px solid #070b34"
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        bg="white"
      >
        <Avatar bg="#070b34" mt="1rem" />
        <Heading color="#070b34">Login To Address Book</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack spacing={4} p="1rem" boxShadow="md">
              {" "}
              // backgroundColor='#E2DFD2'
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
                      style={{
                        color: "white",
                        backgroundColor: "teal"
                      }}
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right"></FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
              >
                Login
              </Button>
              <Link to={'./Signup'}>new user? Signup</Link>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
//  "@material-ui/core": "^4.12.4",
export default Login