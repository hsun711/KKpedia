import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import Loading from "../common/Loading";
import {
	Container,
	InputArea,
	ShortTitle,
	ArtistName,
	MultiImgs,
	CoverImges,
	Image,
	SendBtn,
	Add,
} from "../../style/newOne";
import { checkImages } from "../../utils/commonFunc";
import {
	getUserData,
	levelUpUser,
	addPhotos,
	putImageToStorage,
	getImageURL,
} from "../../utils/firebaseFunc";

const InputTitle = styled.p`
	width: 55vmin;
	font-size: 2.5vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		width: 100%;
		margin-top: 2vmin;
		font-size: 3vmin;
	}
`;

const InputInfo = styled(ArtistName)`
	margin-top: 3vmin;
`;

const AddImagesTitle = styled.p`
	width: 15vmin;
	font-size: 2.5vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		width: 100%;
		font-size: 2vmin;
	}
`;

function NewPicture({ title, AddPicture }) {
	const db = firebase.firestore();
	const currentUser = useSelector((state) => state.currentUser);
	const [loading, setLoading] = useState(false);
	const [userLevel, setUserLevel] = useState(0);
	const [files, setFiles] = useState([]);
	const [imgDescription, setImgDescription] = useState("");

	useEffect(() => {
		if (currentUser && currentUser.uid) {
			getUserData(currentUser.uid).then((doc) => {
				if (doc.data().userLevel === undefined) {
					setUserLevel(0);
				} else {
					setUserLevel(doc.data().userLevel);
				}
			});
		}
	}, [currentUser]);

	const OnFileChange = (e) => {
		checkImages(e, setFiles);
	};
	const UpdateLevel = () => {
		levelUpUser(currentUser.uid, userLevel, 7);
	};

	const handleUpload = () => {
		setLoading(true);
		const documentRef = db.collection("categories").doc(`${title}`);
		const docid = documentRef.collection("photos").doc().id;
		const promises = [];

		const data = {
			uid: currentUser.uid,
			description: imgDescription,
			postTime: new Date().getTime(),
			images: [],
		};
		if (files.length === 0) {
			Swal.fire("至少上傳一張照片唷~");
			setLoading(false);
			return;
		} else {
			addPhotos(title, "photos", docid, data, UpdateLevel);

			files.map((file) => {
				new Compressor(file, {
					quality: 0.8,
					success: (compressedResult) => {
						const id = uuidv4();
						const uploadTask = putImageToStorage(
							`idol_images/${documentRef.id}/${id}`,
							compressedResult
						);
						promises.push(uploadTask);
						uploadTask.then(function complete() {
							getImageURL(
								`idol_images/${documentRef.id}/`,
								id,
								title,
								"photos",
								docid
							);
						});
					},
				});
			});

			Promise.all(promises)
				.then(() => {
					setLoading(false);
					AddPicture(false);
					Swal.fire("貢獻值加 7 點~");
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<Container>
			<InputTitle>藝人 / 戲劇 / 綜藝名稱：{title}</InputTitle>
			<InputInfo>
				<ShortTitle>照片簡述：</ShortTitle>
				<InputArea
					value={imgDescription}
					onChange={(e) => {
						setImgDescription(e.target.value);
					}}
				/>
			</InputInfo>
			<InputInfo>
				<AddImagesTitle>上傳照片：</AddImagesTitle>
				<Add as="label" htmlFor="uploadImage" />
				<input
					type="file"
					id="uploadImage"
					multiple
					accept="image/*"
					style={{ display: "none" }}
					onChange={OnFileChange}
				/>
			</InputInfo>
			<MultiImgs>
				{files.map((file) => {
					return (
						<CoverImges key={file.id}>
							<Image src={URL.createObjectURL(file)} />
						</CoverImges>
					);
				})}
			</MultiImgs>
			<SendBtn onClick={handleUpload}>新增</SendBtn>
			{loading && <Loading />}
		</Container>
	);
}

export default NewPicture;
