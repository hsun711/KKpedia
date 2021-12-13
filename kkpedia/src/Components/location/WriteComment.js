import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import star from "../../img/star.png";
import paper from "../../img/rm429-013.png";
import Swal from "sweetalert2";
import { SendBtn } from "../../style/newOne";
import { setPlaceReview } from "../../utils/firebaseFunc";

const Container = styled.div`
  width: 50vmin;
  height: 70vmin;
  background-image: url(${paper});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -25vmin;
  margin-top: -35vh;
  padding: 3vmin;
  display: flex;
  flex-direction: column;
  z-index: 5;
`;

const Comment = styled.div`
  margin-top: 10vmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Grade = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2vmin;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ScoreInput = styled.input`
  width: 15vmin;
  margin-right: 2vmin;

  @media screen and (max-width: 1200px) {
    width: 20vmin;
    margin-right: 0vmin;
    margin-bottom: 2vmin;
  }
`;

const Score = styled.div`
  display: flex;
`;

const Star = styled.div`
  background-image: url(${star});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 3vmin;
  height: 3vmin;
  @media screen and (max-width: 1200px) {
    width: 4vmin;
    height: 4vmin;
  }
`;

const ScoreNumber = styled.p`
  font-size: 3vmin;
  margin-left: 0.5vmin;
  @media screen and (max-width: 1200px) {
    font-size: 4vmin;
  }
`;

const PlaceName = styled.p`
  font-size: 3.5vmin;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3vmin;
`;

const TextArea = styled.textarea`
  width: 90%;
  min-height: 20vmin;
  border-radius: 7px;
  padding: 1vmin;
  align-self: center;
  font-size: 3vmin;
`;

function WriteComment({ title, location, setPopUpWriteComment }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [score, setScore] = useState("0");
  const [comment, setComment] = useState("");

  const GiveScore = (e) => {
    setScore(e.target.value);
  };

  const SendComment = () => {
    if (comment === "") {
      Swal.fire("請輸入評論內容");
      return;
    }

    if (score === "0") {
      Swal.fire("至少給個一分唷~");
      return;
    }

    const data = {
      uid: currentUser.uid,
      comment: comment,
      locationName: location,
      score: score,
      timestamp: new Date().getTime(),
    };

    setPlaceReview(title, data, setPopUpWriteComment);
  };

  return (
    <Container>
      <Comment>
        <PlaceName>{location}</PlaceName>
        <Grade>
          <ScoreInput
            type="range"
            min="0"
            max="5"
            step="1"
            name="score"
            value={score}
            onChange={GiveScore}
          />
          <Score>
            <Star />
            <ScoreNumber>{score}</ScoreNumber>
          </Score>
        </Grade>
        <TextArea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <SendBtn onClick={SendComment}>送出評論</SendBtn>
      </Comment>
    </Container>
  );
}

export default WriteComment;
