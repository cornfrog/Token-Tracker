import React from "react";

const ErrorList = (props) => {
  const errantFields = Object.keys(props.errors);
  if (errantFields.length > 0) {
    let index = 0;
    const listItems = errantFields.map((field) => {
      index++;
      return (
        <p key={index}>
          {field} {props.errors[field]}
        </p>
      );
    });
    return (
      <div className="error-list">
        {listItems}
      </div>
    );
  } else {
    return "";
  }
};

export default ErrorList;
