import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ImageViewer from "react-simple-image-viewer";

const EachPhoto = styled.div`
	display: flex;
	flex-direction: column;
	background-color: rgba(248, 239, 221, 0.7);
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	padding: 2vmin;
	width: 100%;
	border-radius: 10px;
	margin-bottom: 2vmin;
`;

const PosterInfo = styled.div`
	display: flex;
	justify-content: space-between;
	/* outline: 2px solid black; */
`;

const ImageHolder = styled.p`
	font-size: 4vmin;
	line-height: 5vmin;
	font-weight: 600;
	margin-left: 2.5vmin;
`;

const TimeStamp = styled.div`
	font-size: 1.5vmin;
`;

const ImageDescription = styled.p`
	font-size: 2vmin;
	margin-left: 2.5vmin;
	color: #57606f;
	@media screen and (max-width: 1200px) {
		font-size: 1.75vmin;
	}
`;

const PhotosArea = styled.div`
	width: 100%;
	margin: 0vmin auto;
	/* outline: 2px solid black; */
	@media screen and (max-width: 1200px) {
		margin: 2vmin auto;
	}
`;
const NoCarouselImg = styled.div`
	width: 95%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: 0vmin 2.5vmin;
	/* outline: 2px solid blue; */
	/* margin: 0vmin auto; */
`;

const Photos = styled.div`
	width: 20vmin;
	height: 20vmin;
	overflow: hidden;
	margin: 1vmin;
	@media screen and (max-width: 1200px) {
		max-width: 25vmin;
		max-height: 25vmin;
	}
`;

const Photo = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

function EachPictures({ item }) {
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};
	return (
		<EachPhoto>
			<PosterInfo>
				<ImageHolder>{item.postUser}</ImageHolder>
				<TimeStamp>{new Date(item.postTime).toLocaleString()}</TimeStamp>
			</PosterInfo>
			<ImageDescription>{item.description}</ImageDescription>
			<PhotosArea>
				<NoCarouselImg>
					{item.images.map((img, index) => (
						<Photos key={index} onClick={() => openImageViewer(index)}>
							<Photo src={img} />
						</Photos>
					))}
					{isViewerOpen && (
						<ImageViewer
							src={item.images}
							currentIndex={currentImage}
							onClose={closeImageViewer}
							disableScroll={false}
							backgroundStyle={{
								backgroundColor: "rgba(0,0,0,0.8)",
							}}
							closeOnClickOutside={true}
						/>
					)}
				</NoCarouselImg>
			</PhotosArea>
		</EachPhoto>
	);
}

export default EachPictures;
