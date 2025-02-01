/* eslint-disable no-unused-vars */
import React from "react";
import CreateCommunityNav from "../../components/communityPageComponents/CreateCommunityNav";
import SearchCommunities from "../../components/communityPageComponents/SearchCommunities";
import JoinedCommunities from "../../components/communityPageComponents/JoinedCommunities";

const Community = () => {
  return (
    <div className="flex h-screen">
     <CreateCommunityNav/>
      
     <SearchCommunities/>
    
     <JoinedCommunities/>
    </div>
  );
};

export default Community;
