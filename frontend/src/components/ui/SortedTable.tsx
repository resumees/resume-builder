import React from "react";
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

interface UtilityData {
  company: string;
  information: string;
  referencePrice: string;
  estimatedCost: string;
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

  const PhoneData = () => {
    return tableData.map((data: PhoneData, index: number) => (
      <Tr key={index}>
        <Td>
          <img src={data?.company} alt="Company Logo" />
        </Td>
        <Td>{data?.title}</Td>
        <Td>{data?.data[3]?.value}</Td>
        <Td>{data?.data[4]?.value}</Td>
        <Td>
          <Button
            as="a"
            href={data?.link}
            target="_blank"
            colorScheme="whatsapp"
            variant={data?.link != null ? "outline" : "hidden"}
          >
            {data?.link != null ? "Go to site" : ""}
          </Button>
        </Td>
      </Tr>
    ));
  };

  const MortgageData = () => {
    return tableData.map((data: MortgageData, index: number) => (
      <Tr key={index}>
        <Td>
          <img src={data?.company} alt="Company Logo" />
        </Td>
        <Td className="whitespace-normal sm:whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap xl:whitespace-normal">{data?.information}</Td>
        <Td>{data?.comparisonRate}</Td>
        <Td>{data?.interestRate}</Td>
        <Td>{data?.monthlyRepayment}</Td>
        <Td>
          <Button
            as="a"
            href={data?.CTA}
            target="_blank"
            colorScheme="whatsapp"
            variant={data?.CTA != null ? "outline" : "hidden"}
          >
            {data?.CTA != null ? "Go to site" : ""}
          </Button>
        </Td>
      </Tr>
    ));
  }

  const UtilitiesData = () => {
    return tableData.map((data: UtilityData, index: number) => (
      <Tr key={index}>
        <Td>
          <img src={data?.company} alt="Company Logo" />
        </Td>
        <Td className="whitespace-normal sm:whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap xl:whitespace-normal">{data?.information}</Td>
        <Td>{data?.referencePrice}</Td>
        <Td>{data?.estimatedCost}</Td>
        <Td>
          <Button
            as="a"
            href={data?.CTA}
            target="_blank"
            colorScheme="whatsapp"
            variant={data?.CTA != null ? "outline" : "hidden"}
          >
            {data?.CTA != null ? "Go to site" : ""}
          </Button>
        </Td>
      </Tr>
    ));
  }

  return (
    <Box display="flex" width="100%" overflowX="auto">
      <TableContainer maxWidth="100%">
        <Table variant="simple">
          <TableCaption position="relative">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={handlePreviousClick} page={pageNumber}/>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{pageNumber}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={handleNextClick} page={pageNumber} dataLength={tableDataLength} pageSize={tablePgSize}/>
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
            <Tr>
              {tableHeaders.map((header, index) => (
                <Th key={index} style={{ textAlign: "left" }}>
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          {tableData && tableData.length > 0 && (
            <Tbody>
              {tableType === Constants.TABLE_TYPE.PHONE && PhoneData()}
              {tableType === Constants.TABLE_TYPE.MORTGAGE && MortgageData()}
              {tableType === Constants.TABLE_TYPE.UTILITIES && UtilitiesData()}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SortedTable;
