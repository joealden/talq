import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import loggedIn from "../utils/loggedIn";
import NotLoggedIn from "../components/account/NotLoggedIn";

import Layout from "../components/layout";
import ShowApolloError from "../components/ApolloError";
import CurrentFriends from "../components/friends/CurrentFriends";
import AllUsers from "../components/friends/AllUsers";
import constants from "../utils/constants";
import { USER_FRIENDS_AND_ALL_USERS_QUERY } from "../components/friends/utils";

const FriendsPage = () => {
  /* Makes sure client side routing checks for auth */
  if (typeof window !== "undefined" && !loggedIn()) {
    return <NotLoggedIn />;
  }

  return (
    <Query query={USER_FRIENDS_AND_ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) {
          return (
            <Layout mainTitle="Friends">
              <CenterDiv>
                <p>Loading...</p>
              </CenterDiv>
            </Layout>
          );
        }

        if (data && data.user && data.users) {
          return (
            <Layout mainTitle="Friends">
              <FriendsWrapper>
                <ShowApolloError error={error} />
                <FriendsColumn>
                  <div>
                    <h3>Current Friends</h3>
                  </div>
                  <CurrentFriends friends={data.user.friends} />
                </FriendsColumn>
                <FriendsColumn>
                  <div>
                    <h3>All Users</h3>
                  </div>
                  <AllUsers users={data.users} friends={data.user.friends} />
                </FriendsColumn>
              </FriendsWrapper>
            </Layout>
          );
        }

        return null;
      }}
    </Query>
  );
};

export default FriendsPage;

const FriendsWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  & > div:first-child {
    border-right: ${constants.borderHorizontal};
  }
`;

const titleSectionHeight = 40;

const FriendsColumn = styled.div`
  display: flex;
  flex-direction: column;

  & > :first-child {
    border-bottom: ${constants.borderHorizontal};
    height: ${titleSectionHeight}px;
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
      font-size: 16px;
      text-align: center;
    }
  }

  & > :last-child {
    height: calc(100vh - ${constants.headerHeight + titleSectionHeight}px);
    overflow: auto;
  }
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
