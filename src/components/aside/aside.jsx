import EventForm from "../eventForm/eventForm";
import React, { Component } from "react";
import Listing from "./listing";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";

export class aside extends Component {
  state = {
    formButtonClick: false,
  };
  formButtonClick = () => {
    this.setState({
      formButtonClick: true,
    });
  };
  cancelButtonClick = (e) => {
    e.preventDefault();
    this.setState({
      formButtonClick: false,
    });
  };
  duration = 1000;

  defaultStyle = {
    transition: `all ${this.duration}ms ease-in-out`,
    opacity: 0,
  };

  transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  render() {
    return (
      <div className="aside">
        {this.props.loginStatus && (
          <button onClick={this.formButtonClick} className="aside__button">
            Create Event
          </button>
        )}

        <Transition
          in={this.state.formButtonClick}
          timeout={800}
          unmountOnExit
          mountOnEnter
        >
          {(state) => (
            <div
              style={{
                ...this.defaultStyle,
                ...this.transitionStyles[state],
              }}
            >
              <EventForm onCancelClick={this.cancelButtonClick} />
            </div>
          )}
        </Transition>
        {this.props.loginStatus && <Listing />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loginStatus: state.auth.login };
};
export default connect(mapStateToProps)(aside);
