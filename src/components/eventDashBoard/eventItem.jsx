import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkArchived } from "../../config/utils";
import gsap from "gsap/gsap-core";

function EventItem({ event }) {
  let picUrlRandom = () => {
    let url = "https://randomuser.me/api/portraits/med/men/";
    let num = Math.floor(Math.random() * 100 + 1).toString();
    let result = url + num + ".jpg";
    return result;
  };

  const eventItemRef = useRef(null);
  useEffect(() => {
    gsap.from(eventItemRef.current, {
      opacity: 0,
      y: 20,
      duration: 3,
      ease: "power2.out",
    });
  }, [eventItemRef]);

  return (
    <div ref={eventItemRef} className="event">
      <h3 className="event__title">{event.title}</h3>
      <p className="event__hostname">{event.hostName}</p>
      <p className="event__category">{event.category}</p>
      <span className="event__date">
        {event.date}
        {checkArchived(event) && (
          <span className="event__date-archived">archived</span>
        )}
      </span>
      <span className="event__address">{event.address}</span>
      <div className="event__attendee">
        {event.attendee && (
          <div>
            {event.attendee.length <= 2 ? (
              <div>
                <img
                  src={picUrlRandom()}
                  alt="attendees"
                  className="event__attendee__img"
                />
                <img
                  src={picUrlRandom()}
                  alt="attendees"
                  className="event__attendee__img"
                />
                <span className="event__attendee__counter">2</span>
              </div>
            ) : (
              <div>
                <img
                  src={picUrlRandom()}
                  alt="attendees"
                  className="event__attendee__img"
                />
                <img
                  src={picUrlRandom()}
                  alt="attendees"
                  className="event__attendee__img"
                />
                <span className="event__attendee__counter">
                  +{event.attendee.length - 2}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="event__description">{event.description}</div>
      <div className="event__button">
        <Link
          to={{
            pathname: `/event-detail/${event.id}`,
            hash: `#${event.id}`,
            query: { attendeeArr: event.attendee },
          }}
        >
          <button className="event__button-item view">view</button>
        </Link>
      </div>
    </div>
  );
}

export default EventItem;
