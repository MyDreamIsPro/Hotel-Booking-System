import Message from "../models/message.js";
import User from "../models/user.js";
import GroupChat from "../models/chat_group.js";

const events = (socket, io) => {
  const user = socket.user;
  socket.on("send-message", async (data) => {
    const message = new Message({
      chat_group: data.group,
      sender: data.sender,
      content: data.content,
      created_date: data.created_date,
    });
    await message.save();
    const group = await GroupChat.findByIdAndUpdate(
      found_group._id,
      {
        last_message: message._id,
        last_user: data.sender,
        modified_date: data.created_date,
      },
      { new: true }
    );

    // for(let )
  });
  socket.on("join", (room) => {
    socket.join(room);
    console.log(socket.id + " joined " + room);
  });
};

export default events;
