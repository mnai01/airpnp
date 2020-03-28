import React, { useState } from "react";
import classes from "./Modal.module.css";
import Aux from "../../hoc/auxHOC/auxHOC";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  // helps prevent the ordersummary from updating when
  // building your burger. It should only update when ORDER NOW
  // is clicked
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show;
  // }

  // componentDidUpdate() {
  //   console.log("[Modal] Will Update");
  // }

  const [showBackdrop, setBackdrop] = useState(false);

  const backdropClickHandler = () => {
    setBackdrop(false);
    props.changeModalFalse();
  };

  if (props.show && showBackdrop != true) {
    setBackdrop(true);
  }

  let backdrop;
  if (showBackdrop) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <Aux>
      {backdrop}
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
