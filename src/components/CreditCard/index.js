import React, { useState } from "react";
import "../../css/credit-card.css";
import "../../css/form-style.css";
import Cards from "react-credit-cards";

export default function CreditCard() {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setCvc("");
    setExpiry("");
    setExpirationYear("");
    setFocus("");
    setName("");
    setNumber("");
  };

  // removes special characters
  const removeSpecial = (e) => {
    var invalidChars = ["-", "+", "e", "E", " ", "."];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  // adds space after every 4 character in card number
  const addSpace = (e) => {
    const { value } = e.target;
    if (value.length === 4 || value.length === 9 || value.length === 14) {
      const newValue = value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
      setNumber(newValue);
    }
  };

  // validates the length of input in case of cvv and
  // replaces invalid characters in case of card number
  const validateInput = (e) => {
    const { name, value, maxLength, id } = e.target;
    var temp, element;

    if (id === "cvv") {
      if (value.length > maxLength) {
        temp = value.slice(0, maxLength);
        const num = temp;
        element = document.getElementById(id);
        element.value = temp;
        console.log("name, num: ", name, num);
        // TODO: Is setState needed?
      } else {
        console.log("name, value-1: ", name, value);
        setCvc(value);
      }
    } else {
      element = document.getElementById(id);
      element.value = element.value.replace(
        /[A-Za-z}"`~_=.\->\]|<?+*/,;[:{\\!@#/'$%^&*()]/g,
        ""
      );
      setNumber(element.value);
      console.log("name, element.value-1: ", name, element.value);
    }
  };

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value, id } = e.target;

    if (id === "cardHolder") {
      var element = document.getElementById(id);
      // TODO: Any better way to avoid?
      // replaces any invalid characters
      element.value = element.value.replace(
        /[}"`~_=.\->\]|<?+*/,\d;[:{\\!@#/'$%^&*()]/g,
        ""
      );
      setName(element.value);
      console.log("name, element.value-2: ", name, element.value);
    } else if (name === "expiry") {
      console.log("name, value-2: ", name, value);
      setExpiry(value);
    } else if (name === "expirationYear") {
      console.log("expirationYear: ", name, value);
      setExpirationYear(value);
    }
  };

  // TODO: Add year and dynamically
  return (
    <div>
      <div className="credit-card ">
        <Cards
          locale={{ valid: "Expires" }}
          placeholders={{ name: "FULL NAME" }}
          cvc={cvc}
          expiry={expiry}
          expirationYear={expirationYear}
          focused={focus}
          name={name}
          number={number}
        />
      </div>
      <div className="card">
        <form className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber" className="card-label">
              Card Number
            </label>
            <input
              type="text"
              onChange={validateInput}
              value={number}
              onKeyDown={removeSpecial}
              onPaste={(e) => e.preventDefault()}
              onKeyPress={addSpace}
              onFocus={handleInputFocus}
              name="number"
              maxLength="19"
              id="cardNumber"
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardHolder" className="card-label">
              Card holder
            </label>
            <input
              type="text"
              name="name"
              spellCheck="false"
              value={name}
              maxLength="20"
              autoComplete="off"
              onPaste={(e) => e.preventDefault()}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              id="cardHolder"
              className="form-control form-control-lg"
            />
          </div>
          <div className="date-cvv-box">
            <div className="expiry-class">
              <div className="form-group card-month ">
                <label htmlFor="cardMonth" className="card-label">
                  Expiration Date
                </label>

                <select
                  id="cardMonth"
                  data-ref="cardDate"
                  value={expiry}
                  name="expiry"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="form-control form-control-lg"
                >
                  <option value="" defaultChecked="true">
                    Month
                  </option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="form-group card-year">
                <select
                  id="cardYear"
                  data-ref="cardDate"
                  value={expirationYear}
                  name="expirationYear"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="form-control form-control-lg"
                >
                  <option value="" defaultChecked="true">
                    Year
                  </option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                </select>
              </div>
            </div>

            <div className="cvv-class form-group">
              <label htmlFor="cvv" className="card-label cvv-label">
                CVV
              </label>
              <input
                type="number"
                onChange={validateInput}
                onKeyDown={removeSpecial}
                onPaste={(e) => e.preventDefault()}
                onFocus={handleInputFocus}
                name="cvc"
                id="cvv"
                value={cvc}
                className="form-control form-control-lg "
                maxLength="4"
              />
            </div>
          </div>

          <button className="btn btn-primary btn-lg btn-block" onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
