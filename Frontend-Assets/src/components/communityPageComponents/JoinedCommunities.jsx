import { useDispatch,useSelector } from "react-redux";
import { fetchJoinedCommunities } from "../../redux/thunks/communityThunk";
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

const JoinedCommunities = () => {

  const dispatch=useDispatch();
  const  { joinedCommunities, status, error }  = useSelector((state) => state.communities);

  useEffect(()=>{
    if(joinedCommunities.data.length===0)
    dispatch(fetchJoinedCommunities());
  },[dispatch,joinedCommunities.data])
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className='flex flex-col h-screen w-[60vh]'>
      {/* Heading */}
      <div className="text-2xl font-bold text-gray-800 mb-2">
        Joined Communities
      </div>
      
      {/* Subheading Description */}
      <div className="text-sm text-gray-500 mb-6">
        Explore the communities you have joined
      </div>

      {/* Community List */}
      <div className="space-y-4">
        {joinedCommunities && joinedCommunities.data.map((community, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
          >
            <img
              src={"https://www.w3schools.com/w3images/avatar6.png"}
              alt={community.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-800">{community.name}</h4>
              <p className="text-xs text-gray-400">{community.members.length} members</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedCommunities;
