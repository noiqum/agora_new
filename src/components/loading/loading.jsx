import React from "react";
import { ReactComponent as Spinner } from "../../css/svg/loading.svg";

function Loading({ loading }) {
  return (
    <div className="loading">
      <Spinner />
    </div>
  );
}

export default Loading;
