/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const socialIcons = {
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    github: <FaGithub />,
  };
const Footer = () => {
  return (
    <div>
      <hr className="border-1 mt-8 mb-4 border-blue-700 mx-12 " />
    <footer className="bg-gray-50 py-4 sm:py-4 lg:py-6">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          
          {/* Logo & About Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Vibe<span className="text-pink-500">@</span>Together
            </Link>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Discover a dynamic platform to create and join vibrant communities, host engaging events, and easily book your spot. Connect, collaborate, and be part of unforgettable experiences!
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-600 uppercase">Contact Us</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-800 hover:text-blue-600">
                  +91 7880974597
                </a>
              </li>
              <li>
                <a href="mailto:saketnigam7@gmail.com" className="text-base text-gray-800 hover:text-blue-600">
                  saketnigam7@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-600 uppercase">Follow Us</p>
            <div className="flex justify-center sm:justify-start space-x-4 mt-4">
      {["facebook", "twitter", "instagram", "github"].map((icon, index) => (
        <a
          key={index}
          href="#"
          className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-blue-600 transition"
        >
          {socialIcons[icon] || null}
        </a>
      ))}
    </div>
          </div>

          {/* Mentorship Section */}
          <div className="col-span-1 lg:col-span-2">
            <p className="text-sm font-semibold tracking-widest text-gray-600 uppercase">Want Mentorship?</p>
            <a
              href="https://inspirationapp.org/"
              className="mt-3 inline-block text-base text-black hover:text-blue-600 transition"
            >
              Join <span className="text-purple-700 underline">Inspiration App</span>
            </a>
            <p className="mt-2 text-gray-600 text-sm">
              A platform for personalized, one-on-one guidance and growth opportunities.
            </p>
          </div>

        </div>
      </div>
    </footer>
    </div>
  );

};

export default Footer;
