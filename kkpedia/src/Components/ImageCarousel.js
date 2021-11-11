import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import coverImage from "../img/wanted.png";
import leftarrow from "../img/left-arrow.png";
import rightarrow from "../img/right-arrow.png";

const Images = styled.div`
	width: 90%;
	/* outline: 5px solid blue; */
	padding-left: 4vmin;
	padding-right: 3vmin;
`;
const ImgContainer = styled.div`
	width: 20vmin;
	height: 25vmin;
	display: flex;
	margin-top: 1vmin;
`;

const Image = styled.img`
	width: 80%;
	height: 100%;
	margin: 0vmin auto;
`;
const Arrow = styled.img`
	width: 7vmin;
	height: 7vmin;
	cursor: pointer;
`;

export default function ImageCarousel({ images, showNum }) {
	const settings = {
		infinite: true,
		dots: false,
		slidesToShow: showNum,
		slidesToScroll: 1,
		lazyLoad: true,
		nextArrow: <Arrow src={rightarrow} />,
		prevArrow: <Arrow src={leftarrow} />,
	};

	// console.log(images.length);
	return (
		<Images>
			<Slider {...settings}>
				{images.map((image) => {
					return (
						<ImgContainer>
							<Image src={image || coverImage} key={uuidv4()} />
						</ImgContainer>
					);
				})}
			</Slider>
		</Images>
	);
}
