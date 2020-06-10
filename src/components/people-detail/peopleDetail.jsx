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
import LazyLoad from "react-lazy-load";
import User from "../../css/images/user.png";

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

        this.setState({
          persona: data,
          id: id,
        });
        if (checkValidity(data.mainPhoto)) {
          this.setState({
            profilePic: data.mainPhoto.downloadUrl,
          });
        } else {
          return;
        }
      });
  }

  render() {
    const { profilePic, persona, follow } = this.state;

    return (
      <div>
        {persona === null ? (
          <h4>loading</h4>
        ) : (
          <div className="persona">
            <img src={profilePic} alt="profile_pic" />
            <button className="persona__button">
              {follow ? "unfollow" : "follow"}
            </button>
            <h4>{persona.displayName}</h4>
            <div className="persona__info">
              <p>{renderUtil(ageCalculate(persona.birthday), "age")}</p>
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
              {checkValidityArray(persona.people) && (
                <div className="persona__people">
                  {persona.people.map((elm) => {
                    return elm;
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(peopleDetail)
);
