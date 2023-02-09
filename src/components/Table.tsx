import {
  Center,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useTable } from "react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFootballData, selectMappedList } from "../redux/football";

const tableColumn: any = [
  {
    Header: "position",
    accessor: "id",
  },
  {
    Header: "Club Name",
    accessor: "name",
  },
  {
    Header: "Played",
    accessor: "games",
  },
  {
    Header: "Win",
    accessor: "wins",
  },
  {
    Header: "Draw",
    accessor: "category",
  },
  {
    Header: "Loss",
    accessor: "image",
  },
];
const Stable = () => {
  const [products, setProducts] = useState([]);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => products, [products]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumn,
      data: data,
    });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFootballData());
  }, []);
  //   if (products.length === 0)
  //     return (
  //       <Center>
  //         <Spinner />
  //       </Center>
  //     );
  return (
    <>
      <Heading>React Table </Heading>
      <Table variant="striped" colorScheme="skyblue" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default Stable;
