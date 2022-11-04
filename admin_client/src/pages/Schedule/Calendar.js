import { useState, useEffect, useRef } from "react";
// UI lib
import Box from "@mui/material/Box";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// UI custom
import CalendarHeader from "./CalendarHeader";
import "./Calendar.css";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllEventByUser } from "../../redux/actions/event";
//#region CSS
//#endregion
//----------------------------
// const EVENT_STRUCTURE = {
//   title: "All Day Event",
//   start: "24/12/2022",
//   backgroundColor: "#00AB55",
//   borderColor: "#00AB55",
//   textColor: "#FFF",
//   allDay: true,
//   extendedProps: {
//     description: "All Day Event",
//   },
// };

export default function Calendar({
  setOpenDialog,
  setStartDate,
  setEndDate,
  setEditedId,
}) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef(null);

  const eventList = useSelector((state) => state.event);

  const handleDateClickListener = (info) => {
    // console.log(info);
    setStartDate(info.start);
    setEndDate(info.end);
    setOpenDialog(true);
  };

  const handleEventClickListener = (info) => {
    // info.event.remove();
    setEditedId(info.event.extendedProps._id);
    setOpenDialog(true);
  };

  useEffect(() => {
    let isMounted = true;
    dispatch(
      getAllEventByUser(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });
            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/schedule" },
              });
          }
        }
      )
    );
    return () => {
      isMounted = false;
    };
  }, [dispatch, navigate]);
  return (
    <Box
      boxShadow={2}
      style={{
        width: "100%",
        height: "calc(100vh - 208px)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <CalendarHeader calendarRef={calendarRef} />
      <FullCalendar
        ref={calendarRef}
        initialView="dayGridMonth"
        headerToolbar={false}
        // headerToolbar={{
        //   left: "prev,next today",
        //   center: "title",
        //   right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
        // }}
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        events={eventList}
        selectable={true}
        //   dateClick={handleDateClickListener}
        select={handleDateClickListener}
        eventClick={handleEventClickListener}
        locale="vi"
        height="calc(100% - 100px)"
        themeSystem="standard"
      />
    </Box>
  );
}
