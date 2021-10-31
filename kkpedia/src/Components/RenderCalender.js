import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggle } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import firebase from "../utils/firebase";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../index.css";

// const items = initialCalender.map((item) => {
// 	return {
// 		title: item.event,
// 		date: new Date(item.date + "T00:00:00"),
// 	};
// });

// const INITIAL_EVENTS = items;

const CalenderArea = styled.div`
	width: 100%;
	/* height: 70vmin; */
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

	const HandleDateClick = (date) => {
		let event = prompt("Enter the event");
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
				// alert("新增成功😁😁😁😁");
			});

		// console.log(events);

		alert("Great. Now, update your database...");
	};

	// console.log(events);

	const DeletedEvent = (eventInfo) => {
		// console.log(eventInfo);
		// console.log(eventInfo.event.title);
		// console.log(eventInfo.event._def.defId);
		docRef
			.doc(`${title}`)
			.collection("calenders")
			.where("title", "==", `${eventInfo.event.title}`)
			.where("date", "==", `${eventInfo.event.startStr}`)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					doc.ref.delete();
					// console.log(doc.ref);
				});
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
