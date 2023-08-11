import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <h4>Built by Jonathan Carter <br/> Software Engineer</h4>
      <h4 className="link">
        <a target="_blank" href="https://www.linkedin.com/in/jonathan-carter-12b600174/">
        LinkedIn
        </a>
      </h4>
      <h4 className="link">
        <a target="_blank" href="https://github.com/JonathanSCarter">
        Github
        </a>
      </h4>
    </div>
  );
}

export default Footer;
