import Message from "../models/message.js";

const events = (socket) => {
  socket.on("send-message", async (data) => {
    const receiver_socket = global.users.get(data.receiver);
    if (receiver_socket) {
      const message = new Message(data);
      await message.save();
      const returned_message = await Message.findOne({ _id: message._id })
        .populate("sender", "_id full_name profile_image")
        .populate("receiver", "_id full_name profile_image");
      socket.to(receiver_socket).emit("receive-message", returned_message);
      socket.emit("send-message-completed", returned_message);
    }
  });

  socket.on("get-conversation", async (data) => {
    const conversation = await Message.find({
      $or: [
        { sender: data.user1, receiver: data.user2 },
        { sender: data.user2, receiver: data.user1 },
      ],
    })
      .populate("sender", "_id full_name profile_image")
      .populate("receiver", "_id full_name profile_image")
      .sort({ created_date: 1 });
    socket.emit("receive-conversation", conversation);
  });
};

export default events;
