import Typography from "@mui/material/Typography";
import { formatDateForChat } from "../../../utils/date";

const Message = ({ type = "left", data }) => {
  const date = formatDateForChat(data.created_date);
  if (type === "right")
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 10,
          marginBottom: 5,
        }}
      >
        <Typography variant="body2">{date}</Typography>
        <div
          style={{
            backgroundColor: "#a9c9fc",
            // backgroundColor: "#e0e6eb",
            padding: "8px 10px",
            borderRadius: "8px 8px 2px 8px",
            marginLeft: 8,
          }}
        >
          {data.content}
        </div>
      </div>
    );

  return (
    <div
      style={{ display: "flex", width: "100%", padding: 10, marginBottom: 5 }}
    >
      <img
        src={data.sender.profile_image}
        alt="profile image"
        style={{
          width: 40,
          height: 40,
          objectFit: "cover",
          borderRadius: 20,
        }}
      />
      <div style={{ marginLeft: 10 }}>
        <Typography variant="body1" fontWeight="bold" mb={0.5}>
          {data.sender.full_name}
        </Typography>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div
            style={{
              // backgroundColor: "#a9c9fc",
              backgroundColor: "#e0e6eb",
              padding: "8px 10px",
              borderRadius: "2px 8px 8px 8px",
              marginRight: 8,
            }}
          >
            {data.content}
          </div>
          <Typography variant="body2">{date}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Message;
