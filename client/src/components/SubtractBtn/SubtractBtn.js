import React from "react";
import "./SubtractBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SubtractBtn(props) {
  return (
    <span className="subtract-btn" {...props} role="button" tabIndex="0">
      -
    </span>
  );
}

export default SubtractBtn;