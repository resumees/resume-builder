import React, { useState } from "react";
import { Text, Input, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  addPostcode,
  searchBoxParams,
} from "@/reduxFeatures/comparisonSlice";

const UtilitySearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const [postcode, setPostcode] = useState<string>("");
  const [postcodeError, setPostcodeError] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostcode(event.target.value);
  };

  const handleSubmit = () => {
    if (!postcode.trim()) {
      setPostcodeError("Postcode cannot be empty");
      return;
    }
    setPostcodeError("");
    dispatch(addPostcode({ postcode }));
    dispatch(searchBoxParams(true));
  };

  return (
    <>
      <Text textAlign="left" p={1}>
        Postcode
      </Text>
      <Input
        placeholder="Enter your postcode"
        onChange={handleInputChange}
        value={postcode}
      />
      {postcodeError && <Text color="red">{postcodeError}</Text>}
      <Button
        colorScheme="blue"
        p={2}
        mt="3"
        onClick={handleSubmit}
        disabled={!postcode.trim()}
      >
        Search
      </Button>
    </>
  );
};

export default UtilitySearchBox;
