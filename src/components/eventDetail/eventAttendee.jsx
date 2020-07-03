import React, { Component } from "react";
import { connect } from "react-redux";
import Attendee from "./attendee";
import firebase from "firebase/app";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export class eventAttendee extends Component {
  state = {
    attendee: undefined,
  };

  listenAttendee = null;
  attendeesOfSelectedEvent = undefined;
  async componentDidMount() {
    this.listenAttendee = firebase
      .firestore()
      .doc(`events/${this.props.id}`)
      .onSnapshot((res) => {
        let data = res.data();
        if (data !== undefined) {
          this.setState({
            attendee: data.attendee,
          });
        }
      });
  }
  componentWillUnmount() {
    this.listenAttendee();
  }

  render() {
    const { attendee } = this.state;
    return (
      <div className="event-attendee__container">
        <h2>Who is going to this event..</h2>
        <div className="event-attendee__frame">
          <TransitionGroup component={null}>
            {attendee !== undefined
              ? attendee.map((attendee) => {
                  return (
                    <CSSTransition
                      in={attendee}
                      key={attendee}
                      timeout={2000}
                      classNames="participant"
                    >
                      <Attendee key={Attendee} attendeeId={attendee} />
                    </CSSTransition>
                  );
                })
              : attendee !== undefined && attendee.length < 1
              ? "By now still waiting for first one to join :)"
              : null}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.event.events,
  };
};

export default connect(mapStateToProps)(eventAttendee);
