import React, { useState } from "react";

function Carousel() {
  const [activeSlide, setActiveSlide] = useState(1);

  const goToPrevSlide = () => {
    setActiveSlide(activeSlide > 1 ? activeSlide - 1 : 4);
  };

  const goToNextSlide = () => {
    setActiveSlide(activeSlide < 4 ? activeSlide + 1 : 1);
  };

  return (
    <div className="mt-20">
      <div className="flex justify-center max-w-7xl pb-28 mx-auto">
        <div
          id="carouselExampleCaptions"
          className="relative max-w-full"
          data-te-carousel-init
          data-te-carousel-slide
        >
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
            <div
              className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                activeSlide === 1 ? "opacity-100" : "opacity-0"
              }`}
              data-te-carousel-active
              data-te-carousel-item
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                className="block w-full rounded-[50px]"
                alt="..."
              />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                <h5 className="text-xl">First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div
              className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                activeSlide === 2 ? "opacity-100" : "opacity-0"
              }`}
              data-te-carousel-item
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
                className="block w-full rounded-[50px]"
                alt="..."
              />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                <h5 className="text-xl">Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>

            <div
              className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                activeSlide === 3 ? "opacity-100" : "opacity-0"
              }`}
              data-te-carousel-item
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
                className="block w-full rounded-[50px]"
                alt="..."
              />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                <h5 className="text-xl">Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>

            <div
              className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                activeSlide === 4 ? "opacity-100" : "opacity-0"
              }`}
              data-te-carousel-item
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
                className="block w-full rounded-[50px]"
                alt="..."
              />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                <h5 className="text-xl">Fourth slide label</h5>
                <p>
                  Some representative placeholder content for the fourth slide.
                </p>
              </div>
            </div>
          </div>

          <button
            className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide="prev"
            onClick={goToPrevSlide}
          >
            <span className="inline-block h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </button>

          <button
            className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide="next"
            onClick={goToNextSlide}
          >
            <span className="inline-block h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Next
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
