import React, { useState } from 'react'
import Cards from "../components/Cards"
import AddExpense from '../components/Morals/AddExpense'
import AddIncome from '../components/Morals/AddIncome'
const Dashboard = () => {
  const [isIncomeVisible, setIsIncomeVisible] = useState(false);
  const [isExpanseVisible, setIsExpanseVisible] = useState(false);
  const onFinish=(value,type)=>{
    console.log(value,type)
  }
  return (
    <div>
      <Cards setIsExpanseVisible={setIsExpanseVisible} setIsIncomeVisible={setIsIncomeVisible} />
      <AddIncome isIncomeVisible={isIncomeVisible} setIsIncomeVisible={setIsIncomeVisible} onFinish={onFinish}/>
      <AddExpense isExpanseVisible={isExpanseVisible} setIsExpanseVisible={setIsExpanseVisible} onFinish={onFinish}/>
    </div>
  )
}

export default Dashboard
