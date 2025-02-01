/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import { fetchAllCommunities } from "../../redux/thunks/communityThunk";
import { useEffect } from "react";
// const communities = [
//   {
//     communityName: "Tech Enthusiasts",
//     category: "Technology",
//     membersJoined: 1500,
//     profileImage: "https://www.w3schools.com/w3images/avatar2.png"
//   },
//   {
//     communityName: "Fitness Freaks",
//     category: "Health & Fitness",
//     membersJoined: 1200,
//     profileImage: "https://www.w3schools.com/w3images/avatar6.png"
//   },
//   {
//     communityName: "Book Lovers",
//     category: "Literature",
//     membersJoined: 900,
//     profileImage: "https://www.w3schools.com/w3images/avatar5.png"
//   },
//   {
//     communityName: "Travel Explorers",
//     category: "Travel",
//     membersJoined: 1800,
//     profileImage: "https://www.w3schools.com/w3images/avatar4.png"
//   },
//   {
//     communityName: "Foodies Hub",
//     category: "Food",
//     membersJoined: 2000,
//     profileImage: "https://www.w3schools.com/w3images/avatar3.png"
//   },
//   {
//     communityName: "Tech Enthusiasts",
//     category: "Technology",
//     membersJoined: 1500,
//     profileImage: "https://www.w3schools.com/w3images/avatar2.png"
//   },
//   {
//     communityName: "Fitness Freaks",
//     category: "Health & Fitness",
//     membersJoined: 1200,
//     profileImage: "https://www.w3schools.com/w3images/avatar6.png"
//   },
//   {
//     communityName: "Book Lovers",
//     category: "Literature",
//     membersJoined: 900,
//     profileImage: "https://www.w3schools.com/w3images/avatar5.png"
//   },
//   {
//     communityName: "Travel Explorers",
//     category: "Travel",
//     membersJoined: 1800,
//     profileImage: "https://www.w3schools.com/w3images/avatar4.png"
//   },
//   {
//     communityName: "Foodies Hub",
//     category: "Food",
//     membersJoined: 2000,
//     profileImage: "https://www.w3schools.com/w3images/avatar3.png"
//   }
// ];

const SearchCommunities = () => {

const dispatch=useDispatch();
  const  { allCommunities:communities, status, error }  = useSelector((state) => state.communities);

  useEffect(()=>{
    if(communities.data.length===0)
    dispatch(fetchAllCommunities());
  },[dispatch,communities.data])

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  

  return (
    <div className="w-[85vh] mx-auto p-4">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore Communities</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search communities..."
          className="w-full p-2 border border-gray-300 rounded-l-md"
        />
        <button className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">Search</button>
      </div>

      {/* Categories Bar */}
      <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">All</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Technology</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Health & Fitness</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Food</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Travel</button>
      </div>

      {/* Community List */}
      <div className="space-y-4">
        {communities.data && communities.data.map((community, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
            <div className="flex items-center space-x-4">
              <img src={"https://www.w3schools.com/w3images/avatar3.png"} alt={community.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{community.name}</h4>
                <p className="text-sm text-gray-500">{community.category}</p>
                <p className="text-xs text-gray-400">{community.members.length} members</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCommunities;
