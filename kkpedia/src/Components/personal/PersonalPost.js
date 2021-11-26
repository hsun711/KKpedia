import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import RenderPost from "../topic/RenderPost";
import cancel from "../../img/trash.png";
import { getUserPost, removeUserPost } from "../../utils/firebaseFunc";

const Container = styled.div`
	position: relative;
	flex-direction: column;
	margin-top: 2vmin;
	display: flex;
`;

const DeletePost = styled.div`
	background-image: url(${cancel});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 4vmin;
	height: 4vmin;
	position: absolute;
	top: 4vmin;
	right: 10.5vmin;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		right: 7vmin;
		top: 5vmin;
	}
`;

function PersonalPost({ setActiveItem }) {
	const currentUser = useSelector((state) => state.currentUser);
	const [postData, setPostData] = useState([]);

	useEffect(() => {
		if (currentUser && currentUser.uid) {
			const unsubscribe = getUserPost(currentUser.uid, setPostData);
			return () => {
				unsubscribe();
			};
		}
		setActiveItem("/profile/myPost");
	}, [currentUser]);

	const handleDelete = (e) => {
		Swal.fire({
			title: "確定要刪除嗎?",
			text: "刪除就回不來了喔!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes!",
		}).then((result) => {
			if (result.isConfirmed) {
				removeUserPost(e.target.dataset.id);
			}
		});
	};

	return (
		<>
			{postData.map((item) => {
				return (
					<Container key={item.id}>
						<DeletePost onClick={handleDelete} data-id={item.id} />
						<RenderPost item={item} />
					</Container>
				);
			})}
		</>
	);
}

export default PersonalPost;
