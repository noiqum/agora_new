import React, { Component } from "react";
import { connect } from "react-redux";
import { resignIn } from "../../store/actions/authActions";
import Loading from "../loading/loading";

export class updateModal extends Component {
  state = {
    email: "",
    password: "",
  };

  onsubmit = (e) => {
    e.preventDefault();
    let credential = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.resign(credential);
  };
  render() {
    return (
      <div className="update-modal">
        <h2>to update your password , you must resign in </h2>
        <div>
          <label htmlFor="email">
            <input
              onChange={(e) => {
                this.setState({
                  [e.target.name]: e.target.value,
                });
              }}
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              placeholder="email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              onChange={(e) => {
                this.setState({ [e.target.name]: e.target.value });
              }}
              value={this.state.password}
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
        </div>
        <button onClick={this.onsubmit} type="submit">
          Sign In
        </button>
        {this.props.resignProcess && <Loading />}
        {!this.props.resignProcess && this.props.resignSuccess && <h4>uuu</h4>}
      </div>
    );
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(updateModal);
