const RightComponent = () => {
  // Sample user data
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

  // Sample community data
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
    }
  ];

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

      {/* Communities Section */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Scheduled Events</h2>
        <p className="text-sm text-gray-500 mb-4">Remain updated with the events you have scheduled</p>
        <div className="space-y-4">
          {communities.map((community, index) => (
            <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
              <img src={community.profileImage} alt={community.communityName} className="w-16 h-16 rounded-full object-cover" />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">{community.communityName}</h4>
                <p className="text-xs text-gray-400">{community.membersJoined} members</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightComponent;
