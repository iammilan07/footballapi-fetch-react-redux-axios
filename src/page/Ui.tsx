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
        <table className="table">
          <thead className="tableRowHeader">
            <tr>
              <th className="tableHeader">Position</th>
              <th className="tableHeader">Club Name</th>
              <th className="tableHeader">Played</th>
              <th className="tableHeader">Win</th>
              <th className="tableHeader">Draw</th>
              <th className="tableHeader">Loss</th>
              <th className="tableHeader">Goal Scored</th>
              <th className="tableHeader">Goal Concede</th>
              <th className="tableHeader">GD</th>
              <th className="tableHeader">Points</th>
              <th className="tableHeader">Forms</th>
            </tr>
          </thead>
          <tbody>
            {reformedData.map((data: any, index: any) => (
              <tr
                key={index}
                className="tableRowIems"
                onClick={() => handleTeam(data)}
                // onClick={() => handleTeam1(index)}
              >
                <td className="tableCell">{index + 1}</td>
                <td className="tableCell">{data.name}</td>
                <td className="tableCell">{data.games}</td>
                <td className="tableCell">{data.wins}</td>
                <td className="tableCell">
                  {data.games - data.wins - data.lose}
                </td>
                <td className="tableCell">{data.lose}</td>
                <td className="tableCell">{data.goala}</td>
                <td className="tableCell">{data.goalc}</td>
                <td className="tableCell">{data.goala - data.goalc}</td>
                <td className="tableCell">
                  {data.wins * 3 + data.games - data.wins - data.lose}
                </td>
                <td className="tableCell">
                  <div style={{ display: "flex", padding: "5px" }}>
                    {data.lastgames.map((item: any, index: any) => {
                      if (index < 5) {
                        if (item === "l") {
                          return <div className="lossButton"> L</div>;
                        } else if (item === "d") {
                          return <div className="drawButton"> D</div>;
                        } else {
                          return <div className="winButton"> w</div>;
                        }
                      }
                    })}
                  </div>
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && reformedData?.length === 0 && <p>noData</p>}
    </>
  );
};

export default Ui;
