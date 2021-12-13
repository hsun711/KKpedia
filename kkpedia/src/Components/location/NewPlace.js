import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
import firebase from "../../utils/firebase";
import MapAutocomplete from "../map/MapAutocomplete";
import Loading from "../common/Loading";
import {
  Container,
  MultiImgs,
  CoverImges,
  Image,
  SendBtn,
  Add,
  InputArea,
} from "../../style/newOne";
import {
  getCategoriesTitleData,
  snapshotUserData,
  sendAlertToFollower,
  levelUpUser,
  addPhotos,
  getPlaceName,
  putImageToStorage,
  getImageURL,
} from "../../utils/firebaseFunc";

const InputTitle = styled.p`
  width: 100%;
  font-size: 2.5vmin;
  font-weight: 600;
  @media screen and (max-width: 1200px) {
    font-size: 2vmin;
  }
`;

const Title = styled.div`
  width: 100%;
  margin-top: 3vmin;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ShortTitle = styled(InputTitle)`
  width: 28vmin;
  @media screen and (max-width: 1200px) {
    font-size: 2.5vmin;
  }
`;

const ImageTitle = styled(Title)`
  @media screen and (max-width: 1200px) {
    flex-direction: row;
    align-items: center;
  }
`;

const AddImagesTitle = styled.p`
  width: fit-content;
  font-size: 2.5vmin;
  font-weight: 600;
  @media screen and (max-width: 1200px) {
    font-size: 2vmin;
  }
`;

function NewPlace({ title, setPopAddPlace, topic }) {
  const currentUser = useSelector((state) => state.currentUser);
  const db = firebase.firestore();
  const [loading, setLoading] = useState(false);
  const [titleData, setTitleData] = useState({});
  const [userData, setUserData] = useState({});
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [latitude, setLatitude] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getCategoriesTitleData(title).then((doc) => {
      setTitleData(doc.data());
    });
    if (currentUser && currentUser.uid) {
      const unsubscribe = snapshotUserData(currentUser.uid, setUserData);
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  // 把從子層 MapAutocomplete 收到的資訊存進 state 裡
  const GetAddress = (addressdata) => {
    setAddress(addressdata[0]);
    setPlaceId(addressdata[1]);
    setLatitude(addressdata[2]);
  };

  const OnFileChange = (e) => {
    // Get Files
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      const fileType = e.target.files[i].type.slice(0, 5);
      if (fileType !== "image") {
        Swal.fire("請上傳圖片檔");
        return;
      } else {
        setFiles((prevState) => [...prevState, newFile]);
      }
    }
  };

  const SendAlert = () => {
    const otherFollower = titleData.followedBy?.filter((follower) => {
      return follower !== currentUser.uid;
    });

    const data = {
      title: title,
      topic: topic,
      locationName: locationName,
    };

    otherFollower?.forEach((user) => {
      sendAlertToFollower(user, data);
    });
  };

  const UpdateLevel = () => {
    levelUpUser(currentUser.uid, userData.userLevel, 5);
    SendAlert();
  };

  const AddNewPlace = () => {
    setLoading(true);
    const documentRef = db.collection("categories").doc(`${title}`);
    const promises = [];

    if (locationName === "") {
      Swal.fire("景點/餐廳名稱沒有填唷");
      setLoading(false);
      return;
    }
    if (description === "") {
      Swal.fire("景點/餐廳描述沒有填唷");
      setLoading(false);
      return;
    }
    if (address === "") {
      Swal.fire("地址沒有填唷");
      setLoading(false);
      return;
    }
    if (files.length < 1) {
      Swal.fire("請至少上傳一張照片喔");
      setLoading(false);
      return;
    }

    if (files.length > 5) {
      Swal.fire("最多上傳5張照片喔");
      setLoading(false);
      return;
    }
    getPlaceName(title, locationName).then((doc) => {
      if (doc.exists) {
        Swal.fire(`${locationName}已經存在了喔`);
        setLoading(false);
        return;
      } else {
        const data = {
          topic: topic,
          title: title,
          address: address,
          latitude: latitude,
          placeId: placeId,
          description: description,
          locationName: locationName,
          postUser: userData.userName,
          uid: currentUser.uid,
          images: [],
        };
        if (files.length === 0) {
          Swal.fire("至少上傳一張照片唷~");
          setLoading(false);
          return;
        } else {
          addPhotos(title, "places", locationName, data, UpdateLevel);
          files.map((file) => {
            new Compressor(file, {
              quality: 0.8,
              success: (compressedResult) => {
                const id = uuidv4();
                const uploadTask = putImageToStorage(
                  `place_images/${documentRef.id}/${id}`,
                  compressedResult
                );

                promises.push(uploadTask);
                uploadTask.then(function complete() {
                  getImageURL(
                    `place_images/${documentRef.id}/`,
                    id,
                    title,
                    "places",
                    locationName
                  );
                });
              },
            });
          });
          Promise.all(promises)
            .then(() => {
              setLoading(false);
              setPopAddPlace(false);
              Swal.fire("貢獻值加 5 點~");
            })
            .catch((err) => console.log(err));
        }
      }
    });
  };
  return (
    <Container>
      <InputTitle>藝人 / 戲劇 / 綜藝名稱：{title}</InputTitle>
      <Title>
        <InputTitle>貢獻者暱稱：{userData.userName}</InputTitle>
      </Title>
      <Title>
        <ShortTitle>景點/餐廳名稱：</ShortTitle>
        <InputArea
          value={locationName}
          onChange={(e) => {
            setLocationName(e.target.value);
          }}
        />
      </Title>
      <Title>
        <ShortTitle>景點/餐廳描述：</ShortTitle>
        <InputArea
          placeholder="ex.哪個藝人po文的、哪個場景出現的"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Title>
      <Title>
        <ShortTitle>詳細地址：</ShortTitle>
        <MapAutocomplete placeaddress={GetAddress} />
      </Title>
      <ImageTitle>
        <AddImagesTitle>上傳照片(最多上傳5張照片喔)：</AddImagesTitle>
        <Add as="label" htmlFor="postImages" />
        <input
          type="file"
          multiple
          id="postImages"
          style={{ display: "none" }}
          accept="image/*"
          onChange={OnFileChange}
        />
      </ImageTitle>
      <MultiImgs>
        {files.map((file) => {
          return (
            <CoverImges key={file.id}>
              <Image src={URL.createObjectURL(file)} />
            </CoverImges>
          );
        })}
      </MultiImgs>
      <SendBtn onClick={AddNewPlace}>新增</SendBtn>
      {loading && <Loading />}
    </Container>
  );
}

export default NewPlace;
