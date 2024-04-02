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
import { useNavigate, useLocation } from 'react-router-dom';


interface TableData {
  company: string;
  data: any[];
  link: string;
}

interface SortedTableProps {
  tableData: TableData[]; // Array of TableData objects
}

const SortedTable: React.FC<SortedTableProps> = ({ tableData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNumber = parseInt(params.get('pageNumber') || '1', 10);

  const handleNextClick = () => {
    const params = new URLSearchParams({ pageNumber: String(pageNumber + 1) });
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handlePreviousClick = () => {
    if (pageNumber > 1) {
      const params = new URLSearchParams({ pageNumber: String(pageNumber - 1) });
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={handlePreviousClick}/>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{pageNumber}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext  onClick={handleNextClick}/>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Company</Th>
              <Th>Information</Th>
              <Th isNumeric>Data</Th>
              <Th isNumeric>Cost</Th>
              <Th>CTA</Th>
            </Tr>
          </Thead>
          {tableData && tableData.length > 0 && (
            <Tbody>
              {tableData.map((data, index) => (
                <Tr key={index}>
                  <Td>
                    <img src={data?.company} alt="Company Logo" />
                  </Td>
                  <Td>test</Td>
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
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default SortedTable;

