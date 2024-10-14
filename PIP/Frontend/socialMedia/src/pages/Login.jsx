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
  InputRightElement,
  Progress,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate ,  Link} from "react-router-dom";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../redux/actions/AuthActions";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {isAuth , token , isLoading , isError} = useSelector((s) => s.auth);
  const toast = useToast();
  const navigate = useNavigate(); 
  if (token) {
    return <Navigate to={'/'} replace />;
  }
  const handleToast = () => {
    toast({
      title: "Login Success.",
      description: "Thank you for login our website.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const params = {
        email,
        password,
      };
      console.log(isAuth);
      dispatch(loginRequest());
        axios
          .post("http://localhost:3030/api/auth/login", params)
          .then((r) => {
            return dispatch(loginSuccess(r.data.token));
          })
          .then(() => handleToast())
          .then(() => navigate('/'))
          .catch((e) => dispatch(loginFailure()));
      }
    setEmail("");
    setPassword("");
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
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?
        <Link to="/register" color="teal.500">
        Sign Up
      </Link>
      </Box>
    </Flex>
  );
};

export default Login;