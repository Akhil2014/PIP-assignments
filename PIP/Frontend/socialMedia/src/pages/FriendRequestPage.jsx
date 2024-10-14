import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Box, Stack, Text, Heading, Avatar, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

const FriendRequestPage = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const {token} = useSelector((s) => s.auth); 
  console.log(token)

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/api/users/friends/requests`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ); 
        setFriendRequests(response.data); 
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:3030/api/users/friends/request/accept`,
        { requestId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };
  
  const handleDecline = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:3030/api/users/friends/request/reject`,
        { requestId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };
  

  return (
    <Box p={4}>
      <Heading mb={6}>Friend Requests</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : friendRequests.length > 0 ? (
        <Stack spacing={4}>
          {friendRequests.map((request) => (
            <Box key={request.id} p={4} borderWidth="1px" borderRadius="lg">
              <Stack direction="row" spacing={4} align="center">
                <Avatar name={request.senderName} src={request.senderAvatar} />
                <Box flex="1">
                  <Text fontWeight="bold">{request.senderName}</Text>
                  <Text>{request.senderEmail}</Text>
                </Box>
                <Button colorScheme="green" onClick={() => handleAccept(request.id)}>
                  Accept
                </Button>
                <Button colorScheme="red" onClick={() => handleDecline(request.id)}>
                  Decline
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      ) : (
        <Text>No friend requests found.</Text>
      )}
    </Box>
  );
};

export default FriendRequestPage;
