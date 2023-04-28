import React from "react";
import "./PaneOptions.css";
function PaneOptions({ name, Icon }) {
  return (
    <div className="paneOptions">
      <button>
        <Icon className="paneOptions--icon" />
        <h2 className="paneOptions--iconName">{name}</h2>
      </button>
    </div>
  );
}

export default PaneOptions;
