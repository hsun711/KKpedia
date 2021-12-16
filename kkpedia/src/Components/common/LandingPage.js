import React, { useState } from "react";
import styled from "styled-components";
import concert from "../../img/concert-list.jpg";
import LoginPage from "../common/LoginPage";

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
`;

const Cover = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 2;
`;

const WelcomePage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${concert});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  padding: 1vmin;
  @media screen and (max-width: 1200px) {
    padding-top: 8vmin;
  }
`;

const WelcomeText = styled.p`
  font-size: 4vmin;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3vmin;
  color: black;
  @media screen and (max-width: 1200px) {
    font-size: 5vmin;
  }
  @media screen and (max-width: 400px) {
    font-size: 6vmin;
    margin: 2vmin;
  }
`;

const WelcomeArea = styled.div`
  margin: 3vmin auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const StartBtn = styled.div`
  width: 12vmin;
  background: linear-gradient(to bottom right, #ef4765, #ff9a5a);
  border: 0;
  border-radius: 12px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  align-self: center;
  z-index: 99;
  font-size: 4vmin;
  font-weight: 600;
  line-height: 4vmin;
  outline: transparent;
  padding: 1vmin;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  &:focus {
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5),
      -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5),
      0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);
  }

  &:hover {
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5),
      -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5),
      0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);
  }
  @media screen and (max-width: 1200px) {
    width: 15vmin;
    font-size: 5vmin;
    line-height: 5vmin;
    padding: 2vmin;
  }
`;

function LandingPage() {
  const [popUpsignin, setPopUpsignin] = useState(false);

  const showSignIn = () => {
    setPopUpsignin(!popUpsignin);
  };

  return (
    <Container>
      <WelcomePage>
        {popUpsignin ? (
          <div>
            <Cover onClick={showSignIn} />
            <LoginPage />
          </div>
        ) : (
          <WelcomeArea>
            <WelcomeText>人生啊</WelcomeText>
            <WelcomeText>總要有一次奮不顧身</WelcomeText>
            <WelcomeText>去看偶像站在臺上閃閃發光的樣子</WelcomeText>
            <WelcomeText>看不了的日子就來 KKpedia 吧!</WelcomeText>
            <StartBtn onClick={showSignIn}>Start</StartBtn>
          </WelcomeArea>
        )}
      </WelcomePage>
    </Container>
  );
}

export default LandingPage;
