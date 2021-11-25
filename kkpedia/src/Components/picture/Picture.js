import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NewPicture from "./NewPicture";
import { v4 as uuidv4 } from "uuid";
import EachPictures from "./EachPictures";
import { snapshotUserData, getPhotos } from "../../utils/firebaseFunc";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 1200px) {
		width: 90%;
	}
`;

const Add = styled.div`
	background-color: #f3f4f6;
	border: 2px solid #422800;
	border-radius: 30px;
	box-shadow: #422800 4px 4px 0 0;
	color: #422800;
	cursor: pointer;
	position: fixed;
	bottom: 3vmin;
	right: 2vmin;
	display: inline-block;
	font-weight: 600;
	font-size: 2vmin;
	padding: 0 2vmin;
	line-height: 4.2vmin;
	text-align: center;
	text-decoration: none;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	&:hover {
		background-color: #f8eedb;
		box-shadow: #422800 2px 2px 0 0;
		transform: translate(2px, 2px);
	}
	@media screen and (max-width: 1200px) {
		line-height: 5vmin;
		padding: 0.75vmin 2vmin;
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
	@media screen and (max-width: 1200px) {
		width: 80%;
	}
`;

const Cover = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.6;
	z-index: 2;
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
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (currentUser && currentUser.uid) {
			const unsubscribe = snapshotUserData(currentUser.uid, setUserData);
			return () => unsubscribe();
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
							{photos.map((item) => {
								return <EachPictures item={item} key={uuidv4()} />;
							})}
						</Container>
					)}
				</>
			)}
		</>
	);
}

export default Picture;
