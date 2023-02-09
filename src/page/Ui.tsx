import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFootballData,
  selectLoading,
  selectMappedList,
} from "../redux/football";
import "../components/table.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
} from "@chakra-ui/react";

const Ui = () => {
  const [newData, setNewData] = useState({} as any);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loading = useSelector(selectLoading);
  const reformedData: any = useSelector(selectMappedList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFootballData());
  }, []);
  const handleTeam = (data: any) => {
    onOpen();
    setNewData(data);
  };

  // const handleTeam1 = (idx: any) => {
  //   onOpen();
  //   let data = reformedData[idx];
  //   console.log(data);
  //   setNewData(data);

  // };
  return (
    <>
      {/* <pre>{JSON.stringify(reformedData, null, 2)}</pre> */}
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {!loading && reformedData?.length > 0 && (
        <Table className="table" variant="striped" colorScheme="teal">
          <Thead className="tableRowHeader">
            <Tr>
              <Th className="tableHeader">Position</Th>
              <Th className="tableHeader">Club Name</Th>
              <Th className="tableHeader">Played</Th>
              <Th className="tableHeader">Win</Th>
              <Th className="tableHeader">Draw</Th>
              <Th className="tableHeader">Loss</Th>
              <Th className="tableHeader">Goal Scored</Th>
              <Th className="tableHeader">Goal Concede</Th>
              <Th className="tableHeader">GD</Th>
              <Th className="tableHeader">Points</Th>
              <Th className="tableHeader">Forms</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reformedData.map((data: any, index: any) => (
              <Tr
                key={index}
                className="tableRowIems"
                onClick={() => handleTeam(data)}
                // onClick={() => handleTeam1(index)}
              >
                <Td className="tableCell">{index + 1}</Td>
                <Td className="tableCell">{data.name}</Td>
                <Td className="tableCell">{data.games}</Td>
                <Td className="tableCell">{data.wins}</Td>
                <Td className="tableCell">
                  {data.games - data.wins - data.lose}
                </Td>
                <Td className="tableCell">{data.lose}</Td>
                <Td className="tableCell">{data.goalAgainst}</Td>
                <Td className="tableCell">{data.goalConcede}</Td>
                <Td className="tableCell">
                  {data.goalAgainst - data.goalConcede}
                </Td>
                <Td className="tableCell">
                  {data.wins * 3 + data.games - data.wins - data.lose}
                </Td>
                <Td className="tableCell">
                  <Box style={{ display: "flex", padding: "5px" }}>
                    {data.lastGames.map((item: any, index: any) => {
                      if (index < 5) {
                        if (item === "l") {
                          return <Box className="lossButton"> L</Box>;
                        } else if (item === "d") {
                          return <Box className="drawButton"> D</Box>;
                        } else {
                          return <Box className="winButton"> w</Box>;
                        }
                      }
                    })}
                  </Box>
                </Td>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{newData?.name}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>Games Played: {newData?.games}</ModalBody>
                    <ModalBody>Wins: {newData?.wins}</ModalBody>
                    <ModalBody>loose: {newData?.lose}</ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {!loading && reformedData?.length === 0 && <p>noData</p>}
    </>
  );
};

export default Ui;
