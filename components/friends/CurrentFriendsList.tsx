import React from "react";
import styled from "styled-components";

import CurrentFriendsListItem from "./CurrentFriendsListItem";
import constants from "../../utils/constants";

/* TODO: Dedup code between both friends page lists */

type friend = {
  username: string;
};

interface CurrentFriendsListProps {
  friends: Array<friend>;
  searchTerm: string;
}

const CurrentFriendsList = ({
  friends,
  searchTerm
}: CurrentFriendsListProps) => {
  const filteredFriends = friends.filter(friend =>
    friend.username.includes(searchTerm)
  );

  if (filteredFriends.length === 0) {
    return (
      <NoMatches>
        None of your friend's usernames match this search term.
      </NoMatches>
    );
  }

  return (
    <CurrentFriendsListWrapper>
      {filteredFriends.map(friend => (
        <CurrentFriendsListItem key={friend.username} friend={friend} />
      ))}
    </CurrentFriendsListWrapper>
  );
};

export default CurrentFriendsList;

const CurrentFriendsListWrapper = styled.ul`
  li {
    padding: 5px 10px;

    &:hover {
      background-color: #f5f6f7;
    }

    display: flex;
    justify-content: space-between;

    div {
      font-size: 15px;
      display: flex;
      align-items: center;
    }

    button {
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: ${constants.color};
      padding: 5px 8px;
      color: white;
      font-weight: normal;
      font-size: 15px;

      &:hover {
        background-color: #ea3232;
      }

      &:disabled {
        background-color: grey;
        cursor: not-allowed;
      }
    }
  }
`;

const NoMatches = styled.div`
  text-align: center;
  font-size: 15px;
  margin-top: 12px;
`;
