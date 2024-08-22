import React, { useState, useEffect } from "react";
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
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function UserDetailForm({ existingContact,setSelectedContact,fetchData,onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowClick = () => setShowPassword(!showPassword);

  // Initialize state with either existing contact details or empty fields
  const [contactDetail, setContactDetail] = useState({
    name: "",
    email: "",
    dob: "",
    mobile: "",
    website: "",
    group: "",
    ...existingContact, // Merge existingContact into initial state if provided
  });

  useEffect(() => {
    if (existingContact) {
      setContactDetail(existingContact);
    }
  }, [existingContact]);

  const handleChange = (e) => {
    setContactDetail({
      ...contactDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found in local storage");
      }

      if (existingContact) {
        // Edit mode: update existing contact
        const response = await axios.put(
          `https://address-book-cumk.onrender.com/dashboard/update/${existingContact._id}`,
          contactDetail,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("Update Response:", response.data);
        setSelectedContact(null);
      } else {
        // Add mode: create new contact
        const response = await axios.post(
          "https://address-book-cumk.onrender.com/dashboard/create",
          contactDetail,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("Create Response:", response.data);
      }

      // Navigate to another page or give feedback to the patchuser
      setContactDetail(
        { name: "",
        email: "",
        dob: "",
        mobile: "",
        website: "",
        group: ""})
        fetchData();
        onClose(false);
      // navigate("/logbook"); // Update with the desired route
    } catch (error) {
      console.error(
        "Error during create/update:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Box minW={{ base: "100%", md: "418px" }}>
    <form >
      <Stack spacing={4} p="1rem" boxShadow="md">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={contactDetail.name}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={contactDetail.email}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <InputGroup>
            <Input
              type="date"
              name="dob"
              value={contactDetail.dob}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Website</FormLabel>
          <InputGroup>
            <Input
              placeholder="Website"
              name="website"
              value={contactDetail.website}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Phone Number"
              name="mobile"
              value={contactDetail.mobile}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Group</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Group"
              name="group"
              value={contactDetail.group}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
        <Button
          borderRadius={0}
          variant="solid"
          width="full"
          onClick={handleSubmit}
        >
          {existingContact ? "Update" : "Add"}
        </Button>
      </Stack>
    </form>
  </Box>
  );
}
