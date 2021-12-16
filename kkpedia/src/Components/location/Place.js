import React, { useEffect, useState } from "react";
import idolimage from "../../img/wanted.png";
import { useRouteMatch } from "react-router-dom";
import NewPlace from "./NewPlace";
import { getPlaceData } from "../../utils/firebaseFunc";
import {
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
} from "../../style/place";

function Place({ title, topic }) {
  let { url } = useRouteMatch();
  const [popAddPlace, setPopAddPlace] = useState(false);
  const [place, setPlace] = useState([]);

  const AddSomePlace = () => {
    setPopAddPlace(!popAddPlace);
  };

  useEffect(() => {
    const unsubscribe = getPlaceData(title, setPlace);
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <OutsideContainer>
      <Add onClick={AddSomePlace} topic="Idol">
        新增聖地
      </Add>
      {popAddPlace ? (
        <div>
          <Cover onClick={AddSomePlace} />
          <NewPlace
            topic={topic}
            title={title}
            setPopAddPlace={setPopAddPlace}
          />
        </div>
      ) : (
        <>
          {place.length === 0 ? (
            <HintText>目前還沒有人新增聖地呢~快去搶頭香吧!</HintText>
          ) : (
            <>
              {place.map((item) => {
                return (
                  <Container key={item.locationName}>
                    <PlaceLink to={`${url}/${item.locationName}`}>
                      <EachPlace>
                        <ImgContainer>
                          <PlaceImage src={item.images[0] || idolimage} />
                        </ImgContainer>
                        <PlaceText>
                          <PlaceTitle>{item.locationName}</PlaceTitle>
                          <PlaceDesp>{item.description}</PlaceDesp>
                        </PlaceText>
                      </EachPlace>
                    </PlaceLink>
                  </Container>
                );
              })}
            </>
          )}
        </>
      )}
    </OutsideContainer>
  );
}

export default Place;
