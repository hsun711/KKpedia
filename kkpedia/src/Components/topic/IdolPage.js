import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
import Place from "../location/Place";
import Picture from "../picture/Picture";
import Calender from "../calender/Calender";
import Post from "./Post";
import SnsIcon from "./SnsIcon";
import EachLocation from "../location/EachLocation";
import PageNotFound from "../common/PageNotFound";
import firebase from "../../utils/firebase";
import idolimage from "../../img/wanted.png";
import initbanner from "../../img/18034.jpg";
import { uploadImage } from "../../utils/commonFunc";
import {
  updateSingleImage,
  snapshotTitlePlace,
} from "../../utils/firebaseFunc";
import {
  BannerArea,
  Banner,
  BannerChange,
  BannerCheck,
  Container,
  ColumnDiv,
  Person,
  PersonName,
  Photo,
  PersonImage,
  PhotoChange,
  PhotoCheck,
  MenuBar,
  MenuLink,
  PlaceContainer,
} from "../../style/idolPage";

function IdolPage({ topic }) {
  let { url } = useRouteMatch();
  let { title } = useParams();
  const [isPageNotFound, setIsPageNotFound] = useState(false);
  const [titleData, setTitleData] = useState([]);
  const [activeItem, setActiveItem] = useState("idolplace");
  const [photoChange, setPhotoChange] = useState(false);
  const [bannerChange, setBannerChange] = useState(false);
  const [file, setFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const db = firebase.firestore();
  const docRef = db.collection("categories");
  const previewURL = file
    ? URL.createObjectURL(file)
    : titleData[0]?.main_image;
  const bennerURL = bannerFile
    ? URL.createObjectURL(bannerFile)
    : titleData[0]?.main_banner;

  useEffect(() => {
    const unsubscribe = snapshotTitlePlace(
      title,
      setTitleData,
      setIsPageNotFound
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const BannerOk = () => {
    setBannerChange(false);
    const metadata = {
      contentType: bannerFile.type,
    };
    updateSingleImage(
      `banner_images/${title}`,
      bannerFile,
      metadata,
      "categories",
      title,
      "main_banner"
    );
  };

  const ChangeOk = () => {
    setPhotoChange(false);
    const fileRef = firebase.storage().ref(`cover_images/${title}`);
    const metadata = {
      contentType: file.type,
    };
    new Compressor(file, {
      quality: 0.8,
      success: (compressedResult) => {
        fileRef.put(compressedResult, metadata).then(() => {
          fileRef.getDownloadURL().then((imageUrl) => {
            docRef.doc(`${title}`).update({
              main_image: `${imageUrl}`,
            });
            if (titleData[0].followedBy?.length !== 0) {
              titleData[0].followedBy?.forEach((user) => {
                db.collection("users")
                  .doc(`${user}`)
                  .collection("follows")
                  .doc(`${title}`)
                  .update({
                    main_image: `${imageUrl}`,
                  });
              });
            }
          });
        });
        Swal.fire("更新成功");
      },
    });
  };

  const active = {
    borderBottom: "3px solid #404040",
  };

  return (
    <>
      {isPageNotFound ? (
        <PageNotFound />
      ) : (
        <>
          <BannerArea>
            <Banner imgCover={bennerURL || initbanner}></Banner>
            {bannerChange ? (
              <BannerCheck
                as="label"
                htmlFor="uploadBanner"
                onClick={BannerOk}
              />
            ) : (
              <BannerChange as="label" htmlFor="uploadBanner" />
            )}
            <input
              type="file"
              id="uploadBanner"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                uploadImage(e, setBannerFile, setBannerChange);
              }}
            />
          </BannerArea>
          <Container>
            <BrowserRouter>
              <>
                <Person>
                  <ColumnDiv>
                    <PersonName>{title}</PersonName>
                    <>
                      {titleData.map((item) => {
                        return (
                          <SnsIcon key={item.title} item={item} title={title} />
                        );
                      })}
                    </>
                  </ColumnDiv>

                  <Photo>
                    <PersonImage src={previewURL || idolimage} />
                    {photoChange ? (
                      <PhotoCheck
                        as="label"
                        htmlFor="uploadCover"
                        onClick={ChangeOk}
                      />
                    ) : (
                      <PhotoChange as="label" htmlFor="uploadCover" />
                    )}
                    <input
                      type="file"
                      id="uploadCover"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => {
                        uploadImage(e, setFile, setPhotoChange);
                      }}
                    />
                  </Photo>
                </Person>

                <MenuBar>
                  <MenuLink
                    to={`${url}`}
                    onClick={() => {
                      setActiveItem("idolplace");
                    }}
                    style={activeItem === "idolplace" ? active : []}
                  >
                    聖地
                  </MenuLink>
                  <MenuLink
                    to={`${url}/picture`}
                    onClick={() => {
                      setActiveItem("idolphoto");
                    }}
                    style={activeItem === "idolphoto" ? active : []}
                  >
                    圖片區
                  </MenuLink>
                  <MenuLink
                    to={`${url}/calender`}
                    onClick={() => {
                      setActiveItem("idolschedule");
                    }}
                    style={activeItem === "idolschedule" ? active : []}
                  >
                    日程表
                  </MenuLink>
                  <MenuLink
                    to={`${url}/post`}
                    onClick={() => {
                      setActiveItem("idolpost");
                    }}
                    style={activeItem === "idolpost" ? active : []}
                  >
                    留言區
                  </MenuLink>
                </MenuBar>
                <PlaceContainer>
                  <Switch>
                    <Route exact path={`${url}`}>
                      <Place title={title} topic={topic} />
                    </Route>
                    <Route exact path={`${url}/picture`}>
                      <Picture title={title} setActiveItem={setActiveItem} />
                    </Route>
                    <Route exact path={`${url}/calender`}>
                      <Calender title={title} setActiveItem={setActiveItem} />
                    </Route>
                    <Route exact path={`${url}/post`}>
                      <Post title={title} setActiveItem={setActiveItem} />
                    </Route>
                    <Route path={`${url}/:location`}>
                      <EachLocation
                        title={title}
                        setActiveItem={setActiveItem}
                      />
                    </Route>
                  </Switch>
                </PlaceContainer>
              </>
            </BrowserRouter>
          </Container>
        </>
      )}
    </>
  );
}

export default IdolPage;
