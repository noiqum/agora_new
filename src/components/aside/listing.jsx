import React, { Component } from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { dateConvert } from "../../config/utils";
import { Link } from "react-router-dom";

export class listing extends Component {
  state = {
    notes: undefined,
  };

  async componentDidMount() {
    await firebase
      .firestore()
      .doc(`notification/${this.props.userId}`)
      .get()
      .then(
        (doc) => {
          let notes = doc.data();
          console.log(notes);
          if (Array.isArray(notes.note)) {
            this.setState({
              notes: notes.note,
            });
          } else {
            return;
          }
        },
        (err) => console.log(err)
      );
  }

  render() {
    return (
      <div className="listing">
        <span className="listing__title">Notifications</span>
        {this.state.notes !== undefined
          ? this.state.notes.map((note) => {
              return (
                <div className="listing__item">
                  <p>
                    {note.m}
                    {"  "}
                    at {dateConvert(note.time)}
                    {"  "}
                    {note.people ? (
                      <Link to={`/people/${note.peopleLink}`}>
                        <span>See the follower</span>
                      </Link>
                    ) : note.event ? (
                      <Link to={`/people/${note.peopleLink}`}>
                        <span>See the Participant</span>
                      </Link>
                    ) : null}
                  </p>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.user.id,
  };
};

export default connect(mapState)(listing);
