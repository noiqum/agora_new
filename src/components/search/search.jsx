import React, { Component } from "react";
import gsap from "gsap/gsap-core";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";

//utils
import { randomEvent, filterEvents } from "../../config/utils";
///
import firebase from "firebase/app";
///components
import Offer from "./offer";
import Result from "./result";
///

export class search extends Component {
  state = {
    selectedEvents: [],
    results: [],
    city: "",
    title: "",
    category: "",
    noResult: false,
  };

  asideRef = React.createRef(null);
  mainRef = React.createRef(null);

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
    if (this.asideRef.current) {
      gsap.from(".recom", {
        x: 100,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        stagger: {
          amount: 0.3,
        },
      });
    } else {
      return;
    }
    if (this.mainRef.current) {
      gsap.to(".search__main", {
        y: 0,
        opacity: 1,
        duration: 3,
        ease: "expo.inOut",
      });
    } else {
      return;
    }
  }

  handleInfo = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  decideQuery = () => {
    var queryList = [];
    if (this.state.city !== "") {
      queryList[0] = { argument: "city", content: this.state.city };
      if (this.state.category !== "") {
        queryList[1] = { argument: "category", content: this.state.category };
        if (this.state.title !== "") {
          queryList[2] = { argument: "title", content: this.state.title };
        }
      } else if (this.state.title !== "") {
        queryList[1] = { argument: "title", content: this.state.title };
      }
    } else if (this.state.category !== "") {
      queryList[0] = { argument: "category", content: this.state.category };
      if (this.state.title !== "") {
        queryList[1] = { argument: "title", content: this.state.title };
      }
    } else if (this.state.title !== "") {
      queryList[0] = { argument: "title", content: this.state.title };
    } else {
      return;
    }
    return queryList;
  };

  searchHandle = async () => {
    if (
      this.state.city !== "" ||
      this.state.category !== "" ||
      this.state.title !== ""
    ) {
      let queryRes = this.decideQuery();

      let size = queryRes.length;

      let result = [];
      console.log(result);
      await firebase
        .firestore()
        .collection("events")
        .where(
          this.decideQuery()[0].argument,
          "==",
          this.decideQuery()[0].content
        )
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });

          if (result.length === 0) {
            console.log("oluyo");
            this.setState({
              noResult: true,
              title: "",
              city: "",
              category: "",
            });
            return;
          }
        });
      if (size >= 2) {
        const ret = filterEvents(size, result, queryRes);
        if (ret.length === 0) {
          this.setState({
            noResult: true,
            title: "",
            city: "",
            category: "",
          });
          return;
        } else {
          this.setState({
            title: "",
            category: "",
            city: "",
            results: ret,
            noResult: false,
          });
        }
      } else if (result.length !== 0) {
        this.setState({
          title: "",
          category: "",
          city: "",
          results: result,
          noResult: false,
        });
      }
    } else {
      toastr.info("oopps", "at least one search query is needed");
    }
  };

  render() {
    return (
      <div className="search">
        <main ref={this.mainRef} className="search__main">
          <div className="search__main__query">
            Lets search events ! you can search events by{" "}
            <label htmlFor="city">
              {" "}
              <span>City</span>
              <input
                onChange={this.handleInfo}
                type="text"
                id="city"
                name="city"
                value={this.state.city}
              ></input>
            </label>
            if you want you can try by{" "}
            <label htmlFor="category">
              {" "}
              <span>category</span>
              <select
                onChange={this.handleInfo}
                name="category"
                id="category"
                value={this.state.category}
              >
                <option disabled value=""></option>
                <option value="education">education</option>
                <option value="networking">networking</option>
                <option value="cultural">cultural</option>
                <option value="language">language</option>
                <option value="health">health</option>
                <option value="others">others</option>
              </select>
            </label>
            or let's try with{" "}
            <label htmlFor="title">
              {" "}
              <span>title</span>
              <input
                onChange={this.handleInfo}
                value={this.state.title}
                type="text"
                id="title"
                name="title"
              ></input>
            </label>
            <button type="submit" onClick={this.searchHandle}>
              {" "}
              Search
            </button>
          </div>
          <div className="results">
            {this.state.results &&
              this.state.results.map((i) => {
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    key={i.id}
                    to={{ pathname: `/event-detail/${i.id}` }}
                  >
                    <Result event={i} />
                  </Link>
                );
              })}
            {this.state.noResult && (
              <div> sorry we could not find any matching events</div>
            )}
          </div>
        </main>
        <aside ref={this.asideRef} className="recom">
          {this.asideRef.current && <h2>Event Recommendations:</h2>}
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
