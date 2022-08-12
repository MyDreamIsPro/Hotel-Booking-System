import Message from "../models/message.js";
import User from "../models/user.js";
import GroupChat from "../models/chat_group.js";

const events = (socket) => {
  const user = socket.user;
  socket.on("send-message", async (data) => {
    //check if exist a conversation between sender and receiver
    let found_group;
    let message;
    if (user.chat_groups.length > 0) {
      let found = false;
      for (let group of user.chat_groups) {
        for (let user of group.users) {
          if (group.private && user === data.receiver) {
            found = true;
            found_group = group;
            break;
          }
        }
      }
      if (found) {
        message = new Message({
          chat_group: found_group._id,
          sender: data.sender,
          content: data.content,
          created_date: data.created_date,
        });
        await message.save();
        await GroupChat.findByIdAndUpdate(
          found_group._id,
          {
            last_message: message._id,
            last_user: data.sender,
            modified_date: data.created_date,
          },
          { new: true }
        );
      }
      // if 2 users do not have a conversation yet
    } else {
      found_group = new GroupChat({
        name: "",
        users: [data.sender, data.receiver],
        last_user: data.sender,
        private: true,
        created_date: data.created_date,
      });
      await found_group.save();
      message = new Message({
        chat_group: found_group._id,
        sender: data.sender,
        content: data.content,
        created_date: data.created_date,
      });
      await message.save();
      await GroupChat.findByIdAndUpdate(
        found_group._id,
        {
          last_message: message._id,
          last_user: data.sender,
          modified_date: data.created_date,
        },
        { new: true }
      );
    }

    //get receiver socket

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
};

export default events;
