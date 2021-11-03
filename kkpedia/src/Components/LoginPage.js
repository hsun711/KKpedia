import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import socialMediaAuth from "../utils/socialMediaAuth";
import fb from "../img/facebook.png";
import google from "../img/google.png";
import { facebookProvider, googleProvider } from "../utils/authMethod";

// const Container = styled.div`
// 	width: 100vw;
// 	height: 100vh;
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	display: flex;
// 	z-index: 5;
// `;

const Container = styled.div`
	width: 80vw;
	height: 70vh;
	/* background-color: beige; */
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -40vw;
	margin-top: -35vh;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 50;
`;

const WelcomeLeft = styled.div`
	width: 50vw;
	height: 100%;
	background-color: #018181;
	display: flex;
	align-items: center;
`;
const WelcomeArea = styled.div`
	margin: 0px auto;
`;

const WelcomeText = styled.p`
	font-size: 3.7vmin;
	font-weight: 500;
	margin-bottom: 3vmin;
	color: white;
	@media screen and (max-width: 1200px) {
		font-size: 2.6vmin;
	}
`;
const WelcomeRigth = styled.div`
	width: 50vw;
	height: 100%;
	background-color: #f9e8a9;
	display: flex;
	align-items: center;
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
	margin-bottom: 30px;
	cursor: pointer;
`;

const LoginImg = styled.img`
	width: 3vmin;
`;

const LoginText = styled.p`
	font-size: 2vmin;
	margin-left: 10px;
	font-weight: 600;
`;
const Text = styled.p`
	font-size: 2.7vmin;
	font-weight: 600;
	text-align: center;
	margin-top: 60px;
`;

const InputArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const NameInput = styled.input`
	border-radius: 20px;
	width: 30vmin;
	height: 4vmin;
	margin: 15px 0px;
	padding-left: 20px;
	padding-top: 0.5vmin;
	font-size: 2vmin;
	text-align: center;
	@media screen and (max-width: 800px) {
		font-size: 1.5vmin;
	}
`;
const MailInput = styled(NameInput)``;
const PasswordInput = styled(NameInput)``;

const BottomBtn = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 3vmin;
`;

const CheckBtn = styled(LoginBtn)`
	width: 10vmin;
	font-size: 2.6vmin;
	font-weight: 600;
`;

const ErrorText = styled(Text)`
	color: red;
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
		history.push("/idol");
	};

	const AddtoFirsebase = async (data) => {
		db.collection("users")
			.doc(`${data.uid}`)
			.set({
				email: data.email,
				password: password,
				userImage: data.photoURL,
				userName: data.displayName,
				userId: data.uid,
			})
			.then((docRef) => {
				console.log("😁😁😁😁");
			});
	};

	const Register = () => {
		setLoading(true);
		setErrorMsg("");
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				history.push("/idol");
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
						},
						{ merge: true }
					)
					.then((docRef) => {
						console.log("😁😁😁😁");
					});
			})
			.catch((error) => {
				switch (error.code) {
					case "auth/email-already-in-use":
						setErrorMsg("Email帳號已經註冊過囉🤨🤨🤨");
						break;
					case "auth/invalid-email":
						setErrorMsg("Email格式錯誤囉😈😈😈😈");
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
						setErrorMsg("Email格式錯囉💀💀💀💀");
						break;
					case "auth/user-not-found":
						setErrorMsg("Email帳號不存在喔👻👻👻👻");
						break;
					case "auth/wrong-password":
						setErrorMsg("密碼錯了唷😱😱😱😱");
						break;
					default:
				}
				setLoading(false);
			});
	};
	return (
		<Container>
			<WelcomeLeft>
				<WelcomeArea>
					<WelcomeText>人生啊</WelcomeText>
					<WelcomeText>總要有一次奮不顧身</WelcomeText>
					<WelcomeText>去看偶像站在臺上閃閃發光的樣子</WelcomeText>
					<WelcomeText>看不了的日子就來 KKpedia 吧</WelcomeText>
				</WelcomeArea>
			</WelcomeLeft>
			<WelcomeRigth>
				<WelcomeArea>
					<LoginBtn onClick={() => HandleLogin(facebookProvider)}>
						<LoginImg src={fb} />
						<LoginText>Facebook 快速註冊/登入</LoginText>
					</LoginBtn>
					<LoginBtn onClick={() => HandleLogin(googleProvider)}>
						<LoginImg src={google} />
						<LoginText>Google 快速註冊/登入</LoginText>
					</LoginBtn>
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
					<BottomBtn>
						<CheckBtn onClick={Signin}>登入</CheckBtn>
						<CheckBtn onClick={Register}>註冊</CheckBtn>
					</BottomBtn>
					{loading && <Loading />}
					{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
				</WelcomeArea>
			</WelcomeRigth>
		</Container>
	);
}

export default LoginPage;
