import React from "react";

const PuntitoVerde = React.memo(({ isOnline }) => {
  console.log("PuntitoVerde render");

  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: isOnline ? "green" : "red",
        position: "absolute",
        bottom: 0,
        right: 0,
      }}
    />
  );
});

export default PuntitoVerde;
