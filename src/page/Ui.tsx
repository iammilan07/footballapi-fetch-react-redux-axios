import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFootballData,
  selectFootballList,
  selectLoading,
  selectMappedList,
} from "../redux/football";

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
  Center,
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
      {/* <pre>{JSON.stringify(data1, null, 2)}</pre> */}
      {loading && (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      {!loading && reformedData?.length > 0 && (
        <Box alignItems="center" justifyContent="center">
          <Table
            margin="0 auto"
            maxWidth="1200px"
            padding="0 15px"
            variant="striped"
            colorScheme="pink"
          >
            <Thead className="tableRowHeader">
              <Tr background="#37003c" color="#fff" textAlign="left">
                <Th color="white" className="tableHeader">
                  Position
                </Th>
                <Th color="white" className="tableHeader">
                  Club Name
                </Th>
                <Th color="white" className="tableHeader">
                  Played
                </Th>
                <Th color="white" className="tableHeader">
                  Win
                </Th>
                <Th color="white" className="tableHeader">
                  Draw
                </Th>
                <Th color="white" className="tableHeader">
                  Loss
                </Th>
                <Th color="white" className="tableHeader">
                  Goal Scored
                </Th>
                <Th color="white" className="tableHeader">
                  Goal Concede
                </Th>
                <Th color="white" className="tableHeader">
                  GD
                </Th>
                <Th color="white" className="tableHeader">
                  Points
                </Th>
                <Th color="white" className="tableHeader">
                  Forms
                </Th>
              </Tr>
            </Thead>
            <Tbody className="body">
              {reformedData.map((data: any, index: any) => (
                <Tr
                  fontWeight="500"
                  borderBottom="1px solid #ddd"
                  // transition=".2s ease"
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
                            return (
                              <Box
                                backgroundColor="red"
                                flexShrink="0"
                                borderRadius="50%"
                                color="white"
                                padding="10px"
                                textAlign="center"
                                // textDecoration="none"
                                // display="inline-block"
                                fontSize="10px"
                                margin="4px 2px"
                                cursor="pointer"
                              >
                                L
                              </Box>
                            );
                          } else if (item === "d") {
                            return (
                              <Box
                                backgroundColor="grey"
                                flexShrink="0"
                                borderRadius="50%"
                                color="white"
                                padding="10px"
                                textAlign="center"
                                // textDecoration="none"
                                // display="inline-block"
                                fontSize="10px"
                                margin="4px 2px"
                                cursor="pointer"
                              >
                                D
                              </Box>
                            );
                          } else {
                            return (
                              <Box
                                backgroundColor="#32cd32"
                                flexShrink="0"
                                borderRadius="50%"
                                color="white"
                                padding="10px"
                                textAlign="center"
                                // textDecoration="none"
                                // display="inline-block"
                                fontSize="10px"
                                margin="4px 2px"
                                cursor="pointer"
                              >
                                w
                              </Box>
                            );
                          }
                        }
                      })}
                    </Box>
                  </Td>
                  <Modal
                    blockScrollOnMount={false}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>{newData?.name}</ModalHeader>
                      <ModalCloseButton />

                      <ModalBody>Games Played: {newData?.games}</ModalBody>
                      <ModalBody>Wins: {newData?.wins}</ModalBody>
                      <ModalBody>lose: {newData?.lose}</ModalBody>
                      <ModalBody>
                        Draw: {newData?.games - newData?.wins - newData.lose}
                      </ModalBody>
                      <ModalBody>
                        Total Goal Scored: {newData?.goalAgainst}
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      {!loading && reformedData?.length === 0 && <p>noData</p>}
    </>
  );
};

export default Ui;
