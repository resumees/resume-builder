import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Text,
  Box,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useLocation } from "react-router-dom";
import Constants from "@/constants";
import { StyledTd, StyledTr, StyledTh } from "./SortedTable.styles";

interface InternetData {
  company: string;
  information: string;
  stats: string;
  monthlyCost: string;
  CTA: string;
}

interface PhoneData {
  company: string;
  data: any[];
  title: string;
  link: string;
  CTA: string;
}

interface MortgageData {
  company: string;
  information: string;
  comparisonRate: string;
  interestRate: string;
  monthlyRepayment: string;
  CTA: string;
}

interface ElectricityData {
  company: string;
  information: string;
  referencePrice: string;
  estimatedCost: string;
  CTA: string;
}

interface GasData {
  company: string;
  information: string;
  supplyCharge: string;
  usageCharge: string;
  totalCost: string;
  CTA: string;
}

interface SortedTableProps {
  tableData: any;
  tablePgSize: number;
  tableDataLength: number;
  tableType: string;
  tableHeaders: string[];
}

const SortedTable: React.FC<SortedTableProps> = ({
  tableData,
  tablePgSize,
  tableDataLength,
  tableType,
  tableHeaders,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNumber = parseInt(params.get("pageNumber") || "1", 10);

  const handleNextClick = () => {
    const params = new URLSearchParams({ pageNumber: String(pageNumber + 1) });
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handlePreviousClick = () => {
    if (pageNumber > 1) {
      const params = new URLSearchParams({
        pageNumber: String(pageNumber - 1),
      });
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  // Initialize state to keep track of checked rows
  const [checkedRows, setCheckedRows] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Handle checkbox change
  const handleCheckboxChange = (index: number) => {
    setCheckedRows(() => ({
      [index]: true,
    }));
  };

  const InternetData = () => {
    return tableData.map((data: InternetData, index: number) => (
      <Tr key={index}>
        <StyledTd></StyledTd>
        <StyledTd>Company Logo</StyledTd>
        <StyledTd>Title</StyledTd>
        <StyledTd>Data / Speed Stats</StyledTd>
        <StyledTd>Cost</StyledTd>
        <StyledTd>
          <Button
            as="a"
            colorScheme="whatsapp"
            variant={data?.company != null ? "outline" : "hidden"}
          >
            "Go to site"
          </Button>
        </StyledTd>
      </Tr>
    ));
  };

  const PhoneData = () => {
    return tableData.map((data: PhoneData, index: number) => (
      <Tr key={index}>
        <StyledTd></StyledTd>
        <StyledTd>
          <img src={data?.company} alt="Company Logo" />
        </StyledTd>
        <StyledTd>{data?.title}</StyledTd>
        <StyledTd>{data?.data[3]?.value}</StyledTd>
        <StyledTd>{data?.data[4]?.value}</StyledTd>
        <StyledTd>
          <Button
            as="a"
            href={data?.link}
            target="_blank"
            colorScheme="whatsapp"
            variant={data?.link != null ? "outline" : "hidden"}
          >
            {data?.link != null ? "Go to site" : ""}
          </Button>
        </StyledTd>
      </Tr>
    ));
  };

  const MortgageData = () => {
    return tableData.map((data: MortgageData, index: number) => (
      <StyledTr
        className={`cursor-pointer ${
          checkedRows[index] ? "bg-green-100" : "hover:bg-green-50"
        }`}
        onClick={() => handleCheckboxChange(index)}
        key={index}
        bg={checkedRows[index] ? "green.100" : "transparent"}
      >
        <StyledTd>
          <Flex justify="center" align="center">
            <Checkbox
              onChange={() => handleCheckboxChange(index)}
              isChecked={checkedRows[index]}
              colorScheme="green"
            />
          </Flex>
        </StyledTd>
        <StyledTd>
          <img src={data?.company} alt="Company Logo" />
        </StyledTd>
        <StyledTd className="whitespace-normal sm:whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap xl:whitespace-normal">
          {data?.information}
        </StyledTd>
        <StyledTd>{data?.comparisonRate}</StyledTd>
        <StyledTd>{data?.interestRate}</StyledTd>
        <StyledTd>{data?.monthlyRepayment}</StyledTd>
        <StyledTd>
          <Button
            as="a"
            href={data?.CTA}
            target="_blank"
            colorScheme="whatsapp"
            variant={data?.CTA != null ? "outline" : "hidden"}
          >
            {data?.CTA != null ? "Go to site" : ""}
          </Button>
        </StyledTd>
      </StyledTr>
    ));
  };

  const ElectricityData = () => {
    return tableData.map((data: ElectricityData, index: number) => (
      <StyledTr key={index}>
        <StyledTd></StyledTd>
        <StyledTd>
          <img src={data?.company} alt="Company Logo" />
        </StyledTd>
        <StyledTd className="whitespace-normal sm:whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap xl:whitespace-normal">
          {data?.information}
        </StyledTd>
        <StyledTd>{data?.referencePrice}</StyledTd>
        <StyledTd>{data?.estimatedCost}</StyledTd>
        <StyledTd>
          <Button
            as="a"
            href={data?.CTA}
            target="_blank"
            colorScheme="whatsapp"
            variant={data?.CTA != null ? "outline" : "hidden"}
          >
            {data?.CTA != null ? "Go to site" : ""}
          </Button>
        </StyledTd>
      </StyledTr>
    ));
  };

  const GasData = () => {
    return tableData.map((data: GasData, index: number) => (
      <Tr key={index}>
        <StyledTd></StyledTd>
        <StyledTd>
          <img src={data?.company} alt="Company Logo" />
        </StyledTd>
        <StyledTd className="whitespace-normal sm:whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap xl:whitespace-normal">
          {data?.information}
        </StyledTd>
        <StyledTd>{data?.supplyCharge}</StyledTd>
        <StyledTd>{data?.usageCharge}</StyledTd>
        <StyledTd>{data?.totalCost}</StyledTd>
        <StyledTd>
          <Button
            as="a"
            href={data?.CTA}
            target="_blank"
            colorScheme="whatsapp"
            variant={data?.CTA != null ? "outline" : "hidden"}
          >
            {data?.CTA != null ? "Go to site" : ""}
          </Button>
        </StyledTd>
      </Tr>
    ));
  };

  return (
    <Box display="flex" overflowX="auto">
      <TableContainer width="100%">
        <Table width="100%"variant="simple">
          <TableCaption position="relative">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePreviousClick}
                    page={pageNumber}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{pageNumber}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextClick}
                    page={pageNumber}
                    dataLength={tableDataLength}
                    pageSize={tablePgSize}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <Box position="absolute" right={0} bottom={0}>
              <Text>
                Showing {pageNumber * tablePgSize} of {tableDataLength} results
              </Text>
            </Box>
          </TableCaption>
          <Thead>
            <StyledTr>
              {tableHeaders.map((header, index) => (
                <StyledTh key={index}>
                  {header}
                </StyledTh>
              ))}
            </StyledTr>
          </Thead>
          {tableData && tableData.length > 0 && (
            <Tbody>
              {tableType === Constants.TABLE_TYPE.PHONE && <PhoneData />}
              {tableType === Constants.TABLE_TYPE.MORTGAGE && <MortgageData />}
              {tableType === Constants.TABLE_TYPE.ELECTRICITY && <ElectricityData />}
              {tableType === Constants.TABLE_TYPE.GAS && <GasData />}
              {tableType === Constants.TABLE_TYPE.INTERNET && <InternetData />}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SortedTable;
