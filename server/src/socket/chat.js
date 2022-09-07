import { authMiddleware } from "./middlewares.js";
import events from "./events.js";

const chatSocket = (io) => {
  io.use(authMiddleware).on("connection", (socket) => {
    // pre-setup
    // console.log(socket.id + " has connect");
    global.mongo_to_socket.set(socket.user._id, socket.id);
    for (let group of socket.user.chat_groups) {
      socket.join(group._id.toString());
    }
    socket.emit("get-initial-data", {
      _id: socket.user._id,
      full_name: socket.user.full_name,
      profile_image: socket.user.profile_image,
      socket_id: socket.id,
      chat_groups: socket.user.chat_groups,
    });

    socket.on("disconnect", () => {
      // console.log(socket.id + " has disconnected");
    });

    //events
    events(socket, io);
  });
};

export default chatSocket;
