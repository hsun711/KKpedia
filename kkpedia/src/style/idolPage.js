import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import check from "../img/checked.png";
import changeimg from "../img/photo-camera.png";

const BannerArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  width: 100%;
  height: 40vmin;
  background-image: url(${(props) => props.imgCover});
  background-repeat: no-repeat;
  background-color: black;
  background-position: center 45%;
  background-size: 100% auto;
  border-radius: 0px 0px 10px 10px;
`;

const BannerChange = styled.div`
  align-self: flex-end;
  background-image: url(${changeimg});
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center center;
  background-color: #3a3b3c;
  border-radius: 50%;
  width: 4vmin;
  height: 4vmin;
  cursor: pointer;
  margin-top: -5vmin;
  margin-right: 1vmin;
`;

const BannerCheck = styled(BannerChange)`
  background-image: url(${check});
  background-color: rgba(0, 0, 0, 0);
`;

const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: -1vmin auto;
  padding-bottom: 7vmin;
  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: auto;
  }
`;

const ColumnDiv = styled.div`
  align-self: flex-end;
  min-width: 25vmin;
  display: flex;
  flex-direction: column;
`;

const Person = styled.div`
  margin-left: 1vmin;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1200px) {
    justify-content: center;
    margin-top: 3vmin;
  }
`;

const PersonName = styled.p`
  font-size: 4.5vmin;
  font-weight: 600;
  text-align: center;
  align-self: center;
  @media screen and (max-width: 1200px) {
    font-size: 6vmin;
  }
`;
const SnsLink = styled.a`
  list-style: none;
  margin-top: 2.5vmin;
  cursor: pointer;
`;

const SnsImg = styled.img`
  width: 3vmin;
  @media screen and (max-width: 1200px) {
    width: 4vmin;
  }
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const IconDiv = styled.div`
  &:hover::before {
    position: absolute;
    top: 6vmin;
    color: #000;
    font-size: 1.5vmin;
    font-weight: 600;
    width: 6vmin;
    padding: 0.2vmin;
    background: #f3f4f6;
    border-radius: 5px;
    content: "新增網址";
  }
`;

const EditIcon = styled.img`
  width: 3vmin;
  margin-top: 2vmin;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    width: 4vmin;
  }
`;

const Photo = styled.div`
  display: flex;
  position: relative;
  height: 15vmin;
`;

const PersonImage = styled.img`
  margin-left: 2vmin;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10%;
`;

const PhotoChange = styled.div`
  background-image: url(${changeimg});
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center center;
  background-color: #3a3b3c;
  border-radius: 50%;
  width: 3vmin;
  height: 3vmin;
  cursor: pointer;
  margin-right: 1vmin;
  position: absolute;
  bottom: -1vmin;
  right: -2vmin;
`;

const PhotoCheck = styled(PhotoChange)`
  background-image: url(${check});
`;

const MenuBar = styled.div`
  margin-left: 1vmin;
  margin-top: 7vmin;
  display: flex;
  @media screen and (max-width: 1200px) {
    justify-content: space-evenly;
  }
`;

const MenuLink = styled(Link)`
  font-size: 3vmin;
  font-weight: 600;
  text-decoration: none;
  color: #404040;
  display: flex;
  margin-right: 4vmin;
  @media screen and (max-width: 1200px) {
    margin-right: 0vmin;
    font-size: 4vmin;
  }
`;

const PlaceContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5vmin;
  width: 100%;
  @media screen and (max-width: 1200px) {
    margin-top: 3vmin;
    margin: 5vmin auto;
  }
`;

export {
  BannerArea,
  Banner,
  BannerChange,
  BannerCheck,
  Container,
  ColumnDiv,
  Person,
  PersonName,
  SnsLink,
  SnsImg,
  Edit,
  EditIcon,
  IconDiv,
  Photo,
  PersonImage,
  PhotoChange,
  PhotoCheck,
  MenuBar,
  MenuLink,
  PlaceContainer,
};
