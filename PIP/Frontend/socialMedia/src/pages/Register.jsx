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
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Progress,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  RegisterFailure,
  RegisterRequest,
  RegisterSuccess,
} from "../redux/actions/AuthActions";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isAuth , token , isLoading , isError} = useSelector((s) => s.auth);
  const toast = useToast();
  const handleToast = () => {
    toast({
      title: "Register Success.",
      description: "Thank you for Register.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && userName) {
      const params = {
        email,
        username:userName,
        password,
      };
      dispatch(RegisterRequest());
        axios
          .post("http://localhost:3030/api/auth/register", params)
          .then((r) => {
            return dispatch(RegisterSuccess(r.data.token));
          })
          .then(() => handleToast()) 
          .then(() =>   navigate('/login'))
          .catch((e) => 
            {
              alert("Something wrong")
              return dispatch(RegisterFailure())
    });
      }
    setEmail("");
    setPassword("");
    setuserName("");
  };
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="dark"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="dark" boxShadow="md">
            <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    type="text"
                    placeholder="user name"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email address"
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
                    type={showPassword  ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword  ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {isLoading && (
                <Progress color="white" size="xs" isIndeterminate />
              )}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;