import { useState, useEffect } from "react";
// UI lib
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// UI custom
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
function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}
const events = [
  {
    title: "All Day Event",
    start: getDate("YEAR-MONTH-01"),
    backgroundColor: "#00AB55",
    borderColor: "#00AB55",
    textColor: "#FFF",
    allDay: true,
    extendedProps: {
      description: "All Day Event",
    },
  },
  {
    title: "Long Event",
    start: getDate("YEAR-MONTH-07"),
    end: getDate("YEAR-MONTH-10"),
    backgroundColor: "#1890FF",
    textColor: "#FFF",
    borderColor: "#1890FF",
    extendedProps: {
      description: "Long Event",
    },
  },
  {
    title: "Red Event",
    start: getDate("YEAR-MONTH-09"),
    backgroundColor: "#FF4842",
    textColor: "#FFF",
    borderColor: "#FF4842",
    extendedProps: {
      description: "Repeating Event",
    },
  },
  {
    title: "Repeating Event",
    start: getDate("YEAR-MONTH-16"),
    backgroundColor: "#FFC107",
    textColor: "#FFF",
    borderColor: "#FFC107",
    allDay: true,
    extendedProps: {
      description: "Repeating Event",
    },
  },
  { title: "Dinner", start: getDate("YEAR-MONTH-18T20:00:00+00:00") },
];

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
    <FullCalendar
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
      }}
      plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
      events={eventList}
      selectable={true}
      //   dateClick={handleDateClickListener}
      select={handleDateClickListener}
      eventClick={handleEventClickListener}
      locale="vi"
      height="calc(100vh - 208px)"
      themeSystem="standard"
    />
  );
}
