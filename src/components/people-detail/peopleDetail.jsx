import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";
import {
  defaultImage,
  checkValidity,
  ageCalculate,
  renderUtil,
  checkValidityArray,
} from "../../config/utils";
import EventLink from "../people/event-link";
import { addfollower, unFollow } from "../../store/actions/profileActions";
import User from "../../css/images/user.png";
import ContactLink from "./contact-link";
import Loading from "../loading/loading";
import Attendee from "../eventDetail/attendee";

export class peopleDetail extends Component {
  state = {
    persona: null,
    id: undefined,
    profilePic: defaultImage,
    follow: false,
  };

  listenPersona = null;
  async componentDidMount() {
    const id = this.props.match.params.peopleid;
    await firebase
      .firestore()
      .doc(`user/${id}`)
      .get()
      .then((doc) => {
        let data = doc.data();
        if (data.follower && data.follower.includes(this.props.userId)) {
          this.setState({
            persona: data,
            id: id,
            follow: true,
          });
        } else {
          this.setState({
            persona: data,
            id: id,
          });
        }

        if (checkValidity(data.mainPhoto)) {
          this.setState({
            profilePic: data.mainPhoto.downloadUrl,
          });
        } else {
          return;
        }
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.history.push(`/people/people/${this.props.id}`);
    }
  }
  handleFollow = () => {
    if (this.state.follow === false) {
      this.props.follow(this.state.id, this.props.userId);
      this.setState({
        follow: true,
      });
    } else {
      this.props.unFollow(this.state.id, this.props.userId);
      this.setState({
        follow: false,
      });
    }
  };

  render() {
    const { profilePic, persona, follow } = this.state;

    return (
      <div>
        {persona === null ? (
          <Loading />
        ) : (
          <div className="persona">
            <img src={profilePic || User} alt="profile_pic" />
            {this.props.login && (
              <button onClick={this.handleFollow} className="persona__button">
                {follow ? "unfollow" : "follow"}
              </button>
            )}
            <h4>{persona.displayName}</h4>
            <div className="persona__info">
              <p>
                {renderUtil(ageCalculate(persona.birthday), "age") ||
                  "not shared"}
              </p>
              <p>{renderUtil(persona.bio, "bio")}</p>
              <p>{renderUtil(persona.job, "job")}</p>
              <p>{renderUtil(persona.gender, "gender")}</p>
              <p>{renderUtil(persona.joinDate, "join at")}</p>
            </div>
            <div className="persona__lists">
              {checkValidityArray(persona.interest) && (
                <div className="persona__interest">
                  <span>Interests:</span>
                  {persona.interest.map((elm) => {
                    return <span>{elm}</span>;
                  })}
                </div>
              )}

              {checkValidityArray(persona.photos) && (
                <div className="persona__photos">
                  {persona.photos.map((elm) => {
                    return <img src={elm.downloadUrl} alt="persona_image" />;
                  })}
                </div>
              )}
              {checkValidityArray(persona.contact) && (
                <div className="persona__contact">
                  {persona.contact.map((elm, index) => {
                    return <ContactLink elm={elm} key={index} />;
                  })}
                </div>
              )}
              {checkValidityArray(persona.hostEvent) && (
                <div>
                  <h3>host events :</h3>
                  <div className="persona__hostEvents">
                    {persona.hostEvent.map((elm) => {
                      return <EventLink id={elm} key={elm} />;
                    })}
                  </div>
                </div>
              )}

              {checkValidityArray(persona.joinEvent) && (
                <div>
                  {" "}
                  <h3>
                    Event(s) {persona.displayName.toUpperCase()} joins into :
                  </h3>
                  <div className="persona__joinEvent">
                    {persona.joinEvent.map((elm) => {
                      return <EventLink id={elm} key={elm} />;
                    })}
                  </div>
                </div>
              )}
              <h3>followers :</h3>
              {checkValidityArray(persona.follower) && (
                <div className="persona__follower">
                  {persona.follower.map((elm) => {
                    return <Attendee attendeeId={elm} key={elm} />;
                  })}
                </div>
              )}
              <h3>following</h3>
              {checkValidityArray(persona.following) && (
                <div className="persona__following">
                  {persona.following.map((elm) => {
                    return <Attendee attendeeId={elm} key={elm} />;
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.user.id,
  login: state.auth.login,
});

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (people, follower) => dispatch(addfollower(people, follower)),
    unFollow: (people, follower) => dispatch(unFollow(people, follower)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(peopleDetail)
);
