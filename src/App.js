import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const initialExpenses = [
  { id: uuidv4(), charge: "rent", amount: 1600 },
  { id: uuidv4(), charge: "car payment", amount: 400 },
  { id: uuidv4(), charge: "credit card bill", amount: 1200 },
];

function App() {
  // ********* State Value **********
  // All expenses, Add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // Single expense
  const [charge, setCharge] = useState("");
  // Single amount
  const [amount, setAmount] = useState("");
  // Alert
  const [alert, setAlert] = useState({ showAlert: false });
  // Edit
  const [edit, setEdit] = useState(false);
  // Edit Item
  const [id, setId] = useState(0);
  // ********* End of State Value **********

  // ********* Functionality **********
  // Handle Charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // Handle Amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  // Handle Alert
  const handleAlert = ({ type, text }) => {
    setAlert({ showAlert: true, type, text });
    setTimeout(() => {
      setAlert({ showAlert: false });
    }, 5000);
  };
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((expense) => {
          return expense.id === id ? { ...expense, charge, amount } : expense;
        });
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const createExpense = { id: uuidv4(), charge, amount };
        setExpenses([createExpense, ...expenses]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero`,
      });
    }
  };
  // Clear All Items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  // Handle Delete
  const handleDelete = (id) => {
    const filterItems = expenses.filter((expense) => expense.id !== id);
    setExpenses(filterItems);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // Handle Edit
  const handleEdit = (id) => {
    let editItem = expenses.find((expense) => expense.id === id);
    let { charge, amount } = editItem;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  // ********* End of Functionality **********

  return (
    <>
      {alert.showAlert && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
