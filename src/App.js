import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Converter from "./components/converter";
import Navbar from "./components/navbar";
import List from "./components/list";
import Footer from "./components/footer";

function App() {
  const [userAmount, setUserAmount] = useState("");
  const [rates, setRates] = useState({});

  const updateUserAmount = (newAmount) => {
    setUserAmount(newAmount);
  };

  function handleAmountChange(event) {
    const inputAmount = parseFloat(event.target.value);
    setUserAmount(inputAmount);
  }

  async function fetchCurrencies() {
    try {
      const respone = await fetch(
        "https://openexchangerates.org/api/latest.json?app_id=b261055f697d4b3dbc3f69d76739660a"
      );
      if (!respone.ok) {
        throw new Error(`Error! Status: ${respone.status}`);
      }

      const data = await respone.json();
      console.log("Data received in fetchCurrencies", data);

      setRates(data.rates);
    } catch (error) {
      console.log("Error fetching currencies", error);

      throw error;
    }
  }

  useEffect(() => {
    fetchCurrencies().catch((error) => {
      console.log("Error fetching currencies", error);
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/converter"
            element={
              <Converter
                userAmount={userAmount}
                handleAmountChange={handleAmountChange}
                rates={rates}
                updateUserAmount={updateUserAmount}
              />
            }
          />
          <Route
            path="/list"
            element={
              <List
                rates={rates}
                userAmount={userAmount}
                updateUserAmount={updateUserAmount}
              />
            }
          />
          <Route
            path="*"
            element={
              <Converter
                userAmount={userAmount}
                handleAmountChange={handleAmountChange}
                rates={rates}
                updateUserAmount={updateUserAmount}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
