import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NewPicture from "./NewPicture";
import { v4 as uuidv4 } from "uuid";
import EachPictures from "./EachPictures";
import { snapshotUserData, getPhotos } from "../../utils/firebaseFunc";
import { HintText, Add, Cover } from "../../style/place";
import Loading from "../common/Loading";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;

const EachPhoto = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(248, 239, 221, 0.7);
  box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
  padding: 2vmin;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 2vmin;
`;

function Picture({ title, setActiveItem }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [popAddPicture, setPopAddPicture] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [userData, setUserData] = useState({});

  const AddPicture = () => {
    setPopAddPicture(!popAddPicture);
  };

  useEffect(() => {
    const unsubscribe = getPhotos(title, setPhotos);
    setActiveItem("idolphoto");
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const unsubscribe = snapshotUserData(currentUser.uid, setUserData);
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  return (
    <>
      {userData.userLevel < 20 ? (
        <EachPhoto>
          <h3>20 等以上才能進入唷~請再加把勁，貢獻聖地解鎖圖片區吧!!!</h3>
        </EachPhoto>
      ) : (
        <>
          <Add onClick={AddPicture} topic="Idol">
            新增照片
          </Add>
          {popAddPicture ? (
            <>
              <Cover onClick={AddPicture} />
              <NewPicture title={title} AddPicture={AddPicture} />
            </>
          ) : (
            <Container>
              {photos.length === 0 ? (
                <EachPhoto>
                  <HintText>還沒有人貢獻照片呢~快去搶頭香吧!</HintText>
                </EachPhoto>
              ) : (
                <>
                  {photos.map((item) => {
                    return <EachPictures item={item} key={uuidv4()} />;
                  })}
                </>
              )}
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default Picture;
