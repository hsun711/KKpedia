import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Loading from "../common/Loading";
import socialMediaAuth from "../../utils/socialMediaAuth";
import fb from "../../img/facebook.png";
import google from "../../img/google.png";
import { facebookProvider, googleProvider } from "../../utils/authMethod";
import { creatUser, setUserData, signinUser } from "../../utils/firebaseFunc";

const Container = styled.div`
  width: 50vmin;
  height: 70vh;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -25vmin;
  margin-top: -35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  @media screen and (max-width: 1200px) {
    width: 60vmin;
    margin-left: -30vmin;
  }
`;

const WelcomePage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8eedb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    height: 90%;
  }
`;

const WelcomeArea = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const LoginBtn = styled.div`
  width: 35vmin;
  height: 5vmin;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f2f6;
  margin-bottom: 3vmin;
  cursor: pointer;
  padding: 1vmin;
  @media screen and (max-width: 1200px) {
    width: 50vmin;
    height: 6vmin;
  }
`;

const LoginImg = styled.img`
  width: 3vmin;
  @media screen and (max-width: 1200px) {
    width: 4vmin;
  }
`;

const LoginText = styled.p`
  font-size: 2vmin;
  margin-left: 2vmin;
  font-weight: 600;
  @media screen and (max-width: 1200px) {
    font-size: 2.5vmin;
  }
  @media screen and (max-width: 500px) {
    font-size: 3vmin;
  }
`;
const Text = styled.p`
  font-size: 3vmin;
  font-weight: 600;
  text-align: center;
  margin-top: 5vmin;
  @media screen and (max-width: 1200px) {
    margin-top: 1vmin;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameInput = styled.input`
  border-radius: 20px;
  width: 35vmin;
  height: 5vmin;
  margin: 2vmin 0px;
  padding-left: 1vmin;
  font-size: 2vmin;
  @media screen and (max-width: 1200px) {
    font-size: 1.5vmin;
    height: 7vmin;
    width: 50vmin;
    margin: 2vmin 0px;
    font-size: 3vmin;
  }
`;
const MailInput = styled(NameInput)``;
const PasswordInput = styled(NameInput)``;

const BottomBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 3vmin;
`;

const CheckBtn = styled(LoginBtn)`
  width: 10vmin;
  font-size: 2.6vmin;
  font-weight: 600;
  @media screen and (max-width: 1200px) {
    width: 15vmin;
  }
`;

function LoginPage() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("eee@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const HandleLogin = async (provider) => {
    await socialMediaAuth(provider);
    history.push("/");
  };

  const Register = (e) => {
    setLoading(true);
    e.preventDefault();
    if (userName === "") {
      Swal.fire("???????????????");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      Swal.fire("???????????????6???");
      setLoading(false);
      return;
    }

    creatUser(email, password)
      .then((response) => {
        history.push("/");
        setLoading(false);
        setUserName(userName);
        setPassword(password);
        setEmail(email);

        const data = {
          email: response.user.email,
          userImage: response.user.photoURL,
          userName: userName,
          userId: response.user.uid,
          userLevel: 0,
          user_banner: "",
        };
        setUserData(response.user.uid, data);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            Swal.fire("Email????????????????????????");

            break;
          case "auth/invalid-email":
            Swal.fire("Email???????????????");

            break;
          default:
        }
        setLoading(false);
      });
  };

  const Signin = (e) => {
    setLoading(true);
    e.preventDefault();

    signinUser(email, password)
      .then((resp) => {
        history.push("/");
        setLoading(false);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            Swal.fire("Email????????????");

            break;
          case "auth/user-not-found":
            Swal.fire("Email??????????????????");

            break;
          case "auth/wrong-password":
            Swal.fire("???????????????");

            break;
          default:
        }
        setLoading(false);
      });
  };

  return (
    <Container>
      <WelcomePage>
        <WelcomeArea>
          <div>
            <LoginBtn onClick={() => HandleLogin(facebookProvider)}>
              <LoginImg src={fb} />
              <LoginText>Facebook ????????????/??????</LoginText>
            </LoginBtn>
            <LoginBtn onClick={() => HandleLogin(googleProvider)}>
              <LoginImg src={google} />
              <LoginText>Google ????????????/??????</LoginText>
            </LoginBtn>
          </div>
          <form>
            <Text>??????KKpedia????????????/??????</Text>
            <InputArea>
              <NameInput
                placeholder="???????????????"
                value={userName}
                autoComplete="on"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <MailInput
                placeholder="???????????????/??????Email??????"
                value={email}
                autoComplete="on"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <PasswordInput
                placeholder="???????????????"
                type="password"
                value={password}
                autoComplete="on"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </InputArea>
          </form>
          <BottomBtn>
            <CheckBtn onClick={Signin}>??????</CheckBtn>
            <CheckBtn onClick={Register}>??????</CheckBtn>
          </BottomBtn>
          {loading && <Loading />}
        </WelcomeArea>
      </WelcomePage>
    </Container>
  );
}

export default LoginPage;
