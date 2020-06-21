import React, { Component } from "react";
import { connect } from "react-redux";
import user from "../../css/images/user.png";
import { ageCalculate, convertToArray } from "../../config/utils";
import { updateAboutMeClick } from "../../store/actions/profileActions";
import gsap from "gsap/gsap-core";

export class about extends Component {
  state = {
    bio: "",
    interest: [],
    job: "",
  };

  aboutRef = React.createRef();
  componentDidMount() {
    this.setState({
      bio: this.props.bio,
      interest: this.props.interest,
      job: this.props.job,
    });
    if (this.aboutRef.current) {
      gsap.from(".about", {
        opacity: 0,
        duration: 2,
        y: 100,
        ease: "power3.inout",
      });
    }
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  interestChangeHandler = (e) => {
    let converted = convertToArray(e.target.value);
    this.setState({
      interest: converted,
    });
  };

  updateHandler = () => {
    const { job, bio, interest } = this.state;
    this.props.onUpdate(bio, job, interest, this.props.id);
    console.log("clc");
  };

  render() {
    const { profilePhoto, birthday, name } = this.props;
    const { job, bio, interest } = this.state;
    ageCalculate(birthday);
    return (
      <div ref={this.aboutRef} className="about">
        <h2 className="about__title">About me</h2>
        <div className="about__header">
          {profilePhoto ? (
            <img
              className="about__img"
              src={`${profilePhoto.downloadUrl}`}
              alt="profile_pic"
            />
          ) : (
            <img className="about__img" src={user} alt="profile_pic" />
          )}
          <div className="about__info">
            {name},{ageCalculate(birthday)}
            {job}
            <div>
              <span>
                interest:
                {interest &&
                  interest.map((i) => {
                    return <span>{i},</span>;
                  })}
              </span>
            </div>
          </div>
        </div>
        <div className="about__main">
          <label htmlFor="job" className="about__main-label">
            Job
          </label>
          <input
            onChange={this.changeHandler}
            value={job}
            name="job"
            type="text"
            className="about__main-input"
          />
          <label htmlFor="bio" className="about__main-label">
            bio
          </label>
          <textarea
            name="bio"
            onChange={this.changeHandler}
            value={bio}
            type="textarea"
            className="about__main-input"
            maxLength="1000"
            rows="5"
          />
          <label htmlFor="interest" className="about__main-label">
            interest
          </label>
          <input
            onChange={this.interestChangeHandler}
            name="interest"
            type="text"
            className="about__main-input"
            placeholder="separate with commas cinema,art,sports"
          />
        </div>
        <button onClick={this.updateHandler} className="about__button">
          Update
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profilePhoto: state.auth.user.profilePhoto,
  name: state.auth.user.displayName,
  birthday: state.auth.user.birthday,
  id: state.auth.user.id,
  interest: state.auth.user.interest,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (job, bio, interest, id) => {
      dispatch(updateAboutMeClick(job, bio, interest, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(about);
