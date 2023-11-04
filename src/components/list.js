import React, { useState } from "react";
import "./list.css";

const List = ({ rates, userAmount, updateUserAmount }) => {
  const currencies = Object.keys(rates);
  const [baseCurrency, setBaseCurrency] = useState("USD");

  const handleBaseCurrencyChange = (event) => {
    const newBaseCurrency = event.target.value;
    setBaseCurrency(newBaseCurrency);
  };

  function handleInputChange(event) {
    const inputAmount = parseFloat(event.target.value);
    updateUserAmount(isNaN(inputAmount) ? "" : inputAmount);
  }

  return (
    <div className="list-container">
      <h2>Exchange Rates</h2>
      <div>
        <label htmlFor="baseCurrency">Base Currency: </label>
        <select
          id="baseCurrency"
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <form>
        <input
          className="user-amount"
          type="number"
          placeholder="Enter Amount"
          value={userAmount}
          onChange={handleInputChange}
        ></input>
      </form>
      <ul>
        {currencies.map((currency) => (
          <li key={currency}>
            <strong>{currency}:</strong>{" "}
            {userAmount
              ? (userAmount * (rates[currency] / rates[baseCurrency])).toFixed(
                  4
                )
              : "Please enter an amount"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
