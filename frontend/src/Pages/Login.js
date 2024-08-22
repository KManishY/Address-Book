import { useState } from "react";
import axios from "axios";
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
import { Link, useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const initialState = { email: "", password: "", userOtp:'' };
  const [loginDetails, setLoginDetails] = useState(initialState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async () => {
    if (loginDetails) {
      if(!otpStatus){
        loginDetails.type='a'
      }else{
        loginDetails.type='b'
      }
      console.log("loginDetails: ", loginDetails);
      try {
        const response = await axios.post(
          "https://address-book-cumk.onrender.com/login",
          loginDetails
        );
        if(response.data.status && !otpStatus){
           alert('Enter otp sent to your email for login');
           setOtpStatus(true);
           return;
        }else if(response.data.status && otpStatus){
          localStorage.setItem("authToken", response.data.token); // Save token with key 'authToken'
          localStorage.setItem("name", response.data.name); // Save token with key 'authToken'
          console.log("Token saved to localStorage:", response.data.token);
          navigate("/logbook");
        }else{
          alert(response.data.message);
        }
        

       
      } catch (error) {
        console.error(
          "Error during login:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };
 

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
              
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    isReadOnly={otpStatus}
                    type="text"
                    placeholder="email"
                    name="email"
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
                    isReadOnly={otpStatus}
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
              {otpStatus && <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="OTP"
                    name="userOtp"
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </FormControl>}
              
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
              >
                {otpStatus ? "Submit OTP" : "Login"}
              </Button>
              <Link to={"/Signup"}>new user? Signup</Link>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
//  "@material-ui/core": "^4.12.4",
export default Login;
