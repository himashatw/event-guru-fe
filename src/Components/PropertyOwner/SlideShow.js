import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./SlideShow.css";
import PackageCard from "./PackageCard";

const responsive = {
  0: {
    items: 1.3,
  },
  375: {
    items: 1,
  },
  411: {
    items: 1.3,
  },
  414: {
    items: 1.3,
  },
  600: {
    items: 2,
  },
  1400: {
    items: 4,
  },
  900: {
    items: 2.6,
  },
  1000: {
    items: 3,
  },
  1100: {
    items: 3,
  },
  1800: {
    items: 4.9,
  },
};
let slider;
const slideNext = () => {
  slider.next(500);
};
const slidePrev = () => {
  slider.prev(500);
};
const slidePrevKeyBoard = (e) => {
  if (e.keyCode === 37) {
    slidePrev();
  }
};
const slideNextKeyBoard = (e) => {
  if (e.keyCode === 39) {
    slideNext();
  }
};

const SlideShow = ({ data }) => {
  return (
    <div className="past-speaker-container" style={{ zIndex: "1000" }}>
      <h4>
        {""}&nbsp; {""}
      </h4>
      <div className="nav-button-wrapper">
        <div className="view-more">View More</div>
        <div
          className="owl-button-prev"
          onClick={slidePrev}
          onKeyDown={slidePrevKeyBoard}
          role="button"
          tabIndex={0}
        >
          <i className="far fa-arrow-alt-circle-left" />
        </div>
        <div
          className="owl-button-next"
          onClick={slideNext}
          onKeyDown={slideNextKeyBoard}
          role="button"
          tabIndex={0}
        >
          <i className="far fa-arrow-alt-circle-right" />
        </div>
      </div>

      <div className="container-fluid">
        <OwlCarousel
          className="owl-theme"
          dots={true}
          margin={70}
          responsive={responsive}
          ref={(slide) => {
            slider = slide;
          }}
        >
          {data.map((packageItem, index) => (
            <span
              key={index}
              onClick={() => {
                console.log(index);
              }}
            >
              <PackageCard cardContent={packageItem} />
            </span>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default SlideShow;
