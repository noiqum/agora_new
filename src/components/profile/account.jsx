import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import UpdateModal from "./updateModal";
import { useEffect } from "react";
import { useRef } from "react";
import gsap from "gsap/gsap-core";

export const Account = ({ user }) => {
  const accountRef = useRef(null);

  useEffect(() => {
    if (accountRef.current) {
      gsap.from(".account", {
        y: 100,
        opacity: 0,
        duration: 1.6,
        ease: "power3.inout",
      });
    }
  });
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <div ref={accountRef} className="account">
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
