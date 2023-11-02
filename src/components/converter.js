const Converter = (props) => {
  const {
    userAmount,
    handleAmountChange,
    handleDropdownChange,
    data,
    dropdown,
  } = props;

  const currencyOptions = data?.results
    ? Object.keys(data.results).map((currencyCode) => (
        <option key={currencyCode} value={currencyCode}>
          {data.results[currencyCode].currencyName}
        </option>
      ))
    : null;

  console.log("Data in Converter:", data);

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
                onChange={handleAmountChange}
              ></input>
            </form>
            <h5>From</h5>
            <select
              className="from-dropdown"
              value={dropdown}
              onChange={handleDropdownChange}
            >
              <option value="">Select a currency</option>
              {currencyOptions}
            </select>
            <h5>To</h5>
            <select>
              <option value="">Select a currency</option>
              {currencyOptions}
            </select>
            <div className="display-currency"></div>
            <button className="convert-button btn">Convert</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Converter;
