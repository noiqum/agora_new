import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { ReactComponent as City } from "../../css/svg/city.svg";
import { ReactComponent as Title } from "../../css/svg/title.svg";
import { ReactComponent as Category } from "../../css/svg/category.svg";
import { ReactComponent as Date } from "../../css/svg/date.svg";
import { ReactComponent as Right } from "../../css/svg/right.svg";
export class eventLink extends Component {
  state = {
    event: null,
  };

  async componentDidMount() {
    await firebase
      .firestore()
      .doc(`events/${this.props.id}`)
      .get()
      .then((doc) => {
        let data = doc.data();
        this.setState({
          event: data,
        });
      });
  }

  render() {
    return (
      <div className="eventlink-container">
        {this.state.event === null ? (
          <h5>loading....</h5>
        ) : (
          <Link to={{ pathname: `/event-detail/${this.props.id}` }}>
            <div className="eventlink">
              <p>
                <Title />
                {this.state.event.title}
              </p>
              <p>
                <Category /> {this.state.event.category}
              </p>
              <p>
                <City />
                {this.state.event.city}
              </p>
              <p>
                <Date /> {this.state.event.date}
              </p>
              <span>
                for more...
                <Right />
              </span>
            </div>
          </Link>
        )}
      </div>
    );
  }
}

export default eventLink;
