import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

export const Register = () => {
  const [values, setValues] = useState(initialState);
  //global state and useNavigate
  const { showAlert, displayAlert } = useAppContext();
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, isMember, name } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        {showAlert && (
          <Alert alertType="alert-danger" alertMessage="Enter all the fields" />
        )}
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* Name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="Name"
          />
        )}
        {/* Email input */}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
        />
        {/* Password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
