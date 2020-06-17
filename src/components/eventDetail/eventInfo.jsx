import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "./svg/calendar";
import Info from "./svg/info";
import Location from "./svg/location";
import firebase from "firebase/app";

export class eventInfo extends Component {
  state = {
    selectedEvent: null,
  };

  listenevent = null;
  componentDidMount() {
    this.listenevent = firebase
      .firestore()
      .collection("events")
      .doc(this.props.id)
      .onSnapshot((doc) => {
        let data = doc.data();
        this.setState({
          selectedEvent: data,
        });
      });
  }

  render() {
    return (
      <div className="event-info__container">
        <div className="event-info__info">
          <Info />
          {this.state.selectedEvent && this.state.selectedEvent.description}
        </div>
        <div className="event-info__location">
          <Location />{" "}
          {this.state.selectedEvent && this.state.selectedEvent.address}
        </div>
        <div className="event-info__calendar">
          <Calendar />
          {this.state.selectedEvent && this.state.selectedEvent.date}
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
export default connect(mapStateToProps)(eventInfo);
