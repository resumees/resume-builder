import React, { useState, useEffect } from "react";
import { Text, Select, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Constants from "@/constants";

const InternetSearchBox: React.FC = () => {
    return (
        <>
        <Text textAlign="left" p={1}>
            Internet Type
        </Text>
        <Select
        name="internetType">
            <option>NBN</option>
            <option>Wireless Broadband</option>
        </Select>
        <Text textAlign="left" p={1}>
            Internet Speed
        </Text>
        <Select
        name="speedTier">
            <option>Basic plans (or higher)</option>
            <option>Standard plans (or higher)</option>
            <option>Fast plans (or higher)</option>
            <option>Superfast plans (or higher)</option>
            <option>Ultrafast plans (or higher)</option>
        </Select>
        <Button
        colorScheme="blue"
        p={2}
        mt="3"
        >
            Search
        </Button>
        </>
    )
}

export default InternetSearchBox