import { useState } from "react";
import "./converter.css";

const Converter = (props) => {
  const { userAmount, rates, updateUserAmount } = props;

  const [convertedAmount, setConvertedAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);

  const currencyOptions = Object.keys(rates).map((currency) => (
    <option key={currency} value={currency}>
      {currency}
    </option>
  ));

  function convertCurrency() {
    if (fromCurrency && toCurrency) {
      const exchangeRateFrom = rates[fromCurrency];
      const exchangeRateTo = rates[toCurrency];

      if (exchangeRateFrom !== undefined && exchangeRateTo !== undefined) {
        const result = (userAmount * exchangeRateTo) / exchangeRateFrom;
        const formattedResult = result.toFixed(4);
        setConvertedAmount(formattedResult);
        setButtonClicked(true);
      } else {
        setConvertedAmount("Invalid");
      }
    } else {
      setConvertedAmount("Select currencies");
    }
  }

  function handleInputChange(event) {
    const inputAmount = parseFloat(event.target.value);
    updateUserAmount(isNaN(inputAmount) ? "" : inputAmount);
  }

  return (
    <main className="container">
      <h1 className="currency-title">Currency Converter</h1>
      <div className="currency-border-box">
        <div className="main-items">
          <div className="dropdown-container">
            <form>
              <input
                className="user-amount"
                type="number"
                placeholder="Enter Amount"
                value={userAmount}
                onChange={handleInputChange}
              ></input>
            </form>
            <h5>From</h5>
            <select
              className="from-dropdown"
              value={fromCurrency}
              onChange={(event) => setFromCurrency(event.target.value)}
            >
              <option value="">Select a currency</option>
              {currencyOptions}
            </select>
            <h5>To</h5>
            <select
              className="to-dropdown"
              value={toCurrency}
              onChange={(event) => setToCurrency(event.target.value)}
            >
              <option value="">Select a currency</option>
              {currencyOptions}
            </select>
            <div className="display-currency"></div>
            <button className="convert-button btn" onClick={convertCurrency}>
              Convert
            </button>
            <div>
              {buttonClicked && (
                <p>
                  Converted Amount: {convertedAmount} {toCurrency}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Converter;
