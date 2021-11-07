import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import coverImage from "../img/wanted.png";
import leftarrow from "../img/left-arrow.png";
import rightarrow from "../img/right-arrow.png";

const Image = styled.img`
	max-width: 20vmin;
	height: 20vmin;
	margin: 2vmin;
	@media screen and (max-width: 992px) {
		max-width: 10vmin;
		height: 10vmin;
	}
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
		<>
			<Slider {...settings}>
				{images.map((image) => {
					return <Image src={image || coverImage} key={uuidv4()} />;
				})}
			</Slider>
		</>
	);
}
