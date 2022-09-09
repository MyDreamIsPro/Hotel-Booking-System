import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { Stack, styled, Divider, Typography } from "@mui/material";
import { INTEGER } from "../../../constants";

const RootContainer = styled("div")({
  width: "100%",
  height: `calc(100% - ${INTEGER.MESSAGE_ACTION_HEIGHT}px - ${INTEGER.MESSAGE_HEADER_HEIGHT}px)`,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "7px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D7DBDF",
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const DAY_IN_WEEK = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const TimePoint = ({ data }) => {
  const format = (data) => {
    const date = new Date(data);
    return (
      DAY_IN_WEEK[date.getDay()] +
      ", " +
      date.getDate() +
      "/" +
      `${date.getMonth() + 1}` +
      "/" +
      date.getFullYear()
    );
  };
  return <Divider style={{ margin: 10 }}>{format(data)}</Divider>;
};

const ListMessage = ({ listMessage, sender }) => {
  const messageEndRef = useRef();

  const isSameDay = (data1, data2) => {
    const date1 = new Date(data1);
    const date2 = new Date(data2);
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  useEffect(() => {
    messageEndRef.current.scrollIntoView();
  }, [listMessage]);

  return (
    <RootContainer>
      {listMessage.map((item, index) => {
        if (
          index === 0 ||
          !isSameDay(item.created_date, listMessage[index - 1].created_date)
        ) {
          return (
            <>
              <TimePoint key={index} data={item.created_date} />
              <Message
                key={item._id}
                data={item}
                type={item.sender._id === sender ? "right" : "left"}
              />
            </>
          );
        } else {
          return (
            <Message
              key={item._id}
              data={item}
              type={item.sender._id === sender ? "right" : "left"}
            />
          );
        }
      })}

      <div ref={messageEndRef}></div>
    </RootContainer>
  );
};

export default ListMessage;
