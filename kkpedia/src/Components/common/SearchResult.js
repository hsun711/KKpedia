import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import algolia from "../../utils/algolia";
import styled from "styled-components";
import Loading from "../common/Loading";
import board from "../../img/cork-board.png";
import sticker from "../../img/sticker2.png";
import idol from "../../img/wanted.png";
import { useParams, useHistory } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: 20vmin auto;
  background-image: url(${board});
  box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;

const NoResult = styled.div`
  width: 80%;
  height: 30vmin;
  font-size: 8vmin;
  margin: 20vmin auto;
  background-color: rgba(256, 256, 256, 0.8);
  box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 1200px) {
    width: 90%;
    font-size: 5vmin;
  }
`;

const EachIdol = styled.div`
  background-image: url(${sticker});
  background-size: 100%;
  width: 30vmin;
  height: 30vmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LinkNav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImageDiv = styled.div`
  align-self: center;
  max-width: 15vmin;
  height: 15vmin;
  margin-top: 3.25vmin;
  margin-right: 1.1vmin;
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
    transition: all 0.3s;
    cursor: pointer;
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
  margin-top: 2vmin;
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

function SearchResult() {
  const allCategories = useSelector((state) => state.allCategories);
  const history = useHistory();
  const { search } = useParams();
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    algolia.search(search).then((result) => {
      const arr = [];
      result.hits.map((hit) => {
        const result = allCategories.filter((data) => {
          return data.title === hit.title;
        });
        arr.push(...result);
      });
      setResultData(arr);
      setLoading(false);
    });
  }, [search]);

  return (
    <>
      {!loading && resultData.length === 0 && (
        <NoResult>
          <p>此藝人/戲劇/綜藝還沒被建立唷!</p>
        </NoResult>
      )}
      {!loading && resultData.length > 0 && (
        <Container>
          {resultData.map((result) => {
            return (
              <EachIdol key={result.title}>
                <LinkNav
                  onClick={() => {
                    history.push(`/${result.topic}/${result.title}`);
                  }}
                >
                  <ImageDiv>
                    <IdolImage src={result.main_image || idol} />
                  </ImageDiv>
                  <LinkTxt>
                    <LinkTitle>{result.title}</LinkTitle>
                  </LinkTxt>
                </LinkNav>
              </EachIdol>
            );
          })}
        </Container>
      )}
      {loading && <Loading />}
    </>
  );
}

export default SearchResult;
