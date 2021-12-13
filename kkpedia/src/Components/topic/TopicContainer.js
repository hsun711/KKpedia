import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import sticker from "../../img/sticker2.png";
import idol from "../../img/wanted.png";
import unlike from "../../img/unlike.png";
import like from "../../img/like.png";
import { Link } from "react-router-dom";
import {
  getFollowedBy,
  addToUserFollow,
  removeUserFollow,
  addToFollowedBy,
  removeFollowedBy,
} from "../../utils/firebaseFunc";

const EachIdol = styled.div`
  background-image: url(${sticker});
  background-size: 100%;
  width: 30vmin;
  height: 30vmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  @media screen and (max-width: 1200px) {
    width: 35vmin;
    height: 35vmin;
    margin: 1vmin auto;
  }
`;

const LinkNav = styled(Link)`
  height: 30vmin;
  text-decoration: none;
  display: flex;
  flex-direction: column;
`;

const ImageDiv = styled.div`
  max-width: 16vmin;
  height: 16vmin;
  margin-top: 6vmin;
  margin-left: 6.5vmin;
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
    transition: all 0.3s;
    cursor: pointer;
  }
  @media screen and (max-width: 1200px) {
    max-width: 18vmin;
    height: 18vmin;
    margin-top: 4.75vmin;
    margin-left: 8vmin;
  }
`;

const IdolImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LinkTxt = styled.div`
  width: 22vmin;
  color: #2d3436;
  text-align: center;
  margin-top: 1.5vmin;
  margin-right: 1vmin;
  align-self: center;
  @media screen and (max-width: 1200px) {
    font-size: 3vmin;
    margin-top: 2vmin;
  }
`;

const LinkTitle = styled.p`
  font-size: 2.5vmin;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LikeIcon = styled.img`
  width: 5vmin;
  height: 5vmin;
  margin-top: 1vmin;
  cursor: pointer;
  position: absolute;
  top: 0.75vmin;
  right: 3vmin;
  @media screen and (max-width: 1200px) {
    width: 6vmin;
    height: 6vmin;
  }
`;

function TopicContainer({ topic, item }) {
  const [follow, setFollow] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const previewURL = item.main_image ? `${item.main_image}` : `${idol}`;

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      getFollowedBy(item.title, currentUser.uid)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const followedBy = doc.data().followedBy;
            const follow = followedBy.some((item) => {
              const result = item === currentUser.uid;
              return result;
            });
            if (follow) {
              setFollow(true);
            } else {
              setFollow(false);
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [currentUser]);

  const ToggleFollow = () => {
    setFollow(!follow);
    if (follow === true) {
      removeUserFollow(currentUser.uid, item.title);
      removeFollowedBy(item.title, currentUser.uid);
    } else {
      const data = {
        title: item.title,
        main_image: item.main_image,
        topic: item.topic,
      };
      addToUserFollow(currentUser.uid, item.title, data);
      addToFollowedBy(item.title, currentUser.uid);
    }
  };

  return (
    <EachIdol>
      <LinkNav to={`${topic}/${item.title}`}>
        <ImageDiv>
          <IdolImage src={previewURL} />
        </ImageDiv>
        <LinkTxt>
          <LinkTitle>{item.title}</LinkTitle>
        </LinkTxt>
      </LinkNav>
      <LikeIcon src={follow ? like : unlike} onClick={ToggleFollow} />
    </EachIdol>
  );
}

export default TopicContainer;
