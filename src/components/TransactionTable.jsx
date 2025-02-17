/* eslint-disable react/prop-types */
import { Button, Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import { parse, unparse } from "papaparse";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const TransactionTable = ({ transaction,fetchTransition,addTransaction }) => {
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
  function importCsv(event) {
    event.preventDefault();
    
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected!");
      return;
    }
  
    try {
      parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          if (results.errors.length > 0) {
            toast.error("Error parsing CSV file!");
            console.error(results.errors);
            return;
          }
  
          // Transform CSV rows into transaction objects
          const newTransactions = results.data.map((row) => ({
            name: row.Name || "",
            amount: parseFloat(row.Amount) || 0,
            type: row.Type || "Income", // Default to "Income" if empty
            tag: row.Tag || "Other",
            date: row.Date || new Date().toISOString().split("T")[0], // Default to today
          }));
  
          for (const transaction of newTransactions) {
            await addTransaction(transaction, true);
          }
  
          toast.success("All transactions added successfully!");
          fetchTransition();
          
          // Reset file input (important for re-uploading)
          event.target.value = "";
        },
      });
    } catch (error) {
      toast.error("Failed to import CSV: " + error.message);
    }
  }
  
  function exportCsv(){
    // console.log(transaction)
    let csv = unparse({
      fields: ["Name","Type","Tag","Date","Amount"],
      data:transaction.map((item)=>{
        let arr =[item.name,item.type,item.tag,item.date,item.amount]
        return arr
      })
    })
    const blob = new Blob([csv],{type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
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
          <Button onClick={exportCsv}>Export CSV</Button>
          <label htmlFor="file-csv" className=" text-white bg-blue-500 p-1.5 rounded-md duration-150 hover:border-blue-500 border-1 hover:text-blue-500 hover:bg-white">
            Import CSV
          </label>
          <input id="file-csv" type="file" accept=".csv" required onChange={importCsv} style={{display:"none"}}></input>
        </div>
        </div>
      </div>
      <Table dataSource={sortedTransaction} columns={columns} />
    </>
  );
};

export default TransactionTable;
