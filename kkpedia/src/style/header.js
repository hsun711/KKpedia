import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../img/logo02.png";
import search from "../img/search.png";
import menu from "../img/burgerMenu.png";
import logout from "../img/logout.png";
import bell from "../img/bell.png";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 3;
`;

const Notify = styled.div`
  background-color: #fff;
  width: 50%;
  border-radius: 0 0 10px 10px;
  align-self: flex-end;
  position: absolute;
  right: 0px;
  top: 3.5vmin;
  z-index: 2;
  @media screen and (max-width: 1200px) {
    width: 60%;
  }
  @media screen and (max-width: 992px) {
    top: 5vmin;
    width: 80%;
  }
`;

const NoNewNotify = styled.div`
  padding: 1vmin;
  font-size: 2vmin;
  font-weight: 600;
  text-align: center;
`;

const HeaderContent = styled.div`
  background-color: rgb(256, 256, 256);
  display: flex;
  width: 100%;
  height: 7vmin;
  margin: 0px auto;
  position: sticky;
  top: 0px;
  z-index: 2;
  justify-content: space-between;
  @media screen and (max-width: 992px) {
    height: 10vmin;
  }
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  background-image: url(${logo});
  background-size: 90%;
  background-repeat: no-repeat;
  margin: 2vmin 0vmin 0vmin 1vmin;
  width: 15vmin;
  height: 7vmin;
  @media screen and (max-width: 1200px) {
    width: 18vmin;
    margin: 0.5vmin 0vmin 0vmin 1vmin;
  }
`;

const BurgerMenu = styled.div`
  background-image: url(${menu});
  background-size: 100%;
  background-repeat: no-repeat;
  width: 4vmin;
  height: 4vmin;
  margin: auto 2.5vmin;
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    width: 5vmin;
    height: 5vmin;
  }
`;

const MemberImgDiv = styled.div`
  width: 4.2vmin;
  height: 4.2vmin;
  margin-top: 0.5vmin;
  margin-right: 2.5vmin;
  margin-left: 2.5vmin;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  @media screen and (max-width: 1200px) {
    width: 6vmin;
    height: 6vmin;
  }
`;

const Member = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Search = styled.div`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  border-radius: 20px;
  border: 2px solid #7b612a;
  width: 25vmin;
  height: 4vmin;
  padding: 8px 48px 8px 20px;
  outline: none;
  font-size: 2vmin;
  @media screen and (max-width: 1200px) {
    width: 30vmin;
    height: 6vmin;
    padding: 2vmin;
    font-size: 3.2vmin;
  }
`;

const InputBtn = styled.div`
  background-image: url(${search});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 4vmin;
  height: 4vmin;
  position: absolute;
  right: 1vmin;
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    top: 0.25vmin;
    width: 6vmin;
    height: 6vmin;
  }
`;

const LinkNav = styled(Link)`
  &:hover {
    cursor: pointer;
  }
`;

const Bell = styled.div`
  background-image: url(${bell});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 4vmin;
  height: 4vmin;
  margin-left: 2vmin;
  cursor: pointer;
  position: relative;
  @media screen and (max-width: 1200px) {
    width: 6vmin;
    height: 6vmin;
  }
`;

const AlertNum = styled.div`
  font-size: 2vmin;
  line-height: 2vmin;
  background-color: red;
  color: #fff;
  width: 2vmin;
  height: 2vmin;
  border-radius: 50%;
  outline: 1px solid white;
  text-align: center;
  position: absolute;
  bottom: -0.5vmin;
  right: -0.5vmin;
  @media screen and (max-width: 1200px) {
    font-size: 3vmin;
    line-height: 3vmin;
    width: 3vmin;
    height: 3vmin;
  }
`;

const Logout = styled.div`
  background-image: url(${logout});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 4vmin;
  height: 4vmin;
  margin-right: 2vmin;
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    width: 6vmin;
    height: 6vmin;
  }
`;

export {
  HeaderContainer,
  Notify,
  NoNewNotify,
  HeaderContent,
  HeaderNav,
  Logo,
  BurgerMenu,
  MemberImgDiv,
  Member,
  Search,
  SearchInput,
  InputBtn,
  LinkNav,
  Bell,
  AlertNum,
  Logout,
};
