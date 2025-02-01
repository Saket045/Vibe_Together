/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import groupPic from "../../assets/events.jpg";

const EventNav = () => {
  return (
    <section className="relative py-6 overflow-hidden bg-black sm:py-8 lg:py-12 xl:py-16">
      {/* Background Image */}
      <div className="absolute inset-0 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
        <img
          className="object-cover w-full h-full md:object-[80%_top]"
          src={groupPic}
          alt="Event"
        />
      </div>

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent"></div>
      <div className="absolute inset-0 block bg-black/60 md:hidden"></div>

      {/* Content Container */}
      <div className="relative px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="text-center md:w-3/4 lg:w-1/2 xl:w-1/3 md:text-left">
          {/* Heading */}
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            Book now to be part of the event!
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-200 sm:text-base lg:text-lg">
            Secure your place today for unforgettable experiences, new
            connections, and thrilling moments that will inspire you!
          </p>

          {/* Search & Button Group */}
          <form action="#" method="GET" className="mt-6 lg:mt-8">
            <div className="flex flex-col sm:flex-row lg:items-centerlg:justify-center w-full">
              {/* Search Input */}
              <div className="flex w-full sm:w-auto">
                <div className="relative flex-1 min-w-0">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search here..."
                    className="block w-full py-3 pl-4 pr-4 text-sm sm:text-base text-black placeholder-gray-500 transition-all duration-200 border-gray-300  sm:rounded-l-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                  />
                </div>

                {/* Search Button */}
                <button
             type="submit"
             className="px-4 py-3 text-white bg-blue-600 sm:rounded-r-md hover:bg-blue-700 focus:bg-blue-700"
                >
                  Search
                </button>
              </div>

              {/* Explore Button */}
              <Link
                to={"/eventPage"}
                className="px-4 py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-bold sm:mt-0 sm:ml-4 text-center"
              >
                Explore
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventNav;
