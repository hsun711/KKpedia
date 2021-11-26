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
import EachLocation from "../location/EachLocation";
import PageNotFound from "../common/PageNotFound";
import firebase from "../../utils/firebase";
import idolimage from "../../img/wanted.png";
import fb from "../../img/facebook.png";
import ig from "../../img/instagram.png";
import twitter from "../../img/twitter.png";
import youtube from "../../img/youtube.png";
import add from "../../img/add.png";
import initbanner from "../../img/18034.jpg";
import { uploadImage, checkSnsURL } from "../../utils/commonFunc";
import {
	updateSingleImage,
	getCategoriesTitleData,
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
	SnsLink,
	SnsImg,
	Edit,
	EditIcon,
	Photo,
	PersonImage,
	PhotoChange,
	PhotoCheck,
	MenuBar,
	MenuLink,
	PlaceContainer,
} from "../../style/idolPage";

function IdolPage({ topic }) {
	let { path, url } = useRouteMatch();
	let { title } = useParams();
	const [isPageNotFound, setIsPageNotFound] = useState(false);
	const [sns, setSns] = useState([]);
	const [activeItem, setActiveItem] = useState("idolplace");
	const [mainImage, setMainImage] = useState("");
	const [photoChange, setPhotoChange] = useState(false);
	const [bannerImg, setBannerImg] = useState("");
	const [bannerChange, setBannerChange] = useState(false);
	const [followUsers, setFollowUsers] = useState([]);
	const [file, setFile] = useState(null);
	const [bannerFile, setBannerFile] = useState(null);
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const previewURL = file ? URL.createObjectURL(file) : mainImage;
	const bennerURL = bannerFile ? URL.createObjectURL(bannerFile) : bannerImg;

	useEffect(() => {
		const unsubscribe = docRef
			.where("title", "==", `${title}`)
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				if (item.length > 0) {
					setSns(item);
					setMainImage(item[0].main_image);
					setBannerImg(item[0].main_banner);
				}
			});

		getCategoriesTitleData(title).then((doc) => {
			if (doc.exists) {
				setFollowUsers(doc.data().followedBy);
			} else {
				setIsPageNotFound(true);
			}
		});

		return () => unsubscribe();
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
						if (followUsers?.length !== 0) {
							followUsers.forEach((user) => {
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

	const AddSns = async (sns) => {
		if (sns === "facebook") {
			const snsRegex = /^https:\/\/www\.facebook\.com/;
			let { value: text } = await Swal.fire({
				title: `請輸入${sns}網址`,
				input: "text",
				inputPlaceholder: "",
			});
			checkSnsURL(text, title, snsRegex, "facebook");
		} else if (sns === "instagram") {
			const snsRegex = /^https:\/\/www\.instagram\.com\//;
			let { value: text } = await Swal.fire({
				title: `請輸入${sns}網址`,
				input: "text",
				inputPlaceholder: "",
			});
			checkSnsURL(text, title, snsRegex, "instagram");
		} else if (sns === "twitter") {
			const snsRegex = /^https:\/\/twitter\.com\//;
			let { value: text } = await Swal.fire({
				title: `請輸入${sns}網址`,
				input: "text",
				inputPlaceholder: "",
			});
			checkSnsURL(text, title, snsRegex, "twitter");
		} else if (sns === "youtube") {
			const snsRegex = /^https:\/\/www\.youtube\.com\//;
			let { value: text } = await Swal.fire({
				title: `請輸入${sns}網址`,
				input: "text",
				inputPlaceholder: "",
			});
			checkSnsURL(text, title, snsRegex, "youtube");
		}
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
											{sns.map((item) => {
												return (
													<Edit key={item.title}>
														{item.facebook === "" ? (
															<EditIcon
																src={add}
																onClick={() => {
																	AddSns("facebook");
																}}
															/>
														) : (
															<SnsLink href={item.facebook} target="_blank">
																<SnsImg src={fb} />
															</SnsLink>
														)}
														{item.instagram === "" ? (
															<EditIcon
																src={add}
																onClick={() => {
																	AddSns("instagram");
																}}
															/>
														) : (
															<SnsLink href={item.instagram} target="_blank">
																<SnsImg src={ig} />
															</SnsLink>
														)}
														{item.twitter === "" ? (
															<EditIcon
																src={add}
																onClick={() => {
																	AddSns("twitter");
																}}
															/>
														) : (
															<SnsLink href={item.twitter} target="_blank">
																<SnsImg src={twitter} />
															</SnsLink>
														)}
														{item.youtube === "" ? (
															<EditIcon
																src={add}
																onClick={() => {
																	AddSns("youtube");
																}}
															/>
														) : (
															<SnsLink href={item.youtube} target="_blank">
																<SnsImg src={youtube} onClick={AddSns} />
															</SnsLink>
														)}
													</Edit>
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
