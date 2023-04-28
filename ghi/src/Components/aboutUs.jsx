import React from "react";

const AboutUs = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex justify-center items-center w-full h-[150px] bg-white pt-20">
        <div className="text-[#203330] font-bold text-6xl text-center">
          Meet the BYOB Team
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
            Our Story
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 ">
            Our website is a platform that promotes the power of social media,
            gardening, and connection. We provide gardening tips and encourage
            individuals to share their experiences with our like-minded
            community. Our aim is to create a network of gardeners who inspire
            and support each other through social media, while also making a
            positive impact on the environment. Join us in cultivating a greener
            world, one garden at a time.
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="rounded-lg md:block hidden"
                src="https://i.gyazo.com/2b02f51c1432fafd6e723a67ed0bcc63.png"
                alt="Edward featured Img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Edward
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="rounded-lg md:block hidden"
                src="https://i.gyazo.com/99d70b7b6195325bb0d3f12901391590.jpg"
                alt="Garrett featured Img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Garrett
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="rounded-lg md:block hidden"
                src="https://i.gyazo.com/ee09e79fca3f11a9aacd29fba9137ce4.png"
                alt="David featured Img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                David
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="rounded-lg md:block hidden"
                src="https://i.gyazo.com/c659552fa9d7d4148c9d9454e27196e0.png"
                alt="Timi featured img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Timi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
