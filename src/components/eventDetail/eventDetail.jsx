import React, { Component } from "react";
import EventHeader from "./eventHeader";
import EventInfo from "./eventInfo";
import EventChat from "./eventChat";
import EventAttendee from "./eventAttendee";

export class eventDetail extends Component {
  render() {
    return (
      <div className="event-detail-container">
        <h1>event detail</h1>
        <EventHeader id={this.props.match.params.id} />
        <EventInfo id={this.props.match.params.id} />
        <EventChat id={this.props.match.params.id} />
        <EventAttendee id={this.props.match.params.id} />
      </div>
    );
  }
}

export default eventDetail;
