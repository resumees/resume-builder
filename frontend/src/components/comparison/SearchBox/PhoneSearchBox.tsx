import React, { useState, useEffect } from "react";
import { Text, Input, Select, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { PhoneParams, addPhoneSearch } from "@/reduxFeatures/comparisonSlice";
import Constants from "@/constants";

const PhoneSearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const [phoneParams, setPhoneParams] = useState<PhoneParams>(
    useSelector((state: RootState) => state.global.comparison.phone)
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setPhoneParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(addPhoneSearch(phoneParams));
  }, [phoneParams]);

  return (
    <>
      <Text textAlign="left" p={1}>
        {Constants.PHONE_SEARCHBOX.PLAN_TYPE.TITLE}
      </Text>
      <Select
        name="planType"
        value={
          phoneParams.planType || Constants.PHONE_SEARCHBOX.PLAN_TYPE.TITLE
        }
        onChange={handleInputChange}
      >
        <option value={Constants.PHONE_SEARCHBOX.PLAN_TYPE.SIM_ONLY}>
          {Constants.PHONE_SEARCHBOX.PLAN_TYPE.SIM_ONLY}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.PLAN_TYPE.PHONE_INTERNET_API}>
          {Constants.PHONE_SEARCHBOX.PLAN_TYPE.PHONE_INTERNET}
        </option>
      </Select>
      <Text textAlign="left" p={1}>
        {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.TITLE}
      </Text>
      <Select
        name="monthlyData"
        value={
          phoneParams.monthlyData ||
          Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.MB_500
        }
        onChange={handleInputChange}
      >
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.MB_500}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.MB_500}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_1}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_1}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_5}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_5}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_10}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_10}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_20}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_20}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_40}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_40}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_60}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_60}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_80}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_80}
        </option>
        <option value={Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_100}>
          {Constants.PHONE_SEARCHBOX.DATA_ALLOWANCE.GB_100}
        </option>
      </Select>
    </>
  );
};

export default PhoneSearchBox;
