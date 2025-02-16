import { Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TransactionTable = ({ transaction }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
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
  return (
    <>
      <div className="w-[98%] flex flex-row gap-2 justify-between mx-auto">
        <input
        className="w-[90%] border-2 border-gray-200"
          type="text"
          placeholder="Search by Name"
          onChange={(e) => setSearch(e.target.value)}></input>
        <Select
          className="w-40"
          onChange={(value) => setTypeFilter(value)}
          placeholder="Filter"
          value={typeFilter}>
          <Option value="">All</Option>
          <Option value="Income">Income</Option>
          <Option value="Expanse">Expanse</Option>
        </Select>
      </div>
      <Table dataSource={filterTransaction} columns={columns} />
    </>
  );
};

export default TransactionTable;
