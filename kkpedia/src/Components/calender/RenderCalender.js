import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  removeCalenderEvent,
  setCalenderEvent,
  getCalenderEvent,
} from "../../utils/firebaseFunc";

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
    word-break: keep-all;
  }

  .fc-daygrid-event {
    white-space: wrap;
  }
  .fc-daygrid-day-frame {
    cursor: pointer;
  }
  .fc-event-main-frame {
    .fc-event-title-container {
      word-break: break-word;
      .fc-event-title {
        font-size: 2vmin;
        white-space: break-spaces;
      }
    }
    @media screen and (max-width: 1200px) {
      .fc-event-title-container {
      }
    }
  }

  .fc-event {
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
`;

export default function RenderCalender({ title }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = getCalenderEvent(title, setEvents);

    return () => {
      unsubscribe();
    };
  }, []);

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

    let selectedDate = date.dateStr;
    const data = {
      title: text,
      date: selectedDate,
    };

    setCalenderEvent(title, data).then((docRef) => {
      setEvents([...events, data]);
    });
  };

  const DeletedEvent = (eventInfo) => {
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
        removeCalenderEvent(
          title,
          eventInfo.event.title,
          eventInfo.event.startStr
        ).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
            Swal.fire("刪除成功!", "被刪除的行程回不來囉", "success");
          });
        });
      }
    });
  };

  return (
    <CalenderArea>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} //載入外掛
        selectable
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
