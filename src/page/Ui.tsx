import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFootballData, selectMappedList } from "../redux/football";
import "../components/table.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { openModal } from "../redux/modal/modalSlice";
const Ui = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data5 = useSelector(selectMappedList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFootballData());
  }, []);

  const handleTeam = (data: any) => {
    dispatch(openModal(data));
    dispatch(fetchFootballData());
  };
  return (
    <>
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
            {/* <th className="tableHeader">Details</th> */}
          </tr>
        </thead>
        <tbody>
          {data5.map((data: any, index: any) => (
            <tr key={index} className="tableRowIems" onClick={onOpen}>
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
                      if (item === 0) {
                        return <div className="lossButton"> L</div>;
                      } else if (item === 1) {
                        return <div className="drawButton"> D</div>;
                      } else {
                        return <div className="winButton"> w</div>;
                      }
                    }
                  })}
                </div>
              </td>
              <td className="tableCell">
                {/* <Button onClick={onOpen}>See Details</Button> */}
                <Modal
                  closeOnOverlayClick={false}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{data.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Text>Position: {index + 1}</Text>
                      <Text>Played Games: {data.games}</Text>
                      <Text>Won: {data.wins}</Text>
                      <Text>Draw: {data.games - data.wins - data.lose}</Text>
                      <Text>Lost: {data.lose}</Text>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3}>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(arrayinfo, null, 2)}</pre> */}
    </>
  );
};

export default Ui;
