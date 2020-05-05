import React from "react";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.about}>
        <h2>Airpnp</h2>
        <p>
          Airpnp is an app which allowed you to find public/private bathrooms
        </p>
      </div>
      <div className={classes.repos}>
        <h3>Who Are We?</h3>
        <ul>
          <li>
            <a href="https://github.com/mnai01">Ian Matlak</a>, Mobile + Web App
            &amp; Frontend
          </li>
          <li>
            <a href="https://github.com/warbrain11">Brandon Berke</a>,Backend
            API
          </li>
        </ul>
      </div>
      <div className={classes.copy}>
        <p>Copyright &copy; 2020</p>
      </div>
    </footer>
  );
};

export default Footer;
