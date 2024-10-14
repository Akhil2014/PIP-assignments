import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Divider,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import LogoutButton from "../components/Logout";
import CreatePost from "../components/CreatePost";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [users , setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((s) => s.auth); 
  if (!token) {
    return <Navigate to="/login" />;
  } 

  const FetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/auth/users'); 
      setUsers(response.data); 
    } catch (err) {
      console.error('Error fetching users:', err);
  }
} 

const getUserNameById = (userId) => {
  const user = users.find((user) => user._id === userId);
  return user ? user.username : "Unknown User"; 
};
  const FetchPost = () => {
    console.log(token , "TOEN")
    axios
      .get("http://localhost:3030/api/posts/myposts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false)
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {   
      FetchPost();
      FetchUser();
  }, []);

  const handleCommentInput = (postId, e) => {
    if (e.key === "Enter") {
      const newComment =e.target.value;
      if(!newComment) {
        alert('Please type something')
      }else{  
        
        axios
          .post(`http://localhost:3030/api/posts/${postId}/comments`, {
            text:newComment
          },{
            headers: {
              Authorization: `Bearer ${token}`
          }
          })
          .then(() => FetchPost())
          .catch((e) => console.log('EROROR',e));
        console.log(`Comment for post ${postId}:`, newComment);
        e.target.value = ""; 
      }
      
    }
  };

  return ( 
    <>
    <LogoutButton />
    <Flex
      flexDirection="column"
      p={5}
      w="100%"
      maxW="600px"
      mx="auto"
      height="100vh"
    >
      <Heading mb={6} textAlign="center">
        Feed
      </Heading>

      <Box overflowY="scroll" height="80vh">
        <Stack spacing={6}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Box key={index} p={5} shadow="md" borderWidth="1px">
                  <Skeleton height="20px" width="150px" mb={3} />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Box>
              ))
            : posts.map((post) => (
                <Box key={post._id} p={5} shadow="md" borderWidth="1px">
                  <HStack spacing={3} mb={3}>
                    <Avatar src={post.avatar} />
                    <Text fontWeight="bold">{getUserNameById(post.user)}</Text>
                  </HStack>
                  <Text mb={3}>{post.text}</Text>
                  <Divider />

                  <Box mt={3}>
                    {post.comments.map((comment) => (
                      <HStack
                        key={comment._id}
                        align="start"
                        spacing={3}
                        mt={3}
                      >
                        <Avatar size="sm" />
                        <Text fontWeight="bold">{getUserNameById(comment.user)}</Text>
                        <Text>{comment.text}</Text>
                      </HStack>
                    ))}

                    <Box mt={4}>
                      <Input
                        placeholder="Add a comment... and press enter"
                        variant="filled"
                        onKeyPress={(e) => handleCommentInput(post._id, e)}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
        </Stack>
      </Box>

      {/* <Button mt={8} colorScheme="teal" w="full">
        <Link to={"/feed/friendRequest"}>Friend Requests</Link>
      </Button> */} 
    </Flex>
    </>
  );
};

export default Feed;
