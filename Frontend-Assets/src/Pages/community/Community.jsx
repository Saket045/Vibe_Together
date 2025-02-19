/* eslint-disable no-unused-vars */
import React from "react";
import CreateCommunityNav from "../../components/communityPageComponents/CreateCommunityNav";
import SearchCommunities from "../../components/communityPageComponents/SearchCommunities";
import JoinedCommunities from "../../components/communityPageComponents/JoinedCommunities";
import { useSelector } from "react-redux";
import CommunityBox from "../../components/communityPageComponents/CommunityBox";

const Community = () => {
  const showPage=useSelector((state)=>state.page.show)
  const pageTitle=useSelector((state)=>state.page.title)
  return (
    <div className="flex h-screen ">

    {showPage ? <div className="w-2/3 mx-2 mt-2 "><CommunityBox communityName={pageTitle}/> </div>:
    <div className="mx-2 w-2/3 flex">
        <CreateCommunityNav/>     
        <SearchCommunities/>
        </div>
    }
     <JoinedCommunities/>
    </div>
  );
};

export default Community;
