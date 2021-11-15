import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import socialMediaAuth from "../utils/socialMediaAuth";
import fb from "../img/facebook.png";
import google from "../img/google.png";
import { facebookProvider, googleProvider } from "../utils/authMethod";

const Container = styled.div`
	width: 50vmin;
	height: 70vh;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -25vmin;
	margin-top: -35vh;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 50;
	@media screen and (max-width: 1200px) {
		width: 60vmin;
		margin-left: -30vmin;
	}
`;

const WelcomePage = styled.div`
	width: 100%;
	height: 100%;
	background-color: #f8eedb;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: 1200px) {
		height: 90%;
	}
`;

const WelcomeArea = styled.div`
	margin: 0 auto;
	width: 90%;
	height: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
`;

const LoginBtn = styled.div`
	width: 35vmin;
	height: 5vmin;
	border: 1px solid black;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f1f2f6;
	margin-bottom: 3vmin;
	cursor: pointer;
	padding: 1vmin;
	@media screen and (max-width: 1200px) {
		width: 50vmin;
		height: 6vmin;
	}
`;

const LoginImg = styled.img`
	width: 3vmin;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
	}
`;

const LoginText = styled.p`
	font-size: 2vmin;
	margin-left: 2vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		font-size: 2.5vmin;
	}
	@media screen and (max-width: 500px) {
		font-size: 3vmin;
	}
`;
const Text = styled.p`
	font-size: 3vmin;
	font-weight: 600;
	text-align: center;
	margin-top: 5vmin;
	@media screen and (max-width: 1200px) {
		margin-top: 1vmin;
	}
`;

const InputArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const NameInput = styled.input`
	border-radius: 20px;
	width: 35vmin;
	height: 5vmin;
	margin: 2vmin 0px;
	padding-left: 1vmin;
	font-size: 2vmin;
	@media screen and (max-width: 1200px) {
		font-size: 1.5vmin;
		height: 7vmin;
		width: 50vmin;
		margin: 2vmin 0px;
		font-size: 3vmin;
	}
`;
const MailInput = styled(NameInput)``;
const PasswordInput = styled(NameInput)``;

const BottomBtn = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	margin-top: 3vmin;
`;

const CheckBtn = styled(LoginBtn)`
	width: 10vmin;
	font-size: 2.6vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		width: 15vmin;
	}
`;

function LoginPage() {
	const history = useHistory();
	const [userData, setUserData] = useState({});
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const db = firebase.firestore();

	const HandleLogin = async (provider) => {
		const res = await socialMediaAuth(provider);
		history.push("/");
	};

	const Register = () => {
		setLoading(true);
		setErrorMsg("");
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				history.push("/");
				setLoading(false);
				setUserName(userName);
				setPassword(password);
				setUserData(response);
				setEmail(email);
				// AddtoFirsebase(response);
				db.collection("users")
					.doc(`${response.user.uid}`)
					.set(
						{
							email: response.user.email,
							password: password,
							userImage: response.user.photoURL,
							userName: userName,
							userId: response.user.uid,
							userLevel: 0,
							user_banner: "",
						},
						{ merge: true }
					)
					.then((docRef) => {
						Swal.fire("註冊成功");
						// console.log("😁😁😁😁");
					});
			})
			.catch((error) => {
				switch (error.code) {
					case "auth/email-already-in-use":
						Swal.fire("Email帳號已經註冊過囉");
						// setErrorMsg("Email帳號已經註冊過囉🤨🤨🤨");
						break;
					case "auth/invalid-email":
						Swal.fire("Email格式錯誤囉");
						// setErrorMsg("Email格式錯誤囉😈😈😈😈");
						break;
					default:
				}
				setLoading(false);
			});
	};

	const Signin = () => {
		setLoading(true);
		setErrorMsg("");
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((resp) => {
				history.push("/");
				setLoading(false);
			})
			.catch((error) => {
				switch (error.code) {
					case "auth/invalid-email":
						Swal.fire("Email格式錯囉");
						// setErrorMsg("Email格式錯囉💀💀💀💀");
						break;
					case "auth/user-not-found":
						Swal.fire("Email帳號不存在喔");
						// setErrorMsg("Email帳號不存在喔👻👻👻👻");
						break;
					case "auth/wrong-password":
						Swal.fire("密碼錯了唷");
						// setErrorMsg("密碼錯了唷😱😱😱😱");
						break;
					default:
				}
				setLoading(false);
			});
	};
	return (
		<Container>
			<WelcomePage>
				<WelcomeArea>
					<div>
						<LoginBtn onClick={() => HandleLogin(facebookProvider)}>
							<LoginImg src={fb} />
							<LoginText>Facebook 快速註冊/登入</LoginText>
						</LoginBtn>
						<LoginBtn onClick={() => HandleLogin(googleProvider)}>
							<LoginImg src={google} />
							<LoginText>Google 快速註冊/登入</LoginText>
						</LoginBtn>
					</div>
					<div>
						<Text>使用KKpedia帳號註冊/登入</Text>
						<InputArea>
							<NameInput
								placeholder="請輸入暱稱"
								value={userName}
								onChange={(e) => {
									setUserName(e.target.value);
								}}
							/>
							<MailInput
								placeholder="請輸入註冊/登入Email帳號"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
							<PasswordInput
								placeholder="請輸入密碼"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</InputArea>
					</div>
					<BottomBtn>
						<CheckBtn onClick={Signin}>登入</CheckBtn>
						<CheckBtn onClick={Register}>註冊</CheckBtn>
					</BottomBtn>
					{loading && <Loading />}
				</WelcomeArea>
			</WelcomePage>
		</Container>
	);
}

export default LoginPage;
