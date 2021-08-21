import React, { useState, useRef, useEffect } from "react";
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
  const cvcRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    setCvc("");
    setExpiry("");
    setExpirationYear("");
    setFocus("");
    setName("");
    setNumber("");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cvcRef.current && !cvcRef.current.contains(event.target)) {
        // flips card when we click anywhere away from cvc field
        setFocus("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cvcRef]);

  // removes special characters
  const removeSpecial = (e) => {
    const invalidChars = ["-", "+", "e", "E", " ", "."];
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
    const { value, maxLength, id } = e?.target;

    if (id === "cvv") {
      if (value.length <= maxLength) {
        setCvc(value);
      }
    } else if (id === "cardNumber") {
      const validValue = value.replace(
        /[A-Za-z}"`~_=.\->\]|<?+*/,;[:{\\!@#/'$%^&*()]/g,
        ""
      );
      setNumber(validValue);
    }
  };

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value, id } = e.target;

    if (id === "cardHolder") {
      // replaces any invalid characters
      const validValue = value.replace(
        /[}"`~_=.\->\]|<?+*/,\d;[:{\\!@#/'$%^&*()]/g,
        ""
      );
      setName(validValue);
    } else if (name === "expiry") {
      setExpiry(value);
    } else if (name === "expirationYear") {
      setExpirationYear(value);
    }
  };

  // TODO: Add year and month dynamically
  return (
    <div>
      <div className="credit-card">
        <Cards
          locale={{ valid: "Expires" }}
          placeholders={{ name: "FULL NAME" }}
          cvc={cvc}
          expiry={`${expiry}/${expirationYear}`}
          focused={focus}
          name={name}
          number={number}
          preview={true}
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
                ref={cvcRef}
                type="number"
                onChange={validateInput}
                onKeyDown={removeSpecial}
                onPaste={(e) => e.preventDefault()}
                onFocus={handleInputFocus}
                name="cvc"
                id="cvv"
                value={cvc}
                className="form-control form-control-lg"
                maxLength="3"
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
