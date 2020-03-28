import React from "react";
import classes from "./ErroPage.module.css";
import ErrorIMG from "../../assets/404error.jpg";
const ErroPage = () => {
  return (
    <div className={classes.container}>
      <img src={ErrorIMG}></img>
    </div>
  );
};

export default ErroPage;
