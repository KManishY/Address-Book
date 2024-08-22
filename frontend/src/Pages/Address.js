import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from "@chakra-ui/react";
const Address = () => {



  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Full Name </Th>
              <Th>Date of Birth (DOB)</Th>
              <Th>Contact Number </Th>
              <Th>Email Address </Th>
              <Th>Website </Th>
              <Th>Group </Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
        {/* TODO fatch data from server */}
            
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Address;
