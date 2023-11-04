import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <i className="fa-brands fa-twitter footer-items"></i>
          <i className="fa-brands fa-square-instagram footer-items"></i>
          <i className="fa-brands fa-facebook footer-items"></i>

          <a href="https://github.com/nickstauffer21" className="footer-link">
            <i className="fa-brands fa-github footer-items"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
