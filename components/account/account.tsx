import React from "react";
import styled from "styled-components";

import constants from "../../utils/constants";

const AccountPageHeader = () => (
  <React.Fragment>
    <h1>Talq</h1>
    <h2>A Facebook Messenger Clone</h2>
  </React.Fragment>
);

export const AccountPageWrapper = ({ children }) => (
  <Main>
    <AccountPageWrapperInternal>
      <AccountPageHeader />
      {children}
    </AccountPageWrapperInternal>
  </Main>
);

export default AccountPageWrapper;

const Main = styled.main`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const AccountPageWrapperInternal = styled.div`
  text-align: center;

  h1 {
    margin-bottom: 6px;
    font-size: 36px;
  }

  h2 {
    margin-bottom: 32px;
  }

  form {
    fieldset {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: none;
      width: 286px;
      margin: 0 auto;
      margin-bottom: 16px;

      input,
      button {
        border-radius: 4px;
        font-size: 17px;
        width: 286px;
        height: 42px;
      }

      input {
        padding: 0 16px;
        border: ${constants.borderVertical};
        margin-bottom: 10px;
        text-align: center;

        &:focus {
          border: 1px solid #0084ff;
        }

        &:disabled {
          border: ${constants.borderVertical};
        }
      }

      button {
        border: 1px solid #0084ff;
        background-color: ${constants.color};
        color: white;
        font-weight: normal;
        cursor: pointer;

        &:focus {
          box-shadow: 0 0 1px 2px rgba(88, 144, 255, 0.75),
            0 1px 1px rgba(0, 0, 0, 0.15);
        }

        &:active,
        &:disabled {
          opacity: 0.6;
        }
      }
    }

    span {
      a {
        text-decoration: none;
        color: ${constants.color};
      }
    }
  }
`;
