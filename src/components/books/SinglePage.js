import React, { forwardRef } from "react";

const SinglePage = React.forwardRef((props, ref) => {
    return (
      <div className="demoPage" ref={ref}>
        <h1>Page Header</h1>
        <p>{props.children}</p>
        <p>Page number: {props.number}</p>
      </div>
    );
  });

export default SinglePage;