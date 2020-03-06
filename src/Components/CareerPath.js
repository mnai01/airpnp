import React from "react";
import classes from "./CareerPath.module.css";
import Banner from "../assets/ExoticBathroom2.jpg";
import Banner2 from "../assets/Thanos-Irwin.jpg";
// https://www.lipsum.com/ place holder text Lorem Ipsum

const CareerPath = () => {
  return (
    <div>
      <img src={Banner} alt={classes.Banner}></img>
      <p type="text" className={classes.Title}>
        About Us
      </p>
      <p type="text" className={classes.AboutUsText}>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
      <p type="text" className={classes.AboutUsText2}>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
      <p type=" text" className={classes.ContactUs}>
        Want to contact us personally? Our number is 631-431-5420
      </p>
      <img
        src={Banner2}
        alt="Hey Mandy, did you like how a erased of existence yo?"
      ></img>
    </div>
  );
};
export default CareerPath;
