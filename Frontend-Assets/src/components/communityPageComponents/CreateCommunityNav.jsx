import { useDispatch,useSelector } from "react-redux";
import { fetchYourCommunities } from "../../redux/thunks/communityThunk";
import { useEffect } from "react";
const CreateCommunityNav = () => {

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
  //"https://www.w3schools.com/w3images/avatar3.png"

  const dispatch=useDispatch();
  const  { yourCommunities, status, error }  = useSelector((state) => state.communities);

  useEffect(()=>{
    if(yourCommunities.data.length===0)
    dispatch(fetchYourCommunities());
  },[dispatch,yourCommunities.data])

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  
  return (
    <div className=" ">
      <div className="w-[65vh] flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm pl-8">
            <h2 className="text-xl font-bold">Welcome</h2>
            <p className="text-gray-600 mt-2">Create your own community <br />and connect with others.</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Create Community</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-white text-lg font-bold mr-4 ml-2">
          {/* Left Bottom Component */}
          <div className="w-full p-4  bg-gradient-to-rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-8">Your Communities</h3>
          
            {/* Community List with scroll and height limit */}
            <div className=" overflow-y-auto">
              <ul className="space-y-4">
                {yourCommunities.data && yourCommunities.data?.map((community, index) => (
                  <li key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                    <img src={"https://www.w3schools.com/w3images/avatar2.png"} alt={community.name} className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <h4 className="text-lg font-semibold text-gray-800">{community.name}</h4>
                      <p className="text-sm text-gray-500">{community.category}</p>
                      <p className="text-xs text-gray-400">{community.members.length} members</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityNav;
