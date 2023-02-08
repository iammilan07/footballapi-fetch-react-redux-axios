import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFootballData } from "../redux/football";
import "./table.css";

function Table() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFootballData());
  }, []);
  return (
    <div>
      {/* <pre>{JSON.stringify(onlyMatch, null, 2)}</pre> */}
      <table className="table">
        <thead className="tableRowHeader">
          <tr>
            <th className="tableHeader">Position</th>
            <th className="tableHeader">Club Name</th>
            <th className="tableHeader">Played</th>
            <th className="tableHeader">Win</th>
            <th className="tableHeader">Draw</th>
            <th className="tableHeader">Loss</th>
            <th className="tableHeader">GF</th>
            <th className="tableHeader">GA</th>
            <th className="tableHeader">GD</th>
            <th className="tableHeader">Points</th>
            <th className="tableHeader">Forms</th>
          </tr>
        </thead>
        <tbody>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell"></td>
          <td className="tableCell">
            <div style={{ display: "flex", padding: "5px" }}>
              <div className="winButton"> w</div>
              <div className="lossButton"> L</div>
              <div className="winButton"> w</div>
              <div className="winButton"> w</div>
              <div className="winButton"> w</div>
            </div>
          </td>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
