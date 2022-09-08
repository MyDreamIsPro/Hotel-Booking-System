import Message from "../models/message.js";
import User from "../models/user.js";
import GroupChat from "../models/chat_group.js";

const events = (socket, io) => {
  socket.on("send-message", async (data) => {
    const message = new Message({
      chat_group: data.group,
      sender: data.sender,
      content: data.content,
      created_date: data.created_date,
    });
    await message.save();
    const group = await GroupChat.findByIdAndUpdate(
      data.group,
      {
        last_message: message._id,
        last_user: data.sender,
        modified_date: data.created_date,
        isEmpty: false,
      },
      { new: true }
    ).populate("last_user", ["_id", "full_name", "profile_image"]);

    message.sender = group.last_user;

    let room;
    for (let user of group.users) {
      room = user.toString();
      if (room !== data.sender) {
        io.in(room).emit("receive-message", message);
      }
    }
    socket.emit("send-message-completed", message);
  });
  socket.on("join", (room) => {
    socket.join(room);
  });
};

export default events;
