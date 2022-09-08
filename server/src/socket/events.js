import Message from "../models/message.js";
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
    )
      .populate({
        path: "last_message",
        populate: [
          {
            path: "sender",
            model: "User",
          },
        ],
      })
      .populate("users");

    let room;
    for (let user of group.users) {
      room = user._id.toString();
      io.in(room).emit("new-message", group);
    }
  });
  socket.on("join", (room) => {
    socket.join(room);
  });
};

export default events;
