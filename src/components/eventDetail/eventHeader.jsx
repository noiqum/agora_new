import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, Link } from "react-router-dom";
import {
  joinEvent,
  onCancelClick,
  initEvents,
} from "../../store/actions/eventActions";
import firebase from "firebase/app";

export class eventHeader extends Component {
  state = {
    loginNeed: false,
    loginProcess: false,
    selectedEvent: null,
    cancelProcess: false,
    updateDemand: false,
  };

  listenEvent = null;

  componentDidMount() {
    this.listenEvent = firebase
      .firestore()
      .doc(`events/${this.props.id}`)
      .onSnapshot((doc) => {
        let data = doc.data();
        this.setState({
          selectedEvent: data,
        });
      });
  }
  componentWillUnmount() {
    this.listenEvent();
  }

  joinHandler = () => {
    if (!this.props.loginStatus) {
      this.setState({
        loginNeed: true,
      });
    }
    if (this.props.loginStatus) {
      this.props.onJoinClick(this.props.match.params.id, this.props.userId);
      this.setState({
        loginProcess: true,
      });
    }
  };

  cancelHandler = () => {
    this.props.onCancelClick(this.props.match.params.id, this.props.userId);
    this.setState({
      cancelProcess: true,
    });
  };

  updateHandler = () => {
    this.setState({
      updateDemand: true,
    });
  };

  render() {
    const { selectedEvent } = this.state;

    return (
      <div>
        {selectedEvent ? (
          <div className="event-header">
            <div className="event-header__cover">
              <div className="event-header__cover-img"></div>
              <div className="event-header__cover-title">
                {selectedEvent.title}
              </div>
              <div className="event-header__cover-date">
                {selectedEvent.date}
              </div>
              <div className="event-header__cover-host">
                <em>Hosted by </em>{" "}
                <Link to={{ pathname: `/people/${selectedEvent.hostUserId}` }}>
                  {selectedEvent.hostName}
                </Link>
              </div>
            </div>

            {this.props.loginStatus &&
              selectedEvent.hostName === this.props.displayName && (
                <div
                  onClick={this.updateHandler}
                  className="event-header__button"
                >
                  Update
                </div>
              )}

            {!(
              this.props.loginStatus &&
              selectedEvent.attendee.includes(this.props.userId)
            ) && (
              <div
                id="join"
                onClick={this.joinHandler}
                className="event-header__button"
              >
                Join This Event
              </div>
            )}

            {this.props.loginStatus &&
              selectedEvent.attendee.includes(this.props.userId) && (
                <div
                  id="trycancel"
                  onClick={this.cancelHandler}
                  className="event-header__button"
                >
                  Cancel to Join
                </div>
              )}

            {this.state.loginNeed && <Redirect to="/login" />}
            {this.state.updateDemand && (
              <Redirect
                to={{
                  pathname: `/update/${this.props.id}`,
                  query: { eventId: this.props.id },
                }}
              />
            )}
          </div>
        ) : (
          <h1>Loading</h1>
        )}{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.event.events,
    loginStatus: state.auth.login,
    userId: state.auth.user.id,
    displayName: state.auth.user.displayName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onJoinClick: (eventId, userId) => {
      dispatch(joinEvent(eventId, userId));
    },
    onCancelClick: (eventId, userId) => {
      dispatch(onCancelClick(eventId, userId));
    },
    tryInitEvents: () => {
      dispatch(initEvents());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(eventHeader)
);
