import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./carousel.style.scss";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

interface IDemoCarousalImages {
  images: string[];
}
export function DemoCarousel({ images }: IDemoCarousalImages) {
  const renderArrowNext = (
    clickHandler: () => void
  ) => {
    return (
      <div
        onClick={clickHandler}
        className="carousel-arrow next"
        style={{ backgroundColor: "transparent", padding: "0", }}
      >
        <ArrowForwardIosOutlinedIcon />
      </div>
    );
  };
  const renderArrowPrev = (
    clickHandler: () => void,
  ) => {
    return (
      <div onClick={clickHandler} className="carousel-arrow prev"
      style={{ backgroundColor: "transparent", padding: "0", }}
      >
        <ArrowBackIosNewOutlinedIcon />
      </div>
    );
  };
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      interval={3000}
      showStatus={false}
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
    >
      <div style={{ borderRadius: "8px" }}>
        <img src={images[0]} style={{ borderRadius: "8px 8px 0px 0px " }} />
      </div>
      <div style={{ borderRadius: "8px" }}>
        <img src={images[1]} style={{ borderRadius: "8px 8px 0px 0px " }} />
      </div>
      <div style={{ borderRadius: "8px" }}>
        <img src={images[2]} style={{ borderRadius: "8px 8px 0px 0px " }} />
      </div>
    </Carousel>
  );
}
