import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { UpdateModal } from "./updateModal";

export const Account = ({ user }) => {
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <div className="account">
      <h3> Hey , {user.displayName.toUpperCase()}</h3>
      <p>do you want to update your password?</p>
      <button onClick={() => setUpdateModal(!updateModal)}>Update</button>
      {updateModal && <UpdateModal />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
