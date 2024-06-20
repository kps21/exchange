import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangerate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

        const res = await axios.get(url);
        // console.log(res);
        setExchangeRate(res.data.rates[toCurrency]);
      } catch (error) {
        console.log(error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangerate !== null) {
      setConvertedAmount((amount * exchangerate).toFixed(2));
    }
  }, [amount, exchangerate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? "" : value);
  };
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };
  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount: </label>
            <input
              type="number"
              id="amt"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="INR">INR</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="INR">INR</option>
            </select>
          </div>
          <div className="result">
            <p>
              {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
