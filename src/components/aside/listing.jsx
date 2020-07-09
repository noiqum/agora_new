import React, { Component } from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { dateConvert } from "../../config/utils";
import { Link } from "react-router-dom";
import gsap from "gsap/gsap-core";

export class listing extends Component {
  state = {
    notes: undefined,
  };

  listingRef = React.createRef();
  async componentDidMount() {
    if (this.listingRef.current) {
      gsap.from(this.listingRef.current, {
        duration: 2,
        opacity: 0,
        x: 400,
        ease: "power3.inout",
        delay: 2,
      });
    }
    await firebase
      .firestore()
      .doc(`notification/${this.props.userId}`)
      .get()
      .then(
        (doc) => {
          let notes = doc.data();
          if (notes && Array.isArray(notes.note)) {
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
      <div ref={this.listingRef} className="listing">
        <span className="listing__title">Notifications</span>
        {this.state.notes !== undefined
          ? this.state.notes
              .sort((a, b) => b.time - a.time)
              .map((note) => {
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
                        <Link to={`/event-detail/${note.peopleLink}`}>
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
