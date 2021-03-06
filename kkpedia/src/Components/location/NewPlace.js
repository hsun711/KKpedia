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

  // ???????????? MapAutocomplete ????????????????????? state ???
  const getAddress = (addressdata) => {
    setAddress(addressdata[0]);
    setPlaceId(addressdata[1]);
    setLatitude(addressdata[2]);
  };

  const onFileChange = (e) => {
    // Get Files
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      const fileType = e.target.files[i].type.slice(0, 5);
      if (fileType !== "image") {
        Swal.fire("??????????????????");
        return;
      } else {
        setFiles((prevState) => [...prevState, newFile]);
      }
    }
  };

  const sendAlert = () => {
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

  const updateLevel = () => {
    levelUpUser(currentUser.uid, userData.userLevel, 5);
    sendAlert();
  };

  const addNewPlace = () => {
    setLoading(true);
    const documentRef = db.collection("categories").doc(`${title}`);
    const promises = [];

    const alertMessage =
      locationName === ""
        ? "??????/????????????????????????"
        : description === ""
        ? "??????/????????????????????????"
        : address === ""
        ? "??????????????????"
        : files.length < 1
        ? "??????????????????????????????"
        : null;
    if (alertMessage) {
      Swal.fire(alertMessage);
      setLoading(false);
      return;
    }

    getPlaceName(title, locationName).then((doc) => {
      if (doc.exists) {
        Swal.fire(`${locationName}??????????????????`);
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
          Swal.fire("???????????????????????????~");
          setLoading(false);
          return;
        } else {
          addPhotos(title, "places", locationName, data, updateLevel);
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
              Swal.fire("???????????? 5 ???~");
            })
            .catch((err) => console.log(err));
        }
      }
    });
  };
  return (
    <Container>
      <InputTitle>?????? / ?????? / ???????????????{title}</InputTitle>
      <Title>
        <InputTitle>??????????????????{userData.userName}</InputTitle>
      </Title>
      <Title>
        <ShortTitle>??????/???????????????</ShortTitle>
        <InputArea
          value={locationName}
          onChange={(e) => {
            setLocationName(e.target.value);
          }}
        />
      </Title>
      <Title>
        <ShortTitle>??????/???????????????</ShortTitle>
        <InputArea
          placeholder="ex.????????????po??????????????????????????????"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Title>
      <Title>
        <ShortTitle>???????????????</ShortTitle>
        <MapAutocomplete placeaddress={getAddress} />
      </Title>
      <ImageTitle>
        <AddImagesTitle>????????????(????????????5????????????)???</AddImagesTitle>
        <Add as="label" htmlFor="postImages" />
        <input
          type="file"
          multiple
          id="postImages"
          style={{ display: "none" }}
          accept="image/*"
          onChange={onFileChange}
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
      <SendBtn onClick={addNewPlace}>??????</SendBtn>
      {loading && <Loading />}
    </Container>
  );
}

export default NewPlace;
