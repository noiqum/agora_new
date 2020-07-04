import React from "react";
import { Link } from "react-router-dom";

function offer({ event }) {
  return (
    <>
      {event !== undefined ? (
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: `/event-detail/${event.id}`, hash: `#${event.id}` }}
        >
          <div className="offer">
            <h3>{event.title}</h3>
            <p>{event.category}</p>
            <p>{event.city}</p>
            <p>{event.date}</p>
            <p>{event.hostName}</p>
          </div>
        </Link>
      ) : null}
    </>
  );
}

export default offer;
