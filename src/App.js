import { useState } from "react";

const App = () => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  /**
   * @note  this isn't necessary, you can do this check in 'onSubmit' as well,
   * but in a real application I'd add checks
   * for strings and arrays and I'd move it in a 'lib' folder with whatever 
   * other functions I might use accros the app.
  */
  const isEmpty = (obj) => {
    if (Object.keys(obj).length > 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true); // user submitted, show the errors
    if (isEmpty(fields)) {
      // if the form is empty, don't submit
      setErrors({ emptyForm: "Fill in the form!" });
      return;
    }
    // checks passed, submit form
    console.log("no errors");
  };
  const handleChange = (e) => {
    // loop through all the inputs and textareas of the form
    for (const field of e.currentTarget.querySelectorAll("input, textarea")) {
      setShowErrors(false); // when the user is editing the form, don't show errors
      const { name, value } = field;
      setFields({ ...fields, [name]: value });
      // if we have an error, but the name of the error is the field we're editing, delete the error
      delete errors[name];
      // this isn't necessarry, it will disappear when submitting again, but I want it to disappear when
      // the user starts editing the form again
      delete errors["emptyForm"];
      // if the value is empty and we DON'T have an error with that key, add the error
      if (!value && !Object.hasOwnProperty(name)) {
        errors[name] = `${name.toUpperCase()} IS REQUIRED!`;
        setErrors({...errors});
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>
      {/* USE onChange HERE INSTEAD OF INPUT/TEXTAREA FIELDS */}
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <label htmlFor="something">something</label>
        <input type="text" name="something" />
        <label htmlFor="something else">something else</label>
        <input type="text" name="something else" />
        <label htmlFor="something2">something2</label>
        <input type="text" name="something2" />
        <label htmlFor="something3">something3</label>
        <input type="text" name="something3" />
        <button type="submit">Login</button>
      </form>
      {/* DISPLAY THE ERRORS TO THE USER */}
      <div className="errors">
        {showErrors &&
          Object.keys(errors).map((errKey) => (
            <div
              className="error"
              key={errKey}
              // REMOVE THE ERROR WHEN THE USER CLICKS ON IT
              onClick={() => {
                delete errors[errKey];
                setErrors({...errors});
              }}
            >
              {errors[errKey]}
            </div>
          ))}
      </div>
      {/* A BIT OF STYING, NOTHING FANCY */}
      <style jsx>{`
        h1 {
          width: 100%;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          max-width: 600px;
          width: 100%;
          margin: 2rem 20px 2rem auto;
        }
        form label {
          display: block;
          margin-top: 10px;
        }
        form button {
          margin-top: 20px;
        }
        .errors {
          position: fixed;
          bottom: 20px;
          left: 5%;
          width: 400px;
        }
        .error {
          background-color: red;
          color: white;
          font-weight: 500;
          font-size: 14px;
          max-width: 400px;
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border-radius: 5px;
        }
        .error:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default App;
