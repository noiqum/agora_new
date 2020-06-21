import React, { Component } from "react";
import { connect } from "react-redux";
import gsap from "gsap/gsap-core";
import firebase from "firebase/app";
import { Attendee } from "../eventDetail/attendee";

export class people extends Component {
  state = { data: null, follower: false, following: false };
  peopleRef = React.createRef();
  containerRef = React.createRef();
  async componentDidMount() {
    if (this.peopleRef.current) {
      gsap.from(".people", {
        opacity: 0,
        y: 20,
        duration: 2,
        ease: "power3.out",
      });
    }
    let data = await firebase
      .firestore()
      .doc(`user/${this.props.currentUserId}`)
      .get()
      .then((res) => {
        return res.data();
      });
    if (data !== undefined) {
      this.setState({
        data,
      });
    }
  }
  componentDidUpdate() {
    if (this.containerRef.current) {
      gsap.from(".people__container", {
        duration: 2,
        ease: "power3.out",
        y: 20,
        opacity: 0,
      });
    }
  }

  render() {
    return (
      <div ref={this.peopleRef} className="people">
        <section className="people__search">
          <div ref={this.containerRef} className="people__container"></div>
        </section>
        <section className="people__follower">
          <label htmlFor="follower"> See the people who follow you</label>
          <input
            type="checkbox"
            id="follower"
            onChange={() => {
              this.setState({
                follower: !this.state.follower,
              });
            }}
          />
          {this.state.follower && (
            <div ref={this.containerRef} className="people__container">
              {this.state.data.follower &&
                this.state.data.follower.map((person) => {
                  return <Attendee key={person} attendeeId={person} />;
                })}
            </div>
          )}
        </section>
        <section className="people__following">
          <label htmlFor="following"> See the people you follow</label>
          <input
            type="checkbox"
            id="following"
            onChange={() => {
              this.setState({
                following: !this.state.following,
              });
            }}
          />
          {this.state.following && (
            <div ref={this.containerRef} className="people__container">
              {this.state.data.following &&
                this.state.data.following.map((person) => {
                  return <Attendee key={person} attendeeId={person} />;
                })}
            </div>
          )}
        </section>
        <section className="people__mutual">
          <div ref={this.containerRef} className="people__container"></div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUserId: state.auth.user.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(people);
