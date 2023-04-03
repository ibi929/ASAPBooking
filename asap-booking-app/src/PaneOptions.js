import React from "react";
import "./PaneOptions.css";
function PaneOptions({ name, Icon }) {
  return (
    <div className="paneOptions">
      <Icon className="paneOptions--icon" />
      <h2 className="paneOptions--iconName">{name}</h2>
    </div>
  );
}

export default PaneOptions;
