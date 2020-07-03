import React, { Component } from "react";

import { randomEvent } from "../../config/utils";
import firebase from "firebase/app";

///components
import Offer from "./offer";

export class search extends Component {
  state = {
    selectedEvents: [],
    query: "",
    results: [],
  };

  async componentDidMount() {
    await firebase
      .firestore()
      .collection("events")
      .get()
      .then((res) => {
        var selectedOnes = [];
        res.forEach((doc) => {
          selectedOnes.push({ ...doc.data(), id: doc.id });
        });
        var pickOnes = randomEvent(selectedOnes);
        this.setState({
          selectedEvents: pickOnes,
        });
      });
  }

  render() {
    return (
      <div className="search">
        <main></main>
        <aside className="recom">
          <div className="recom__container">
            {this.state.selectedEvents !== []
              ? this.state.selectedEvents.map((event) => {
                  return <Offer event={event} key={event.id} />;
                })
              : null}
          </div>
        </aside>
      </div>
    );
  }
}

export default search;
