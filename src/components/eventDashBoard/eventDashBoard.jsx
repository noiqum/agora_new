import React, { Component } from "react";
import EventItem from "./eventItem";
import { connect } from "react-redux";
import { initEvents } from "../../store/actions/eventActions";
import { Link } from "react-router-dom";
import { ReactComponent as Check } from "../../css/svg/check.svg";
import { checkArchived } from "../../config/utils";

export class eventDashBoard extends Component {
  state = {
    showArchived: false,
  };

  componentDidMount() {
    this.props.initEvents();
  }

  windowScreen = window.innerWidth;
  style = { all: "inherit", curser: "pointer" };
  checkHandle = () => {
    this.setState((prevstate) => ({
      showArchived: !prevstate.showArchived,
    }));
  };
  render() {
    const { events } = this.props;

    return (
      <>
        <div className="event-dash-board">
          <div className="event-dash-board__check">
            <input
              type="checkbox"
              id="archived"
              className="event-dash-board__check-input"
              onClick={this.checkHandle}
            />
            <label htmlFor="archived" className="event-dash-board__check-label">
              Show Archived Events : <Check className="checked" />
            </label>
          </div>
          {this.state.showArchived
            ? events.map((event) => {
                if (this.windowScreen < 600) {
                  return (
                    <Link
                      key={event.id}
                      to={{
                        pathname: `/event-detail/${event.id}`,
                        hash: `#${event.id}`,
                        query: { attendeeArr: event.attendee },
                      }}
                      style={{ all: "inherit", cursor: "pointer" }}
                    >
                      <EventItem key={event.id} event={event}></EventItem>
                    </Link>
                  );
                } else {
                  return <EventItem key={event.id} event={event} />;
                }
              })
            : events
                .filter((event) => {
                  return !checkArchived(event);
                })
                .map((event) => {
                  if (this.windowScreen < 600) {
                    return (
                      <Link
                        key={event.id}
                        to={{
                          pathname: `/event-detail/${event.id}`,
                          hash: `#${event.id}`,
                          query: { attendeeArr: event.attendee },
                        }}
                        style={{ all: "inherit", cursor: "pointer" }}
                      >
                        <EventItem key={event.id} event={event}></EventItem>
                      </Link>
                    );
                  } else {
                    return <EventItem key={event.id} event={event} />;
                  }
                })}
        </div>
      </>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    events: state.event.events,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initEvents: () => dispatch(initEvents()),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(eventDashBoard);
