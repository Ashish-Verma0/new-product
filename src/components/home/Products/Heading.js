import React from "react";

const Heading = ({ heading }) => {
  return <div className="text-3xl font-semibold pb-6">{heading}</div>;
};

export default React.memo(Heading);
