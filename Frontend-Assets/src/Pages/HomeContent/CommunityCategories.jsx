/* eslint-disable no-unused-vars */
import React from 'react';
import { IoIosFitness } from "react-icons/io";
import { BiJoystick } from "react-icons/bi";
import { MdOutlineSportsBaseball } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineQueueMusic } from "react-icons/md";

const categories = [
  { name: "Fitness", icon: <IoIosFitness className="text-4xl text-blue-900" />, bg: "bg-blue-300" },
  { name: "Sports", icon: <MdOutlineSportsBaseball className="text-4xl text-orange-900" />, bg: "bg-orange-300" },
  { name: "Gaming", icon: <BiJoystick className="text-4xl text-green-900" />, bg: "bg-green-300" },
  { name: "Music & Dance", icon: <MdOutlineQueueMusic className="text-4xl text-yellow-900" />, bg: "bg-yellow-300" },
  { name: "Political Affairs", icon: <IoEarthOutline className="text-4xl text-pink-900" />, bg: "bg-pink-300" },
  { name: "Computer Science & AI", icon: <RiComputerLine className="text-4xl text-green-900" />, bg: "bg-green-300" },
];

const CommunityCategories = () => {
  return (
    <section className="py-6 bg-white sm:py-8 lg:py-12">
      <hr className="border-t-2 border-blue-900 mx-auto w-3/4" />

      <div className="px-4 mt-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 text-center sm:gap-12">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-20 h-20 rounded-full ${category.bg} shadow-lg`}> 
                {category.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-black">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityCategories;
