import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Converter from "./components/converter";
import Navbar from "./components/navbar";
import List from "./components/list";

function App() {
  const [userAmount, setUserAmount] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [countries, setCountries] = useState({
    results: {},
  });
  const [loading, setLoading] = useState(true);

  function handleAmountChange(event) {
    const inputAmount = parseFloat(event.target.value);
    setUserAmount(inputAmount);
  }

  function handleDropdownChange(event) {
    setDropdown(event.target.value);
  }

  async function fetchCountries() {
    try {
      console.log("Fetching countries..."); // Log that the function is called
      const response = await fetch(
        "https://free.currconv.com/api/v7/countries?apiKey=bf1e1de782ddfef3f7a4"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data);

      // Make sure this log statement is executed
      console.log("Setting countries state...");

      setCountries({ results: data.results });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching countries", error);
      setLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    console.log("useEffect in App is running...");

    if (Object.keys(countries.results).length === 0) {
      console.log("Inside the if block...");
      fetchCountries()
        .then((data) => {
          setCountries({ results: data.results });
          console.log("Data received in App:", data);
        })
        .catch((error) => {
          console.error("Error in App:", error.message);
        });
      console.log("After the fetchCountries function...");
    }
  }, [countries]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/converter"
            element={
              loading || !countries.results ? (
                <p>Loading...</p>
              ) : (
                <Converter
                  userAmount={userAmount}
                  dropdown={dropdown}
                  handleAmountChange={handleAmountChange}
                  handleDropdownChange={handleDropdownChange}
                  data={countries}
                />
              )
            }
          />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
