import React, { useEffect, useState } from "react";
import coverImage from "../../img/wanted.png";
import {
  Comment,
  CommentUser,
  CommentTxtArea,
  CommentTxt,
  Score,
  ScoreTxt,
  TimeStamp,
  NormalTxt,
} from "../../style/eachLocation";
import { snapshotUserData } from "../../utils/firebaseFunc";

function EachComment({ data }) {
  const time = data.timestamp;
  const [reviewUser, setReviewUser] = useState("");

  useEffect(() => {
    const unsubscribe = snapshotUserData(data.uid, setReviewUser);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Comment>
      <CommentUser src={reviewUser.userImage || coverImage} />
      <CommentTxtArea>
        <CommentTxt>
          <Score>
            <ScoreTxt>{data.score}</ScoreTxt>
          </Score>
          <NormalTxt>{data.comment}</NormalTxt>
        </CommentTxt>
        <TimeStamp>{new Date(time).toLocaleString()}</TimeStamp>
      </CommentTxtArea>
    </Comment>
  );
}

export default EachComment;
