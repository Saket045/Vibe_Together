import { useDispatch,useSelector } from "react-redux";
import { fetchScheduledEvents } from "../../redux/thunks/eventThunk";
import { useEffect } from "react";

const RightComponent = () => {

const dispatch=useDispatch();
  const  { scheduledEvents:events, status, error }  = useSelector((state) => state.events);

  useEffect(()=>{
    if(events.data.length===0)
    dispatch(fetchScheduledEvents());
  },[dispatch,events.data])

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  

  const users = [
    {
      name: "Amit Sharma",
      profilePicture: "https://www.w3schools.com/w3images/avatar2.png",
      eventsAttended: 10
    },
    {
      name: "Priya Verma",
      profilePicture: "https://www.w3schools.com/w3images/avatar6.png",
      eventsAttended: 15
    },
    {
      name: "Rajesh Kumar",
      profilePicture: "https://www.w3schools.com/w3images/avatar5.png",
      eventsAttended: 8
    }
  ];

  // Sample event data
  // const events  = [
  //   {
  //     name: "Tech Enthusiasts",
  //     category: "Technology",
  //     membersJoined: 1500,
  //     profileImage: "https://www.w3schools.com/w3images/avatar2.png"
  //   },
  //   {
  //     name: "Fitness Freaks",
  //     category: "Health & Fitness",
  //     membersJoined: 1200,
  //     profileImage: "https://www.w3schools.com/w3images/avatar6.png"
  //   },
  //   {
  //     name: "Book Lovers",
  //     category: "Literature",
  //     membersJoined: 900,
  //     profileImage: "https://www.w3schools.com/w3images/avatar5.png"
  //   }
  // ];

  return (
    <div className="flex flex-col h-screen w-[60vh] p-4">
      {/* Users Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Featured Users</h2>
        <p className="text-sm text-gray-500 mb-4">Active members who have attended events</p>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
              <img src={user.profilePicture} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">{user.name}</h4>
                <p className="text-xs text-gray-400">{user.eventsAttended} events attended</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* events && events? Section */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Scheduled Events</h2>
        <p className="text-sm text-gray-500 mb-4">Remain updated with the events you have scheduled</p>
        <div className="space-y-4">
          {events.data && events.data?.map((event, index) => (
            <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
              <img src={"https://www.w3schools.com/w3images/avatar5.png"} alt={event.name} className="w-16 h-16 rounded-full object-cover" />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">{event.name}</h4>
                <p className="text-xs text-gray-400">{event.registeredBy.length} registered</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightComponent;
