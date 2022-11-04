import { useState, forwardRef, useEffect } from "react";
// UI lib
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// UI custom

// logic lib

// logic custom
import { formatDate } from "../../utils/date";
//#region CSS
const TooltipToggleButton = forwardRef(({ title, ...props }, ref) => {
  return (
    <Tooltip title={title}>
      <ToggleButton ref={ref} {...props} />
    </Tooltip>
  );
});
//#endregion

//----------------------------
const VIEW_TYPES = [
  {
    tooltip_title: "Tháng",
    value: "dayGridMonth",
    aria_label: "tháng",
    icon: <CalendarViewMonthIcon />,
  },
  {
    tooltip_title: "Tuần",
    value: "timeGridWeek",
    aria_label: "tuần",
    icon: <CalendarViewWeekIcon />,
  },
  {
    tooltip_title: "Ngày",
    value: "timeGridDay",
    aria_label: "ngày",
    icon: <CalendarViewDayIcon />,
  },
  {
    tooltip_title: "Danh sách",
    value: "listYear",
    aria_label: "danh sách",
    icon: <ViewAgendaIcon />,
  },
];

const CalendarHeader = ({ calendarRef }) => {
  const [viewType, setViewType] = useState("dayGridMonth");
  const [currentDate, setCurrentDate] = useState("");

  const handleChangeViewType = (event, newViewType) => {
    if (newViewType) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(newViewType);
      setViewType(newViewType);
    }
  };

  useEffect(() => {
    if (calendarRef) {
      setCurrentDate(formatDate(calendarRef.current.getApi().getDate()));
    }
  }, [calendarRef]);

  return (
    <div
      style={{
        height: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 10px",
      }}
    >
      <ToggleButtonGroup
        value={viewType}
        exclusive
        onChange={handleChangeViewType}
        aria-label="text alignment"
      >
        {VIEW_TYPES.map((item) => (
          <TooltipToggleButton
            key={item.value}
            title={item.tooltip_title}
            value={item.value}
            aria-label={item.aria_label}
          >
            {item.icon}
          </TooltipToggleButton>
        ))}
      </ToggleButtonGroup>
      <Stack flexDirection="row" alignItems="center">
        <IconButton
          onClick={() => {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.prev();
            setCurrentDate(formatDate(calendarApi.getDate()));
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h5" mx={2}>
          {currentDate}
        </Typography>
        <IconButton
          onClick={() => {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.next();
            setCurrentDate(formatDate(calendarApi.getDate()));
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      <Button
        variant="outlined"
        onClick={() => {
          const calendarApi = calendarRef.current.getApi();
          calendarApi.today();
          setCurrentDate(formatDate(calendarApi.getDate()));
        }}
      >
        Hôm nay
      </Button>
    </div>
  );
};

export default CalendarHeader;
