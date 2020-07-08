import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { dateConvert } from "../../config/utils";
import firebase from "firebase/app";

// let comment = {
//     owner: this.props.userId,
//     content: this.state.comment,
//     ownerName: this.props.displayName,
//     time: Date.now(),
//   };

export class comment extends Component {
  state = {
    content: "",
    owner: false,
  };

  componentDidMount() {
    if (this.props.comment.owner === this.props.userId) {
      this.setState({
        owner: true,
      });
    }
  }
  picUrlRandom = () => {
    let url = "https://randomuser.me/api/portraits/med/men/";
    let num = Math.floor(Math.random() * 100 + 1).toString();
    let result = url + num + ".jpg";
    return result;
  };
  deleteComment = () => {
    firebase
      .firestore()
      .collection("comments")
      .doc(this.props.eventId)
      .update({
        msg: firebase.firestore.FieldValue.arrayRemove(this.props.comment),
      });
  };
  render() {
    return (
      <div className="comment">
        <div className="comment__owner">
          <Link to={{ pathname: `/people/${this.props.comment.owner}` }}>
            <img src={this.picUrlRandom()} alt="comment profile pic" />
            <span>{this.props.comment.ownerName}</span>
            <span>{dateConvert(this.props.comment.time)}</span>
          </Link>
        </div>
        <div className="comment__body">
          <p>{this.props.comment.content}</p>
          {this.state.owner && (
            <button onClick={this.deleteComment}>delete</button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.user.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(comment);
