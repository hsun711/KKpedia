import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import styled from "styled-components";
import "../index.css";

const initialCalender = JSON.parse(
	window.localStorage.getItem("calender" || [])
);

const items = initialCalender.map((item) => {
	return {
		title: item.event,
		date: new Date(item.date + "T00:00:00"),
	};
});

const INITIAL_EVENTS = items;

const CalenderArea = styled.div`
	width: 90vmin;
	height: 70vmin;
`;

export default function RenderCalender() {
	const [events, setEvents] = useState([]);

	// window.localStorage.setItem("calender", JSON.stringify([]));

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
		let selectedDate = new Date(date.dateStr + "T00:00:00");

		const calenderEvent = JSON.parse(
			window.localStorage.getItem("calender" || [])
		);
		setEvents([
			...events,
			{
				title: event,
				date: selectedDate,
			},
		]);

		alert("Great. Now, update your database...");
		// console.log(date);
		// console.log(event);
		const calenderContent = {
			date: date.dateStr,
			event: event,
		};
		window.localStorage.setItem("calender", JSON.stringify([calenderContent]));
		const newCalenderEvent = [...calenderEvent, calenderContent];
		window.localStorage.setItem("calender", JSON.stringify(newCalenderEvent));
		window.location.reload();
	};

	const DeletedEvent = (eventInfo) => {
		console.log(eventInfo);
		console.log(eventInfo.event.title);
		const calenderEvent = JSON.parse(window.localStorage.getItem("calender"));

		const newEvent = calenderEvent.filter((obj) => {
			const result = obj.event !== eventInfo.event.title;
			return result;
		});
		window.localStorage.setItem("calender", JSON.stringify(newEvent));
		window.location.reload();
	};

	return (
		<CalenderArea>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} //載入外掛
				initialEvents={INITIAL_EVENTS}
				selectable
				// editable // 允許內部拖曳
				droppable // 允許由外部拖曳
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
