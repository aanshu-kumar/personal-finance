/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Line, Pie } from "@ant-design/charts";

const Chart = ({ sortedTransition }) => {
  const chartRef = useRef(null);
  const PieRef = useRef(null);

  const data = sortedTransition.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  let spendingData =
    sortedTransition.length !== 0
      ? sortedTransition.filter((item) => item.type === "Expanse")
      : [];

  console.log("spendingData", spendingData);

  const finalSpending =
    spendingData.length !== 0
      ? spendingData.reduce((acc, obj) => {
          let key = obj.tag;
          if (!acc[key]) {
            acc[key] = { tag: obj.tag, amount: obj.amount };
          } else {
            acc[key].amount += obj.amount;
          }
          return acc;
        }, {}) // Initialize with an empty object
      : {};

  console.log("finalSpending", finalSpending);

  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: false,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: Object.values(finalSpending), // Convert object to an array
    width: 500,
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div className="w-[95%] mx-auto my-10 flex gap-10">
      <div className="w-2/3 rounded-lg p-2 shadow-md shadow-gray-300">
        <h2 className="my-1 font-bold">Your Analytics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => {
            chartRef.current = chartInstance;
          }}
        />
      </div>
      <div className="w-1/3 rounded-lg p-2 shadow-md shadow-gray-300">
        <h2 className="my-1 font-bold">Your Spends</h2>
        {spendingData.length === 0 ? (
          <p className="text-blue-300 font-bold text-5xl py-5">
            It Seems You haven&apos;t Spent anything.
          </p>
        ) : (
          <Pie
            {...spendingConfig}
            onReady={(chartInstance) => {
              PieRef.current = chartInstance;
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
