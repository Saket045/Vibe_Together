/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from "react-router-dom";
import groupPic from '../../assets/grouppic.jpg';

const CommunityNav = () => {
  return (
    <section className="relative py-6 sm:py-8 lg:py-12 xl:py-16 overflow-hidden bg-black">
      <div className="absolute inset-0 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
        <img
          className="object-cover w-full h-full md:object-[80%_top]"
          src={groupPic}
          alt="Community"
        />
      </div>
      <div className="absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent"></div>
      <div className="absolute inset-0 block bg-black/60 md:hidden"></div>

      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center md:w-2/3 lg:w-1/2 xl:w-1/3 md:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
            Step in, explore, and connect today!
          </h2>
          <p className="mt-4 text-base text-gray-200">
            Discover endless communities where you belong. Connect, share, and grow with like-minded people. Join now and be part of something bigger!
          </p>

          <form className="mt-8 lg:mt-10 w-full flex flex-col sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="flex w-full sm:w-auto">
              <input
                type="text"
                name="search"
                placeholder="Search here..."
                className="w-full py-3 px-4 text-black placeholder-gray-500 border-gray-200 rounded-md sm:rounded-r-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                required
              />
              {/* Search Button */}
              <button
                type="submit"
                className="px-4 py-3 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:bg-blue-700"
              >
                Search
              </button>
            </div>

            {/* Explore Button */}
            <Link
              to="/communityPage"
              className="px-4 py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-bold sm:mt-0 sm:ml-4 text-center"
            >
              Explore
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CommunityNav;
