/* eslint-disable react/prop-types */
import { Card, Row } from "antd";
import "./Cards.css";
const Cards = ({
  income,
  expanse,
  balance,
  setIsExpanseVisible,
  setIsIncomeVisible,
}) => {
  return (
    <div>
      <Row className="flex flex-row justify-evenly w-[96%] mx-auto mt-5">
        <Card
          className="w-[30%] shadow-md shadow-gray-200"
          title={"Current Balance"}>
          <p className="py-2">${balance}</p>
          <button className=" bg-blue-500 py-2 hover:bg-blue-400 w-full text-white cursor-pointer">
            Reset Balance
          </button>
        </Card>
        <Card
          className="w-[30%] shadow-md shadow-gray-200"
          title={"Total Income"}>
          <p className="py-2">${income}</p>
          <button
            className=" bg-blue-500 py-2 hover:bg-blue-400 w-full text-white cursor-pointer"
            onClick={() => setIsIncomeVisible(true)}>
            Add Income
          </button>
        </Card>
        <Card
          className="w-[30%] shadow-md shadow-gray-200"
          title={"Total Expanse"}>
          <p className="py-2">${expanse}</p>
          <button
            className=" bg-blue-500 py-2 hover:bg-blue-400 w-full text-white cursor-pointer"
            onClick={() => setIsExpanseVisible(true)}>
            Add Expanse
          </button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
