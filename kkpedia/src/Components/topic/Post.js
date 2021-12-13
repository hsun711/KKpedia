import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import RenderPost from "./RenderPost";
import Swal from "sweetalert2";
import {
  snapshotUserData,
  getPostDoc,
  createPost,
} from "../../utils/firebaseFunc";

import { Submit } from "../../style/post";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;
const Title = styled.p`
  font-size: 4vmin;
  font-weight: 600;
  margin: 2vmin 0vmin;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 20vmin;
  font-size: 3vmin;
  border: none;
  border-radius: 7px;
  padding: 1vmin;
  align-self: center;
`;

function Post({ title, setActiveItem }) {
  const [postMsg, setPostMsg] = useState("");
  const [userData, setUserData] = useState({});
  const [post, setPost] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    setActiveItem("idolpost");

    if (currentUser && Object.keys(currentUser).length > 0) {
      const unsubscribe = snapshotUserData(currentUser.uid, setUserData);
      return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = getPostDoc(title, setPost);
    return () => unsubscribe();
  }, []);

  const SendMsg = () => {
    setPostMsg("");
    if (postMsg === "") {
      Swal.fire("請輸入內容");
      return;
    }
    const data = {
      content: postMsg,
      title: title,
      postTime: new Date().getTime(),
      displayName: userData.userName,
      userId: currentUser.uid,
      userMail: currentUser.email,
      likedBy: [],
    };
    createPost(data);
  };

  return (
    <Container>
      <Title>Create a Post</Title>
      <TextArea
        value={postMsg}
        onChange={(e) => {
          setPostMsg(e.target.value);
        }}
      />
      <Submit onClick={SendMsg}>送出</Submit>
      {post.map((item) => {
        return <RenderPost item={item} key={item.id} />;
      })}
    </Container>
  );
}

export default Post;
