import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { resignIn } from "../../store/actions/authActions";
import Loading from "../loading/loading";

export const UpdateModal = ({ resign, resignProcess, resignSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    let credential = {
      email: email,
      password: password,
    };
    const s = resign();
    s(credential);
  };
  return (
    <div className="update-modal">
      <h2>to update your password , you must resign in </h2>
      <div>
        <label htmlFor="email">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            id="email"
            value={email}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            name="password"
            id="password"
          />
        </label>
      </div>
      <button onClick={onsubmit} type="submit">
        Sign In
      </button>
      {resignProcess && <Loading />}
      {!resignProcess && resignSuccess && <h4>uuu</h4>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  resignProcess: state.auth.resign,
  resignSuccess: state.auth.resignSuccess,
});

const mapDispatchToProps = (dispatch) => {
  return {
    resign: (credential) => {
      dispatch(resignIn(credential));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateModal);
