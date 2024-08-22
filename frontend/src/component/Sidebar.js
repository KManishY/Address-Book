import React from "react";
import { Box, Button, Heading, VStack, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({setOpenModal}) =>{
  const userName = localStorage.getItem('name');
  const navigate = useNavigate();
  return (
   <Box
     position="fixed"
     left={0}
     p={5}
     top={0}
     width="15%"
     h="100%"
     bg="#dfdfdf"
     display="flex"
     flexDirection="column"
   >
     <Heading >ADDRESS BOOK</Heading>
     <VStack spacing={4} flexGrow={1} justify="top">
       <Button w="100%">Address Book</Button>
       <Button onClick={()=>setOpenModal(true)} w="100%">Add New User</Button>
     </VStack>
     <Spacer />
     <div>
     {userName}
     <Button onClick={()=>{
      localStorage.clear();
      navigate('/login')
     }} w="100%">Logout</Button>
     </div>
   </Box>
 );
}
  

export default Sidebar;
