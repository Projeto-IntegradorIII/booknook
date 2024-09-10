import React from "react";
import "../styles/Carousel.css";

function Carousel() {
  return (
    <div className="carousel-container">
      <div className="carousel-item">
        <img src={require("../imgs/bannerb.jpg")} alt="Banner" />
      </div>
    </div>
  );
}

export default Carousel;
