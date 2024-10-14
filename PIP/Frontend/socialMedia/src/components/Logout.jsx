import { Button, Flex } from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from "../redux/actions/AuthActions";
import CreatePost from "./CreatePost";


const LogoutButton = ({handlePost}) => {
    const dispatch = useDispatch();  
  const navigate = useNavigate(); 
  const handleLogout = () => {
    dispatch(Logout());
    navigate('/login');
  };
return (
    <>
     <Flex justifyContent="flex-end" p={4}>
      <CreatePost handlePost={handlePost} />
          <Button onClick={handleLogout} mx={5} colorScheme="teal">
            Logout
          </Button>
        </Flex>
    </>
)
}

export default LogoutButton;