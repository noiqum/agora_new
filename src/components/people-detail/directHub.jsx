import React from "react";
import { Redirect } from "react-router-dom";

function directHub({ id }) {
  return (
    <div>
      <Redirect to={{ pathname: `/people/${id}` }} />
    </div>
  );
}

export default directHub;
