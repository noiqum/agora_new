import React, { Component } from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import Comment from "./comment";

export class eventChat extends Component {
  state = {
    box: [],
    comment: "",
  };
  listenComments = null;
  async componentDidMount() {
    this.listenComments = firebase
      .firestore()
      .collection("comments")
      .doc(this.props.id)
      .onSnapshot((res) => {
        let data = res.data();
        if (data !== undefined) {
          this.setState({
            box: data.msg,
          });
        }
      });
  }
  componentWillUnmount() {
    this.listenComments();
  }

  sendHandler = () => {
    let comment = {
      owner: this.props.userId,
      content: this.state.comment,
      ownerName: this.props.displayName,
      time: Date.now(),
    };
    if (this.state.box.length < 1) {
      firebase
        .firestore()
        .collection("comments")
        .doc(this.props.id)
        .set({
          msg: [comment],
        });
    } else {
      firebase
        .firestore()
        .collection("comments")
        .doc(this.props.id)
        .update({
          msg: firebase.firestore.FieldValue.arrayUnion(comment),
        });
    }
  };

  render() {
    return (
      <div className="event-chat__container">
        <h2>Comments</h2>
        <div className="event-chat__frame">
          {this.state.box.length > 0 &&
            this.state.box.map((elm, index) => {
              return (
                <Comment key={index} comment={elm} eventId={this.props.id} />
              );
            })}
        </div>
        <div className="event-chat__text">
          <textarea
            name="text"
            id="text"
            cols="60"
            rows="10"
            resize="true"
            placeholder="Share comments  on the event with us ,to post your comment you should be log in first"
            onChange={(e) => {
              this.setState({
                comment: e.target.value,
              });
            }}
          ></textarea>
          <div className="event-chat__text__button">
            {this.props.login && (
              <button onClick={this.sendHandler}>Send</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.user.id,
    login: state.auth.login,
    displayName: state.auth.user.displayName,
  };
};

export default connect(mapState)(eventChat);
