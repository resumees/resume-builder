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

interface TableData {
  company: string;
  data: any[];
  title: string;
  link: string;
  CTA: string;
}

interface SortedTableProps {
  tableData: TableData[];
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
    return tableData.map((data, index) => (
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
            variant="outline"
          >
            Go to site
          </Button>
        </Td>
      </Tr>
    ));
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption position="relative">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={handlePreviousClick} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{pageNumber}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={handleNextClick} />
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
              {tableType === Constants.TABLE_TYPE.MORTGAGE && PhoneData()}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default SortedTable;
