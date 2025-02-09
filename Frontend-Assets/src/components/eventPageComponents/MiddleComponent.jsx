import { useDispatch,useSelector } from "react-redux";
import { fetchAllEvents,fetchScheduledEvents } from "../../redux/thunks/eventThunk";
import { useEffect,useState } from "react";

const MiddleComponent = () => {
  const [query,setQuery]=useState("");
const user=useSelector((state)=>state.auth.user)
const dispatch=useDispatch();
  const  { allEvents:events, status, error }  = useSelector((state) => state.events);
  const [searchedResults,setSearchedResults]=useState(events?.data);

  useEffect(()=>{
    if(events.data.length===0)
    dispatch(fetchAllEvents());
    setSearchedResults(events.data)
  },[dispatch,events.data])

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  
  const handleRegister=async(communityId,eventId)=>{
    try{
      const response=await fetch(`/api/event/registerForEvent/${communityId}/${eventId}`,
       {
           method:"POST",
           headers: {
               'Content-Type': 'application/json', 
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
     dispatch(fetchScheduledEvents())
     return data;
   } catch (error) {
     throw new error;
   }
  }
 const handleSearch=(e)=>{
          const input = e.target.value;
          setQuery(input);
          const filteredResults=events.data.filter((item)=>item.name.toLowerCase().includes(input.toLowerCase()));
          setSearchedResults(filteredResults);
          console.log(searchedResults);
 }

 const searchEvents=async(query)=>{
  try {
    const response = await fetch(`/api/event/getEventsBySearch?search=${query}`, {
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

    // const Events = [
    //     {
    //       name: "Tech Enthusiasts",
    //       category: "Technology",
    //       membersJoined: 1500,
    //       profileImage: "https://www.w3schools.com/w3images/avatar2.png"
    //     },
    //     {
    //       name: "Fitness Freaks",
    //       category: "Health & Fitness",
    //       membersJoined: 1200,
    //       profileImage: "https://www.w3schools.com/w3images/avatar6.png"
    //     },
    //     {
    //       name: "Book Lovers",
    //       category: "Literature",
    //       membersJoined: 900,
    //       profileImage: "https://www.w3schools.com/w3images/avatar5.png"
    //     },
    //     {
    //       name: "Travel Explorers",
    //       category: "Travel",
    //       membersJoined: 1800,
    //       profileImage: "https://www.w3schools.com/w3images/avatar4.png"
    //     },
    //     {
    //       name: "Foodies Hub",
    //       category: "Food",
    //       membersJoined: 2000,
    //       profileImage: "https://www.w3schools.com/w3images/avatar3.png"
    //     },
    //     {
    //       name: "Tech Enthusiasts",
    //       category: "Technology",
    //       membersJoined: 1500,
    //       profileImage: "https://www.w3schools.com/w3images/avatar2.png"
    //     },
    //     {
    //       name: "Fitness Freaks",
    //       category: "Health & Fitness",
    //       membersJoined: 1200,
    //       profileImage: "https://www.w3schools.com/w3images/avatar6.png"
    //     },
    //     {
    //       name: "Book Lovers",
    //       category: "Literature",
    //       membersJoined: 900,
    //       profileImage: "https://www.w3schools.com/w3images/avatar5.png"
    //     },
    //     {
    //       name: "Travel Explorers",
    //       category: "Travel",
    //       membersJoined: 1800,
    //       profileImage: "https://www.w3schools.com/w3images/avatar4.png"
    //     },
    //     {
    //       name: "Foodies Hub",
    //       category: "Food",
    //       membersJoined: 2000,
    //       profileImage: "https://www.w3schools.com/w3images/avatar3.png"
    //     }
    //   ];
  return (
    <div className="w-[85vh] mx-auto p-4">

    <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore Events</h2>

    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Search events..."
        className="w-full p-2 border border-gray-300 rounded-l-md"
        value={query}
        onChange={handleSearch}
      />
      <button onClick={()=>searchEvents(query)} className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">Search</button>
    </div>

    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">All</button>
      <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Technology</button>
      <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Health & Fitness</button>
      <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Food</button>
      <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Travel</button>
    </div>

    <div className="space-y-4">
      {searchedResults.length>0 ? searchedResults.map((event, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
          <div className="flex items-center space-x-4">
            <img src={"https://www.w3schools.com/w3images/avatar2.png"} alt={event.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{event.name}</h4>
              <p className="text-sm text-gray-500">{event.category}</p>
              <p className="text-xs text-gray-400">{event.registeredBy.length} registered</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={()=>handleRegister(event.organizedBy,event._id)}>{event.registeredBy.includes(user._id) ?"Registered":"Register"}</button>
        </div>
      )) : <p>No results found</p> }
    </div>
  </div>
  )
}

export default MiddleComponent
