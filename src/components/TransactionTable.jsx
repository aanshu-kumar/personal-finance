/* eslint-disable react/prop-types */
import { Button, Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TransactionTable = ({ transaction }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey,setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  let filterTransaction = transaction.filter((item) => {
    if (typeFilter != "")
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        item.type == typeFilter
      );
    else return item.name.toLowerCase().includes(search.toLowerCase());
  });
  let sortedTransaction = filterTransaction.sort((a,b)=>{
    if(sortKey ===  "date"){
      return new Date(a.date) - new Date(b.date);
    }else if(sortKey === "amount"){
      return a.amount - b.amount
    }
    else{
      return 0;
    }
  })
  return (
    <>
      <div className="w-[98%] flex flex-row flex-wrap gap-1 justify-center items-center mx-auto my-5 ">
      <div className="w-[88%] py-1 my-2 border-2 border-gray-200 rounded-lg px-1 flex gap-2 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

        <input
          type="text"
          placeholder="Search by Name"
          onChange={(e) => setSearch(e.target.value)}></input></div>
        <Select
          className="w-40 py-1"
          onChange={(value) => setTypeFilter(value)}
          placeholder="Filter"
          value={typeFilter}>
          <Option value="">All</Option>
          <Option value="Income">Income</Option>
          <Option value="Expanse">Expanse</Option>
        </Select>
        <div className="w-[98%] flex justify-between my-2">
        <p className="text-xl font-semibold">My Transactions</p>
        <Radio.Group
        onChange={(e)=>setSortKey(e.target.value)}
        value={sortKey}
        >
        <Radio.Button value="">No Sort</Radio.Button>
        <Radio.Button value="date">Sort by Date</Radio.Button>
        <Radio.Button value="amount">Sort By Amount</Radio.Button>
        </Radio.Group>
        <div className="space-x-2">
          <Button>Export CSV</Button>
          <Button type="primary">Import CSV</Button>
        </div>
        </div>
      </div>
      <Table dataSource={sortedTransaction} columns={columns} />
    </>
  );
};

export default TransactionTable;
