import React, { useState, useEffect } from "react";
import "../styles/Carousel.css";

const images = [
  "https://assets.b9.com.br/wp-content/uploads/2019/09/it-chapter-two-3840x2160-2019-4k-18501.jpg", 
  "https://m.media-amazon.com/images/I/610VB6zRVnL._AC_UF1000,1000_QL80_.jpg",
  "https://e0.pxfuel.com/wallpapers/564/513/desktop-wallpaper-diary-of-a-wimpy-kid.jpg",
  "https://uploads.jovemnerd.com.br/wp-content/uploads/2016/11/duna.jpg",
  "https://c4.wallpaperflare.com/wallpaper/969/103/643/game-of-thrones-sigils-house-stark-wallpaper-preview.jpg",
  "https://i.pinimg.com/1200x/33/a3/e6/33a3e6181c7730512f73a3c20c877748.jpg"
 
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="carousel-item" key={index}>
            <img src={image} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
