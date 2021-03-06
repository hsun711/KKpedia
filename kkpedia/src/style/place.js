import styled from "styled-components";
import { Link } from "react-router-dom";
import board from "../img/cork-board.png";
import sticker from "../img/sticker6.png";

const OutsideContainer = styled.div`
  width: 100%;
  background-image: url(${board});
  box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2vmin;
  @media screen and (max-width: 1200px) {
    margin: 3vmin;
  }
`;

const HintText = styled.p`
  font-size: 2vmin;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  background-image: url(${sticker});
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 1vmin;
  width: 30vmin;
  height: 32vmin;
  align-items: center;
  justify-content: center;
  margin: 2vmin;
  @media screen and (max-width: 1200px) {
    width: 35vmin;
    height: 37vmin;
  }
`;

const PlaceLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const EachPlace = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  width: 20vmin;
  height: 20vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 21vmin;
    height: 21vmin;
  }
`;

const PlaceImage = styled.img`
  max-width: 90%;
  max-height: 70%;
  transform: rotateZ(7deg);
`;

const PlaceText = styled.div`
  max-width: 20vmin;
  min-height: 7vmin;
  margin-top: -2.5vmin;
  transform: rotateZ(7deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -2.5vmin;
  @media screen and (max-width: 1200px) {
    padding-top: 1vmin;
    max-width: 25vmin;
    margin-top: -3vmin;
  }
`;

const PlaceTitle = styled.p`
  font-size: 2.5vmin;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1200px) {
    font-size: 3.2vmin;
  }
`;
const PlaceDesp = styled.p`
  font-size: 2vmin;
  color: #34495e;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1200px) {
    font-size: 2.2vmin;
  }
`;

const Add = styled.div`
  background-color: #f8eedb;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  position: fixed;
  bottom: 3vmin;
  right: 2vmin;
  display: inline-block;
  font-weight: 600;
  font-size: 2vmin;
  padding: 0 2vmin;
  line-height: 4.2vmin;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:hover {
    background-color: #f3f4f6;
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
  }
  @media screen and (max-width: 1200px) {
    line-height: 5vmin;
    padding: 0.75vmin 2vmin;
  }
`;

const Cover = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.8;
  z-index: 2;
`;

export {
  OutsideContainer,
  HintText,
  Container,
  PlaceLink,
  EachPlace,
  ImgContainer,
  PlaceImage,
  PlaceText,
  PlaceTitle,
  PlaceDesp,
  Add,
  Cover,
};
