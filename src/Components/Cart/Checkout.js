import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formsInputValidity, setFormsInputValidity] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalcode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalcodeIsValid = isFiveChar(enteredPostalcode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormsInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalcode: enteredPostalcodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalcodeIsValid &&
      enteredNameIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalcode,
      street: enteredStreet,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formsInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formsInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formsInputValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formsInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formsInputValidity.postalcode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formsInputValidity.postalcode && (
          <p>Please enter a valid postal code</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formsInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formsInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
