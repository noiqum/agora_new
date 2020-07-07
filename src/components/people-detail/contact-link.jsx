import React from "react";
//svg///////
import { ReactComponent as Facebook } from "../profile/svg/facebook.svg";
import { ReactComponent as Github } from "../profile/svg/github.svg";
import { ReactComponent as Linkedin } from "../profile/svg/linkedin.svg";
import { ReactComponent as Twitter } from "../profile/svg/twitter.svg";
import { ReactComponent as Email } from "../profile/svg/email.svg";
import { ReactComponent as Youtube } from "../profile/svg/youtube.svg";
import { ReactComponent as Instagram } from "../profile/svg/instagram.svg";

function ContactLink({ elm }) {
  const link = (elm, comp) => {
    return (
      <a className="contact-link_item" href={`${elm.link}`} target="blank">
        {comp}
      </a>
    );
  };

  const decide = () => {
    switch (elm.type) {
      case "facebook":
        return link(elm, <Facebook />);
      case "github":
        return link(elm, <Github />);
      case "twitter":
        return link(elm, <Twitter />);
      case "instagram":
        return link(elm, <Instagram />);
      case "linkedin":
        return link(elm, <Linkedin />);
      case "email":
        return link(elm, <Email />);
      case "youtube":
        return link(elm, <Youtube />);
      default:
        break;
    }
  };

  return <div className="contact-link">{decide(elm)}</div>;
}

export default ContactLink;
