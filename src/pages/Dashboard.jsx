/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import AddExpense from "../components/Morals/AddExpense";
import AddIncome from "../components/Morals/AddIncome";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isIncomeVisible, setIsIncomeVisible] = useState(false);
  const [isExpanseVisible, setIsExpanseVisible] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expanse, setExpanse] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      fetchTransition();
    }
  }, [user]);

  useEffect(() => {
    calculateSum();
  }, [transaction]);

  async function fetchTransition() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `user/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransaction(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transactions Fetched!!");
    }
    setLoading(false);
  }

  const onFinish = (value, type) => {
    const newTransaction = {
      type: type,
      date: moment(value.Date.$d).format("YYYY-MM-DD"),
      amount: parseFloat(value.Amount),
      tag: value.Tag,
      name: value.Name,
    };
    // console.log(value.Date)
    addTransaction(newTransaction);
  };
  async function addTransaction(newtransaction) {
    try {
      const docRef = await addDoc(
        collection(db, `user/${user.uid}/transactions`),
        newtransaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("transaction Added!");
      let newArray = transaction;
      newArray.push(newtransaction);
      setTransaction(newArray);
      calculateSum();
    } catch (e) {
      console.log("Error while adding document:", e.message);
    }
  }

  function calculateSum() {
    let Income = 0;
    let Expanse = 0;
    transaction.forEach((doc) => {
      if (doc.type == "Income") {
        Income += doc.amount;
      } else {
        Expanse += doc.amount;
      }
    });
    setBalance(Income - Expanse);
    setIncome(Income);
    setExpanse(Expanse);
  }

  return (
    <>
      {loading ? (
        <div className=" w-full mt-40 flex justify-center items-center h-[60vh] gap-4">
        
          <div className="loader"></div>
          <p>Loading your Data...</p>
        </div>
      ) : (
        <div>
          <Cards
            income={income}
            expanse={expanse}
            balance={balance}
            setIsExpanseVisible={setIsExpanseVisible}
            setIsIncomeVisible={setIsIncomeVisible}
          />
          <AddIncome
            isIncomeVisible={isIncomeVisible}
            setIsIncomeVisible={setIsIncomeVisible}
            onFinish={onFinish}
          />
          <AddExpense
            isExpanseVisible={isExpanseVisible}
            setIsExpanseVisible={setIsExpanseVisible}
            onFinish={onFinish}
          />
          <TransactionTable transaction={transaction}/>
        </div>
      )}
    </>
  );
};

export default Dashboard;
