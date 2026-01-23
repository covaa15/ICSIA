import React from "react";
import PuntitoVerde from "./PuntitoVerde.jsx";

const IconoOnline = React.memo(({ isOnline }) => {
  console.log("IconoOnline render");
  return <PuntitoVerde isOnline={isOnline} />;
});

export default IconoOnline;