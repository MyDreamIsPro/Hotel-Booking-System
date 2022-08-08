import { Typography } from "@mui/material";
import React from "react";
import { INTEGER } from "../../../constants";
const MessageHeader = ({ data }) => {
  return (
    <div
      style={{
        height: INTEGER.MESSAGE_HEADER_HEIGHT,
        borderBottom: "2px solid #637381",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
      }}
    >
      {data && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={data.profile_image}
            alt="profile image"
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <Typography variant="body1" fontWeight="bold">
            {data.full_name}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MessageHeader;
