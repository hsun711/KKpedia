import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { deleteUserNews } from "../../utils/firebaseFunc";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 1vmin;
  &:hover {
    background-color: #f8eedb;
  }
`;

function Notification({ data }) {
  const currentUser = useSelector((state) => state.currentUser);

  const deleteNews = () => {
    deleteUserNews(
      currentUser.uid,
      data.docid,
      data.topic,
      data.title,
      data.locationName
    );
  };
  return (
    <Container onClick={deleteNews}>{data.title} 有更新景點囉~~</Container>
  );
}

export default Notification;
