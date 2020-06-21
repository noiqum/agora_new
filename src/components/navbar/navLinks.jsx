import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function navLinks({
  username,
  signup,
  login,
  loginClicked,
  signupClicked,
  logoutClicked,
  id,
  onDefaultClick,
  profilePhoto,
}) {
  const linkStyle = {
    all: "inherit",
  };

  const profilePhotoHolder = () => {
    return profilePhoto !== ""
      ? profilePhoto.downloadUrl
      : "https://firebasestorage.googleapis.com/v0/b/agora-event-platform.appspot.com/o/userPlaceHolder.png?alt=media&token=9b6cc96e-a380-4d30-9060-72cc0294ce89";
  };

  return (
    <div>
      <nav className="navbar__nav">
        <ul className="navbar__nav__list">
          {login && (
            <Link
              style={linkStyle}
              className="link-router"
              to="/event"
              onClick={onDefaultClick}
            >
              <li className="navbar__nav__list__link">event</li>
            </Link>
          )}

          {login && (
            <Link style={linkStyle} to="/people" onClick={onDefaultClick}>
              <li className="navbar__nav__list__link">people</li>
            </Link>
          )}

          {!login && (
            <Link style={linkStyle} to="/login">
              {" "}
              <li onClick={loginClicked} className="navbar__nav__list__link">
                log in
              </li>
            </Link>
          )}
          {login && (
            <Link style={linkStyle} to="/" exact>
              {" "}
              <li
                onClick={logoutClicked}
                to="/"
                className="navbar__nav__list__link"
              >
                log out
              </li>
            </Link>
          )}
          {!login && !signup && (
            <Link style={linkStyle} to="/signup">
              {" "}
              <li onClick={signupClicked} className="navbar__nav__list__link">
                sign up
              </li>
            </Link>
          )}

          {login && (
            <Link
              style={linkStyle}
              to={{ pathname: `/profile/:${id}` }}
              onClick={onDefaultClick}
            >
              <li className="navbar__nav__list__link">{username}</li>
            </Link>
          )}

          {login && (
            <Link
              style={linkStyle}
              to={{ pathname: `/profile/:${id}` }}
              onClick={onDefaultClick}
            >
              <li className="navbar__nav__list__link">
                <img alt="profile_pic" src={`${profilePhotoHolder()}`}></img>
              </li>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.user.id,
    profilePhoto: state.auth.user.profilePhoto,
  };
};

export default connect(mapStateToProps)(navLinks);
