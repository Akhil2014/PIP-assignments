import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postContent, setPostContent] = useState(""); 
  const {token} = useSelector((s) => s.auth); 

  const handlePost = async () => {
    const postData = {
      text: postContent, 
    };
  
    try {
      const response = await axios.post(
        'http://localhost:3030/api/posts', 
        postData,  
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        }
      );
  
      console.log("Post created successfully:", response.data);
      setPostContent(""); 
      onClose(); 
    } catch (error) {
      console.error("Error creating post:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Create Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Post Content</FormLabel>
              <Textarea
                placeholder="What's on your mind?"
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePost}>
              Post
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
