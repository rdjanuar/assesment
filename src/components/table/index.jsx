import React, { useMemo, useEffect, useContext } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Table,
  TableContainer,
  Button,
  Flex,
  HStack,
  Spinner,
  chakra,
  Text,
  Skeleton,
  Select,
} from "@chakra-ui/react";

import { ActionContext } from "@/context/Action";

export const GlobalTable = ({
  columns,
  data,
  pageCount,
  currentPage,
  isLoading,
  gotoPage,
  nextPage,
  prevPage,
  isFetching,
  setPage,
  isError,
}) => {
  const { toggleUpdate, toggleDelete, togglePost } = useContext(ActionContext);

  const tableData = useMemo(
    () => (isLoading ? Array(10)?.fill({}) : isError ? [] : data),
    [isLoading, data, isError]
  );

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns?.map((column) => ({
            ...column,
            Cell: (
              <Skeleton
                startColor="gray.500"
                endColor="gray.700"
                height="20px"
                rounded="15px"
              />
            ),
          }))
        : columns,
    [isLoading, columns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    state: { pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
    },
    useSortBy,
    usePagination,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        // push row delete and edit
        {
          id: "actions",
          Header: "Actions",
          collapse: true,
          Cell: ({ row }) => (
            <HStack>
              <Button
                variant="secondary"
                size="small"
                onClick={() => {
                  toggleUpdate(row.original);
                }}
                type="button"
                position="relative"
              >
                Edit
              </Button>

              <Button
                variant="tertiary"
                size="medium"
                onClick={() => {
                  toggleDelete(row.original);
                }}
                type="button"
                position="relative"
              >
                Hapus
              </Button>
            </HStack>
          ),
        },
      ]);
    }
  );

  useEffect(() => {
    setPage(pageSize);
  }, [pageSize, setPage]);

  return (
    <>
      <TableContainer my={5} display="block">
        <Flex justify="space-between" align="center" py={4}>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            width="200px"
          >
            {[10, 20, 30, 40, 50].map((item) => (
              <option value={item} key={item}>
                Show Data - {item}
              </option>
            ))}
          </Select>
          <Button onClick={togglePost}>Tambah Data</Button>
        </Flex>
        <Table {...getTableProps()} variant="simple">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column) =>
                  column.Header ? (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      position={"relative"}
                      rowSpan={column.rowSpan}
                      hidden={column.displayNone}
                      fontSize={"bodySmall"}
                      width={column.collapse ? "0.0000000001%" : "1%"}
                      fontWeight={"semibold"}
                      lineHeight={"bodyLarge"}
                      key={column.id}
                    >
                      <chakra.span>
                        {column.id === "actions" ||
                          (column.id === "Actions" && isFetching && (
                            <Spinner
                              size="sm"
                              pos="absolute"
                              right={2}
                              top={4}
                            />
                          ))}
                      </chakra.span>
                      {column.render("Header")}
                    </Th>
                  ) : null
                )}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()} w="auto">
            {isError ? (
              <div>Data Not Found</div>
            ) : (
              page?.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={row.id}>
                    {row?.cells?.map((cell) => {
                      return (
                        <Td
                          width={cell.column.collapse ? "0.0000000001%" : "1%"}
                          display={cell.column.displayNone && "none"}
                          rowSpan={columns.rowSpan}
                          key={cell.column.id}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>

        <Flex
          justify="end"
          mt={10}
          maxW="1920px"
          mx="auto"
          aria-label="Table Pagination"
        >
          <HStack
            alignItems="center"
            fontSize="bodyBase"
            fontWeight="semibold"
            spacing={2}
          >
            <svg
              style={{
                width: "20px",
                height: "20px",
                color: "#1E293B",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? "0.3" : "1",
              }}
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                prevPage();
              }}
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {Array.from(Array(pageCount), (_, i) => (
              <Text
                key={i}
                color={currentPage === i + 1 ? "red" : "neutral.20"}
                px={2}
                py={1}
                cursor="pointer"
                fontSize="bodyBase"
                fontWeight="semibold"
                border={currentPage === i + 1 && "1px solid #1E293B"}
                rounded="md"
                bg={currentPage === i + 1 && "gray.200"}
                onClick={() => {
                  gotoPage(i);
                }}
              >
                {i + 1}
              </Text>
            )).slice(
              currentPage - 1 > 2 ? currentPage - 3 : 0,
              currentPage + 1 < pageCount ? currentPage + 1 : pageCount
            )}

            <chakra.svg
              width="20px"
              height="20px"
              color="#1E293B"
              cursor={currentPage === pageCount ? "not-allowed" : "pointer"}
              opacity={currentPage === pageCount ? "0.3" : "1"}
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                nextPage();
              }}
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </chakra.svg>
          </HStack>
        </Flex>
      </TableContainer>
    </>
  );
};
