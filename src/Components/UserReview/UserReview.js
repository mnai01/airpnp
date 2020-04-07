//import React from "react";
import React, { useState } from "react";
import styles from "./UserReview.module.css";

const UserReview = () => {
  const [review, setreview] = useState("");
  const sendToDatabase = e => {
    if (e.key === "Enter") {
      e.target.value = "";
      alert("Thank you for your feedback.");
    }
  };
  const sendToDataBaseOnClick = () => {
    alert("Thank you for your feedback.");
    window.location.reload(false);
    setreview("");
  };

  return (
    <div>
      <p>User Review Box. Your response will be saved to our Database.</p>
      <textarea
        type="text"
        placeholder="Enter review here."
        className="ReviewBox"
        name={review}
        onKeyPress={sendToDatabase}
      ></textarea>
      <br></br>
      <button onClick={sendToDataBaseOnClick}>Send Review</button>
    </div>
  );
};

export default UserReview;
