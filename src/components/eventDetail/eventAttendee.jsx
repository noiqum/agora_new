import React, { Component } from "react";
import { connect } from "react-redux";
import Attendee from "./attendee";
import firebase from "firebase/app";

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
        this.setState({
          attendee: data.attendee,
        });
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
          {attendee !== undefined
            ? attendee.map((attendee) => {
                return <Attendee key={Attendee} attendeeId={attendee} />;
              })
            : "By now still waiting for first one to join :)"}
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
