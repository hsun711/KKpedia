import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";
import interactionPlugin, { Draggle } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import firebase from "../utils/firebase";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import "../index.css";

// const items = initialCalender.map((item) => {
// 	return {
// 		title: item.event,
// 		date: new Date(item.date + "T00:00:00"),
// 	};
// });

// const INITIAL_EVENTS = items;

const CalenderArea = styled.div`
	font-size: 3vmin;
	width: 100%;
	height: 100%;
	z-index: 0;
	.fc-button.fc-prev-button,
	.fc-button.fc-next-button {
		background: rgb(245, 245, 243);
		background-image: none;
	}
	.fc-day-grid-event {
		width: 20vmin;
		min-height: 20vmin;
	}
	.fc-event {
		height: 5vmin;
		border-radius: 10px;
		font-size: 3vmin;
		font-weight: 600;
		line-height: 3vmin;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: #fab1a0;
		margin-bottom: 1vmin;
		@media screen and (max-width: 1024px) {
			height: 4vmin;
			word-wrap: break-word;
		}
	}
`;

export default function RenderCalender({ title }) {
	// console.log(title);
	const [events, setEvents] = useState([]);
	const [initial, setInitial] = useState([]);
	const db = firebase.firestore();
	const docRef = db.collection("categories");

	// console.log(events);
	useEffect(() => {
		docRef
			.doc(`${title}`)
			.collection("calenders")
			.onSnapshot((snapshot) => {
				const enevtDetail = [];
				snapshot.forEach((doc) => {
					// console.log(doc.data());
					enevtDetail.push(doc.data());
				});
				setEvents(enevtDetail);
			});
	}, []);

	// 設定可拖曳元素，並且設定將元素拖曳到行事曆上之後要顯示的文字
	// useEffect(() => {
	// 	const containerEl = document.querySelector("#events");
	// 	new Draggable(containerEl, {
	// 		itemSelector: ".event",
	// 		eventData: (eventEl) => {
	// 			return {
	// 				title: eventEl.innerText,
	// 			};
	// 		},
	// 	});
	// }, []);

	const HandleDateClick = async (date) => {
		let { value: text } = await Swal.fire({
			title: "輸入行程",
			input: "text",
			inputLabel: "行程內容",
			inputPlaceholder: "",
		});

		if (text === undefined) {
			return;
		}
		let event = text;
		let selectedDate = date.dateStr;
		// let selectedDate = new Date(date.dateStr + "T00:00:00");
		// console.log(selectedDate);
		const data = {
			title: event,
			date: selectedDate,
		};

		docRef
			.doc(`${title}`)
			.collection("calenders")
			.doc()
			.set(data, { merge: true })
			.then((docRef) => {
				setEvents([...events, data]);
				// Swal.fire(`新增成功😁😁😁😁`);
			});
	};

	const DeletedEvent = (eventInfo) => {
		// console.log(eventInfo);
		// console.log(eventInfo.event.title);
		// console.log(eventInfo.event._def.defId);
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
				docRef
					.doc(`${title}`)
					.collection("calenders")
					.where("title", "==", `${eventInfo.event.title}`)
					.where("date", "==", `${eventInfo.event.startStr}`)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							doc.ref.delete();
							Swal.fire("刪除成功!", "被刪除了行程已回不來了", "success");
							// console.log(doc.ref);
						});
					});
			}
		});
	};

	return (
		<CalenderArea>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} //載入外掛
				// initialEvents={events}
				selectable
				// editable // 允許內部拖曳
				// droppable // 允許由外部拖曳
				dateClick={HandleDateClick}
				eventClick={DeletedEvent}
				headerToolbar={{
					left: "today", // 自訂按鈕可以加在這邊
					center: "title",
					right: "prev,next",
				}}
				events={events} //設定行事曆事件
			/>
		</CalenderArea>
	);
}
