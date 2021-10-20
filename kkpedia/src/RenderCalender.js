import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { useEffect } from "react";
import styled from "styled-components";

const INITIAL_EVENTS = [
	{
		title: "event 0",
		date: new Date().toISOString().substr(0, 10),
	},
];

const CalenderArea = styled.div`
	width: 50vmin;
	height: 50vmin;
`;

export default function RenderCalender() {
	useEffect(() => {
		const containerEl = document.querySelector("#events");
		new Draggable(containerEl, {
			itemSelector: ".event",
			eventData: (eventEl) => {
				return {
					title: eventEl.innerText,
				};
			},
		});
	}, []);
	return (
		<CalenderArea>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialEvents={INITIAL_EVENTS}
				editable
				droppable
			/>
			<ul id="events">
				<li className="event">event 1</li>
				<li className="event">event 2</li>
				<li className="event">event 3</li>
			</ul>
		</CalenderArea>
	);
}
