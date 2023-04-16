import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", width: "30%"}}>
        <div>
          <Link to="/register">register</Link>
        </div>
        <div>
          <Link to="/login">login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
