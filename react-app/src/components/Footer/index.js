import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <h4>Built by Jonathan Carter, Aspiring Software Engineer</h4>
      <h4 className="link">
        LinkedIn:{" "}
        <a href="https://www.linkedin.com/in/jonathan-carter-12b600174/">
          https://www.linkedin.com/in/jonathan-carter-12b600174/
        </a>
      </h4>
      <h4 className="link">
        Github:{" "}
        <a href="https://github.com/JonathanSCarter">
          https://github.com/JonathanSCarter
        </a>
      </h4>
    </div>
  );
}

export default Footer;
