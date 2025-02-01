const LeftComponent = () => {
    const communities = [
        {
          communityName: "Tech Enthusiasts",
          category: "Technology",
          membersJoined: 1500,
          profileImage: "https://www.w3schools.com/w3images/avatar2.png"
        },
        {
          communityName: "Fitness Freaks",
          category: "Health & Fitness",
          membersJoined: 1200,
          profileImage: "https://www.w3schools.com/w3images/avatar6.png"
        },
        {
          communityName: "Book Lovers",
          category: "Literature",
          membersJoined: 900,
          profileImage: "https://www.w3schools.com/w3images/avatar5.png"
        },
        {
          communityName: "Travel Explorers",
          category: "Travel",
          membersJoined: 1800,
          profileImage: "https://www.w3schools.com/w3images/avatar4.png"
        },
        {
          communityName: "Foodies Hub",
          category: "Food",
          membersJoined: 2000,
          profileImage: "https://www.w3schools.com/w3images/avatar3.png"
        },
        {
          communityName: "Tech Enthusiasts",
          category: "Technology",
          membersJoined: 1500,
          profileImage: "https://www.w3schools.com/w3images/avatar2.png"
        },
        {
          communityName: "Fitness Freaks",
          category: "Health & Fitness",
          membersJoined: 1200,
          profileImage: "https://www.w3schools.com/w3images/avatar6.png"
        },
        {
          communityName: "Book Lovers",
          category: "Literature",
          membersJoined: 900,
          profileImage: "https://www.w3schools.com/w3images/avatar5.png"
        },
        {
          communityName: "Travel Explorers",
          category: "Travel",
          membersJoined: 1800,
          profileImage: "https://www.w3schools.com/w3images/avatar4.png"
        },
        {
          communityName: "Foodies Hub",
          category: "Food",
          membersJoined: 2000,
          profileImage: "https://www.w3schools.com/w3images/avatar3.png"
        }
      ];
  return (
    <div className=" ">
    <div className="w-[65vh] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm pl-8">
          <h2 className="text-xl font-bold">Welcome</h2>
          <p className="text-gray-600 mt-2">Create your own event create the environment</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Create Events</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-white text-lg font-bold mr-4 ml-2">
        {/* Left Bottom Component */}
        <div className="w-full p-4  bg-gradient-to-rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-black mb-8">Your events</h3>
        
          {/* Community List with scroll and height limit */}
          <div className=" overflow-y-auto">
            <ul className="space-y-4">
              {communities.map((community, index) => (
                <li key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                  <img src={community.profileImage} alt={community.communityName} className="w-16 h-16 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-gray-800">{community.communityName}</h4>
                    <p className="text-sm text-gray-500">{community.category}</p>
                    <p className="text-xs text-gray-400">{community.membersJoined} members</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LeftComponent
