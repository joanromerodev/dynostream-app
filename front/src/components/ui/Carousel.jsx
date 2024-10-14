/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function CarouselUI() {
  return (
    <Carousel
      className="rounded-xl"
      autoplay={true}
      transition={{ duration: 2 }}
      loop={true}
    >
      <img
        src="/img/carousel/banner_1.jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="/img/carousel/banner_2.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="/img/carousel/banner_3.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
      <img
        src="/img/carousel/banner_4.jpg"
        alt="image 4"
        className="h-full w-full object-cover"
      />
      <img
        src="/img/carousel/banner_5.jpg"
        alt="image 5"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}

const ContentsCarousel = ({ contents }) => {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "50px",
    pauseOnHover: true,
    swipeToSlide: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  };
  const navigate = useNavigate();
  return (
    // The Slider will iterate over received contents as props
    <Slider {...settings} className="md:px-5">
      {contents.slice(0, 5).map((content, index) => (
        <div
          key={index}
          className="relative
      rounded-xl text-primary-500 shadow-lg h-80 !flex items-end group transition-all ease-in-out duration-300 hover:cursor-pointer outline-none"
          onClick={() => {
            navigate(`/content/${content._id}`);
          }}
        >
          <img
            className="max-h-80 w-full object-cover rounded-xl"
            src={content.image}
            alt="/"
          />
          <div className="hidden absolute bg-black/80 p-2 rounded-b-xl w-full group-hover:flex">
            <p className="text-white font-semibold font-poppins">
              {content.title}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export { CarouselUI, ContentsCarousel };
