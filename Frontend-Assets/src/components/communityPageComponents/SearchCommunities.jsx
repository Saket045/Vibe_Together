/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import { fetchAllCommunities,fetchJoinedCommunities } from "../../redux/thunks/communityThunk";
import { useEffect,useState } from "react";
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
  const [query,setQuery]=useState("");
const user=useSelector((state)=>state.auth.user);
const dispatch=useDispatch();
  const  { allCommunities:communities, status, error }  = useSelector((state) => state.communities);
  const [searchedResults,setSearchedResults]=useState(communities?.data);
  
  useEffect(()=>{
    if(communities.data.length===0)
    dispatch(fetchAllCommunities());
    setSearchedResults(communities.data)
  },[dispatch,communities.data])

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  
  const handleJoin=async(communityName)=>{
    try{
      const response=await fetch(`/api/community/joinCommunity/${communityName}`,
       {
           method:"POST",
           headers: {
               'Content-Type': 'application/json', // Specify JSON content type
               'Cache-Control': 'no-cache, no-store, must-revalidate',
               'Pragma': 'no-cache',
               'Expires': '0'
             }
       }
      )
      if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
     const data = await response.json();
     setSearchedResults((prevResults) =>
      prevResults.map((comm) =>
        comm.name === communityName
          ? { ...comm, members: [...comm.members, user._id] } // Create a new object with updated members
          : comm
      )
    );
    
     dispatch(fetchJoinedCommunities())
     return data;
   } catch (error) {
     throw new error;
   }
  }
  const handleSearch=async(e)=>{
    const input=e.target.value;
    setQuery(input);
    const filteredResults=communities.data.filter((item)=>item.name.toLowerCase().includes(input.toLowerCase()));
    setSearchedResults(filteredResults);
  }  
  const searchCommunities=async(query)=>{
    try {
      const response = await fetch(`/api/community/getCommunitiesBySearch?search=${query}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate', 
          'Pragma': 'no-cache', 
          'Expires': '0'
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSearchedResults(data);
      return data;
    } catch (error) {
      return (error.response?.data || 'Error fetching communities');
    }
  }
   
  return (
    <div className="w-[85vh] mx-auto p-4">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore Communities</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search communities..."
          className="w-full p-2 border border-gray-300 rounded-l-md"
        />
        <button  onClick={()=>searchCommunities(query)} className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">Search</button>
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
        {searchedResults.length>0 ? searchedResults.map((community, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
            <div className="flex items-center space-x-4">
              <img src={"https://www.w3schools.com/w3images/avatar3.png"} alt={community.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{community.name}</h4>
                <p className="text-sm text-gray-500">{community.category}</p>
                <p className="text-xs text-gray-400">{community.members.length} members</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
             onClick={()=>handleJoin(community.name)}>{community.members.includes(user._id) ? "Joined":"Join"}</button>
          </div>
        )) : <h1>No results found</h1> }
      </div>
    </div>
  );
};

export default SearchCommunities;
