import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Heading, Text, Input, Button } from "@chakra-ui/react";
import { addPostcode } from "@/reduxFeatures/comparisonSlice";

const SearchUtilities: React.FC = () => {
  const dispatch = useDispatch();
  const [postCode, setPostCode] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostCode(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(addPostcode(postCode));
  };
  
  return (
    <Box display="flex" mt="2" flexDirection="column">
      <Heading as="h5" size="lg">
        Search results
      </Heading>
      <Box
        bg="white"
        maxW="full"
        p={4}
        borderRadius="md"
        mt={4}
        border="1px solid #ccc"
      >
        <Text textAlign="left" p={1}>
          Postcode
        </Text>
        <Input placeholder="Basic usage" onChange={handleInputChange} />
        <Button colorScheme="blue" p={2} mt="3" onClick={handleSubmit}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchUtilities;
