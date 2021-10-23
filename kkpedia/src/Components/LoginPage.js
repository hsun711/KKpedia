import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fb from "../img/facebook.png";
import google from "../img/google.png";

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

function LoginPage() {
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
					<LoginBtn>
						<LoginImg src={fb} />
						<LoginText>Facebook 註冊/登入</LoginText>
					</LoginBtn>
					<LoginBtn>
						<LoginImg src={google} />
						<LoginText>Google 註冊/登入</LoginText>
					</LoginBtn>
					<Text>使用KKpedia帳號註冊/登入</Text>
					<InputArea>
						<NameInput placeholder="請輸入暱稱" />
						<MailInput placeholder="請輸入註冊/登入Email帳號" />
						<PasswordInput placeholder="請輸入密碼" type="password" />
					</InputArea>
					<BottomBtn>
						<CheckBtn>登入</CheckBtn>
						<CheckBtn>註冊</CheckBtn>
					</BottomBtn>
				</WelcomeArea>
			</WelcomeRigth>
		</Container>
	);
}

export default LoginPage;
