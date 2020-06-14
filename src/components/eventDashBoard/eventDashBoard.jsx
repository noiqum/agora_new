import React, { Component } from "react";
import EventItem from "./eventItem";
import { connect } from "react-redux";
import { initEvents } from "../../store/actions/eventActions";
import { Link } from "react-router-dom";
import { ReactComponent as Check } from "../../css/svg/check.svg";
import { checkArchived } from "../../config/utils";
import InfiniteScroll from "react-infinite-scroller";

export class eventDashBoard extends Component {
  state = {
    showArchived: true,
    moreEvents: false,
    loadedEvents: [],
    loadingInitial: true,
    loading: false,
  };

  async componentDidMount() {
    let next = await this.props.initEvents();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps) {
      this.setState({
        loadedEvents: [
          ...new Set([...this.state.loadedEvents, ...this.props.events]),
        ],
      });
    }
  }
  getNextEvents = async () => {
    let lastEvent =
      this.props.events && this.props.events[this.props.events.length - 1];

    let next = await this.props.initEvents(lastEvent);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false,
      });
    }
  };

  windowScreen = window.innerWidth;
  style = { all: "inherit", curser: "pointer" };
  checkHandle = () => {
    this.setState((prevstate) => ({
      showArchived: !prevstate.showArchived,
    }));
  };
  render() {
    return (
      <>
        <div className="event-dash-board">
          <div className="event-dash-board__check">
            <input
              type="checkbox"
              id="archived"
              className="event-dash-board__check-input"
              onClick={this.checkHandle}
              checked={this.state.showArchived ? true : false}
            />
            <label htmlFor="archived" className="event-dash-board__check-label">
              Show Archived Events : <Check className="checked" />
            </label>
          </div>
          {this.state.showArchived ? (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.getNextEvents}
              hasMore={this.state.moreEvents}
              initialLoad={false}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {this.state.loadedEvents.map((event) => {
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
            </InfiniteScroll>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.getNextEvents}
              hasMore={this.state.moreEvents}
              initialLoad={false}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {this.state.loadedEvents
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
            </InfiniteScroll>
          )}
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
    initEvents: (lastevent) => dispatch(initEvents(lastevent)),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(eventDashBoard);
