import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../component/Sidebar";
import UserDetailForm from "../component/UserDetailForm";

const Address = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isOpen, setOpenModal] = useState(false);
  const onClose = () => setOpenModal(false);

  const handleEdit = (item) => {
    console.log("Editing item:", item);
    setSelectedContact(item);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.get("https://address-book-cumk.onrender.com/dashboard", {
        headers: {
          Authorization: token
        }
      });

      // Ensure that the response data is an array
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        throw new Error("API did not return an array");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Error fetching data:", err);
    }
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No token found in local storage");
      }

      await axios.delete(`https://address-book-cumk.onrender.com/dashboard/delete/${id}`, {
        headers: {
          Authorization: token
        }
      });
      console.log("id", id);
      // Filter out the deleted item from the state
      setData(data.filter((item) => item._id !== id));
      console.log("Deleted successfully");
    } catch (err) {
      console.error("Error deleting data:", err.message || err);
    }
  };

  return (
    <div className="sidebaardata">
      <Box>
        <HStack display="flex">
          <Box>
            <Sidebar setOpenModal={setOpenModal} />
          </Box>
          <Box>
            <TableContainer
              position="fixed"
              right={0}
              p={5}
              top={0}
              width="85%"
              h="100%"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Full Name</Th>
                    <Th>Date of Birth (DOB)</Th>
                    <Th>Contact Number</Th>
                    <Th>Email Address</Th>
                    <Th>Website</Th>
                    <Th>Group</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody overflowY="scroll">
                  {error && (
                    <Tr>
                      <Td colSpan="7" textAlign="center" color="red.500">
                        {error}
                      </Td>
                    </Tr>
                  )}
                  {data.length > 0 ? (
                    data.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.name}</Td>
                        <Td>{item.dob}</Td>
                        <Td>{item.mobile}</Td>
                        <Td>{item.email}</Td>
                        <Td>{item.website}</Td>
                        <Td>{item.group}</Td>
                        <Td>
                          <Button
                            onClick={() => handleEdit(item)}
                            colorScheme="blue"
                            mr={2}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan="7" textAlign="center">
                        No data available
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </HStack>
        {/* {showForm && (
          <UserDetailForm
            existingContact={selectedContact}
            setSelectedContact={setSelectedContact}
            fetchData={fetchData}
            setShowForm={setShowForm}
          />
        )} */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <UserDetailForm
                existingContact={selectedContact}
                setSelectedContact={setSelectedContact}
                fetchData={fetchData}
                onClose={onClose}
              />
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default Address;
