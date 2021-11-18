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
	margin: 0 auto;
	overflow-y: hidden;
	.fc-button.fc-prev-button,
	.fc-button.fc-next-button {
		background: rgb(245, 245, 243);
		background-image: none;
	}
	.fc-daygrid-day {
		/* outline: 2px solid green; */
		word-break: keep-all;
	}

	.fc-daygrid-event {
		white-space: wrap;
	}
	.fc-daygrid-day-frame {
		cursor: pointer;
		/* background-color: rgba(0, 0, 0, 0.5); */
		/* outline: 2px solid blue; */
		/* width: 20vmin;
		min-height: 20vmin;
		width: fit-content;*/
		/* width: fit-content; */
	}
	.fc-event-main-frame {
		/* outline: 2px solid red; */
		/* width: 15vmin; */
		.fc-event-title-container {
			word-break: break-word;
			.fc-event-title {
				font-size: 2vmin;
				white-space: break-spaces;
			}
		}
		@media screen and (max-width: 1200px) {
			/* width: 10vmin; */
			.fc-event-title-container {
				/* .fc-event-title {
					font-size: 1.2vmin;
				} */
			}
		}
	}

	.fc-event {
		/* outline: 2px solid blue; */
		border-radius: 10px;
		font-size: 3vmin;
		font-weight: 600;
		line-height: 3vmin;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: #fab1a0;
		padding: 1vmin;
		margin-bottom: 1vmin;
		cursor: pointer;
		@media screen and (max-width: 1200px) {
			text-align: center;
		}
	}
	/* @media screen and (max-width: 1200px) {
		height: 90vh;
	} */
`;

export default function RenderCalender({ title }) {
	// console.log(title);
	const [events, setEvents] = useState([]);
	const [initial, setInitial] = useState([]);
	const db = firebase.firestore();
	const docRef = db.collection("categories");

	// console.log(events);
	useEffect(() => {
		const unsubscribe = docRef
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
		return () => unsubscribe();
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
		if (text === "") {
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
							Swal.fire("刪除成功!", "被刪除的行程回不來囉", "success");
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
