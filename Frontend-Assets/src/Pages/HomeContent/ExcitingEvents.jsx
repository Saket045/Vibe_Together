/* eslint-disable no-unused-vars */
import React from 'react'

const ExcitingEvents = () => {
  return (
    <div>
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="flex items-center justify-center px-4">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
            Book for Exciting Events
          </p>
        </div>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[ 
              { name: "Jenny Wilson", title: "Project Manager at Microsoft", img: "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-1.jpg" },
              { name: "Robert Fox", title: "Founder at Brain.co", img: "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-2.jpg" },
              { name: "Robert Fox", title: "Founder at Brain.co", img: "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-2.jpg" },
              { name: "Kristin Watson", title: "UX Designer at Google", img: "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-3.jpg" }
            ].map((person, index) => (
              <div key={index} className="overflow-hidden bg-white rounded-md shadow">
                <div className="px-6 py-8 md:px-8 md:py-12">
                  <div className="relative w-24 h-24 mx-auto">
                    <img className="relative object-cover w-24 h-24 mx-auto rounded-full" src={person.img} alt={person.name} />
                    <div className="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zM9.302 17.708C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base font-semibold text-black mt-6">{person.name}</p>
                  <p className="mt-1 text-base text-gray-600">{person.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExcitingEvents
