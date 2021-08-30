import React from "react";

const Qualitie = ({ color, id, name }) => {
  const getBageclasses = (color) => {
    let classes = `badge m-2 bg-${color}`;
    return classes;
  };

  return (
    <span key={id} className={getBageclasses(color)}>
      {name}
    </span>
  );
};

export default Qualitie;
