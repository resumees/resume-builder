import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { addPostcode } from "@/reduxFeatures/comparisonSlice";

interface SearchParams {
  postcode: string;
}

const SearchUtilities: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    postcode: ""
  });
  const [postcodeError, setPostcodeError] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      postcode: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!searchParams.postcode.trim()) {
      setPostcodeError("Postcode cannot be empty");
      return;
    }
    setPostcodeError(""); 
    dispatch(addPostcode(searchParams));
  };

  return (
    <Box display="flex" mt="2" flexDirection="column">
      <Heading as="h5" size="lg">
        Filter results
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
        <Input
          placeholder="Basic usage"
          onChange={handleInputChange}
          value={searchParams.postcode}
        />
        {postcodeError && <Text color="red">{postcodeError}</Text>}
        <Button
          colorScheme="blue"
          p={2}
          mt="3"
          onClick={handleSubmit}
          disabled={!searchParams.postcode.trim()}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchUtilities;
