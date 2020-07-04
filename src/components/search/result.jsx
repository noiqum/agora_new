import React from "react";

function Result({ event }) {
  return (
    <div className="result">
      <h4>{event.title}</h4>
      <p>{event.category}</p>
      <p>hosted by:{event.hostName}</p>
      <p>{event.date}</p>
      <p>Click for more...</p>
    </div>
  );
}

export default Result;
